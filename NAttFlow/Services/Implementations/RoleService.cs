using NattFlow.DTOs.Role;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations;

public class RoleService(IRoleRepository roleRepo) : IRoleService
{
    public async Task<IEnumerable<RoleResponseDTO>> GetAllAsync()
    {
        var roles = await roleRepo.GetAllAsync();
        return roles.Select(ToDTO);
    }

    public async Task<RoleResponseDTO> CreateAsync(RoleCreateDTO dto)
    {
        var role = new Role { NomRole = dto.NomRole.Trim().ToUpper() };
        var created = await roleRepo.CreateAsync(role);
        return ToDTO(created);
    }

    public async Task DeleteAsync(int id)
    {
        //Empêcher la suppression des rôles prédéfini (Admin et membre)
        if (id == 1 || id == 2)
            throw new ConflictException("Les rôles par défaut ne peuvent pas être supprimés.");

        await roleRepo.DeleteAsync(id);
    }

    private static RoleResponseDTO ToDTO(Role r) => new()
    {
        IdRole  = r.IdRole,
        NomRole = r.NomRole
    };
}