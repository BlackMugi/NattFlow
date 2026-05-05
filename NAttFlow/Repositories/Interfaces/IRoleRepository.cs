using NattFlow.Entities;

namespace NattFlow.Repositories.Interfaces;

public interface IRoleRepository
{
    Task<IEnumerable<Role>> GetAllAsync();
    Task<Role?> GetByIdAsync(int id);
    Task<Role> CreateAsync(Role role);
    Task DeleteAsync(int id);
}