using NattFlow.Auth;
using NattFlow.DTOs.Auth;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations;

public class AuthService(IUserRepository userRepo, IJwtService jwtService) : IAuthService
{
    public async Task<AuthResponseDTO> LoginAsync(LoginRequestDTO dto)
    {
        var user = await userRepo.GetByEmailAsync(dto.Email)
            ?? throw new UnauthorizedException("Email ou mot de passe incorrect.");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            throw new UnauthorizedException("Email ou mot de passe incorrect.");

        var token = jwtService.GenerateToken(user);

        return new AuthResponseDTO
        {
            Token = token,
            Email = user.Email,
            Prenom = user.Prenom,
            Role       = user.Role?.NomRole ?? "",
            ExpirationToken  = DateTime.UtcNow.AddMinutes(60)
        };
    }
}