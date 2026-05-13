using Microsoft.EntityFrameworkCore;
using NattFlow.Data;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;

namespace NattFlow.Repositories.Implementations
{
    public class NotificationRepository(AppDbContext context) : INotificationRepository
    {
        public async Task<(IEnumerable<Notification> Items, int Total)> GetAllAsync(int page, int pageSize)
        {
            var query = context.Notifications.Include(n => n.User).AsNoTracking();
            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (items, total);
        }

        public async Task<(IEnumerable<Notification> Items, int Total)> GetByUserIdAsync(int idUser, int page, int pageSize)
        {
            var query = context.Notifications
                .Where(n => n.IdUser == idUser)
                .AsNoTracking();
            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (items, total);
        }

        public async Task<Notification?> GetByIdAsync(int id) =>
            await context.Notifications
                .Include(n => n.User)
                .FirstOrDefaultAsync(n => n.IdNotification == id);

        public async Task<Notification> CreateAsync(Notification notification)
        {
            context.Notifications.Add(notification);
            await context.SaveChangesAsync();
            return notification;
        }

        public async Task<Notification> UpdateAsync(Notification notification)
        {
            context.Notifications.Update(notification);
            await context.SaveChangesAsync();
            return notification;
        }

        public async Task DeleteAsync(int id)
        {
            var notification = await GetByIdAsync(id)
                ?? throw new NotFoundException($"Notification {id} introuvable.");
            context.Notifications.Remove(notification);
            await context.SaveChangesAsync();
        }
    }
}