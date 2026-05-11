using Microsoft.EntityFrameworkCore;
using NattFlow.Data;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;

namespace NattFlow.Repositories.Implementations;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public async Task<(IEnumerable<User> Items, int Total)> GetAllAsync(int page, int pageSize)
    {
        var query = context.Users.Include(u => u.Role).AsNoTracking();
        var total = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return (items, total);
    }

    public async Task<User?> GetByIdAsync(int id) =>
        await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.IdUser == id);

    public async Task<User?> GetByEmailAsync(string email) =>
        await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);

    public async Task<User> CreateAsync(User user)
    {
        context.Users.Add(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateAsync(User user)
    {
        context.Users.Update(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task DeleteAsync(int id)
    {
        var user = await GetByIdAsync(id) ?? throw new NotFoundException($"User {id} introuvable.");
        context.Users.Remove(user);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<int>> GetAllIdsAsync() =>
    await context.Users.Select(u => u.IdUser).ToListAsync();
}