using NattFlow.DTOs.Role;

namespace NattFlow.Services.Interfaces;

public interface IRoleService
{
    Task<IEnumerable<RoleResponseDTO>> GetAllAsync();
    Task<RoleResponseDTO> CreateAsync(RoleCreateDTO dto);
    Task DeleteAsync(int id);
}