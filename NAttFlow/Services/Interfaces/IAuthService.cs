using NattFlow.DTOs.Auth;

namespace NattFlow.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDTO> LoginAsync(LoginRequestDTO dto);
}