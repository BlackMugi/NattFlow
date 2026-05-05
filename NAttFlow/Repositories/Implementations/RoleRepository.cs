using Microsoft.EntityFrameworkCore;
using NattFlow.Data;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;

namespace NattFlow.Repositories.Implementations;

public class RoleRepository(AppDbContext context) : IRoleRepository
{
    public async Task<IEnumerable<Role>> GetAllAsync() =>
        await context.Roles.AsNoTracking().ToListAsync();

    public async Task<Role?> GetByIdAsync(int id) =>
        await context.Roles.FindAsync(id);

    public async Task<Role> CreateAsync(Role role)
    {
        context.Roles.Add(role);
        await context.SaveChangesAsync();
        return role;
    }

    public async Task DeleteAsync(int id)
    {
        var role = await GetByIdAsync(id) ?? throw new NotFoundException($"Role {id} introuvable.");
        context.Roles.Remove(role);
        await context.SaveChangesAsync();
    }
}