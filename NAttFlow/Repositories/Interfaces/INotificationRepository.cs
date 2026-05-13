using NattFlow.Entities;

namespace NattFlow.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task<(IEnumerable<Notification> Items, int Total)> GetAllAsync(int page, int pageSize);
        Task<(IEnumerable<Notification> Items, int Total)> GetByUserIdAsync(int idUser, int page, int pageSize);
        Task<Notification?> GetByIdAsync(int id);
        Task<Notification> CreateAsync(Notification notification);
        Task<Notification> UpdateAsync(Notification notification);
        Task DeleteAsync(int id);
    }
}