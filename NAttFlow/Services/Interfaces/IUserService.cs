using NattFlow.DTOs.Common;
using NattFlow.DTOs.User;

namespace NattFlow.Services.Interfaces;

public interface IUserService
{
    Task<PaginationDTO<UserResponseDTO>> GetAllAsync(int page, int pageSize);
    Task<UserResponseDTO> GetByIdAsync(int id);
    Task<UserResponseDTO> CreateAsync(UserCreateDTO dto);
    Task<UserResponseDTO> UpdateAsync(int id, UserCreateDTO dto);
    Task DeleteAsync(int id);
}