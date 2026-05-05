using NattFlow.DTOs.Common;
using NattFlow.DTOs.User;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations;

public class UserService(IUserRepository userRepo) : IUserService
{
    public async Task<PaginationDTO<UserResponseDTO>> GetAllAsync(int page, int pageSize)
    {
        var (items, total) = await userRepo.GetAllAsync(page, pageSize);
        return new PaginationDTO<UserResponseDTO>
        {
            Data = items.Select(ToDTO),
            Page = page,
            PageSize = pageSize,
            TotalCount = total
        };
    }

    public async Task<UserResponseDTO> GetByIdAsync(int id)
    {
        var user = await userRepo.GetByIdAsync(id)
            ?? throw new NotFoundException($"Utilisateur {id} introuvable.");
        return ToDTO(user);
    }

    public async Task<UserResponseDTO> CreateAsync(UserCreateDTO dto)
    {
        var existing = await userRepo.GetByEmailAsync(dto.Email);
        if (existing is not null)
            throw new ConflictException("Un utilisateur avec cet email existe déjà.");

        var user = new User
        {
            Email     = dto.Email,
            Password  = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Nom       = dto.Nom,
            Prenom    = dto.Prenom,
            Telephone = dto.Telephone,
            Addresse  = dto.Addresse,
            IdRole    = dto.IdRole
        };

        var created = await userRepo.CreateAsync(user);
        return await GetByIdAsync(created.IdUser);
    }

    public async Task<UserResponseDTO> UpdateAsync(int id, UserCreateDTO dto)
    {
        var user = await userRepo.GetByIdAsync(id)
            ?? throw new NotFoundException($"Utilisateur {id} introuvable.");

        user.Email     = dto.Email;
        user.Nom       = dto.Nom;
        user.Prenom    = dto.Prenom;
        user.Telephone = dto.Telephone;
        user.Addresse  = dto.Addresse;
        user.IdRole    = dto.IdRole;

        if (!string.IsNullOrWhiteSpace(dto.Password))
            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        await userRepo.UpdateAsync(user);
        return await GetByIdAsync(id);
    }

    public async Task DeleteAsync(int id) => await userRepo.DeleteAsync(id);

    private static UserResponseDTO ToDTO(User u) => new()
    {
        IdUser    = u.IdUser,
        Email     = u.Email,
        Nom       = u.Nom,
        Prenom    = u.Prenom,
        Telephone = u.Telephone,
        Addresse  = u.Addresse,
        NomRole      = u.Role?.NomRole ?? ""
    };
}