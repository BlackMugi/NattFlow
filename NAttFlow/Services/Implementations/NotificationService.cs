using NattFlow.DTOs.Notification;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations
{
    public class NotificationService(INotificationRepository notificationRepo) : INotificationService
    {
        public async Task<IEnumerable<NotificationResponseDTO>> GetAllAsync()
        {
            var notifications = await notificationRepo.GetAllAsync();
            return notifications.Select(n => ToDTO(n));
        }

        public async Task<IEnumerable<NotificationResponseDTO>> GetByUserIdAsync(int idUser)
        {
            var notifications = await notificationRepo.GetByUserIdAsync(idUser);
            return notifications.Select(n => ToDTO(n));
        }

        public async Task<NotificationResponseDTO> GetByIdAsync(int id)
        {
            var notification = await notificationRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Notification {id} introuvable.");
            return ToDTO(notification);
        }

        public async Task<NotificationResponseDTO> CreateAsync(NotificationCreateDTO dto)
        {
            var notification = new Notification
            {
                Type = dto.Type,
                Titre = dto.Titre,
                Message = dto.Message,
                IdUser = dto.IdUser,
                Lu = false,
                DateCreation = DateTime.UtcNow
            };
            var created = await notificationRepo.CreateAsync(notification);
            return ToDTO(created);
        }

        public async Task<NotificationResponseDTO> MarquerCommeLuAsync(int id)
        {
            var notification = await notificationRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Notification {id} introuvable.");
            notification.Lu = true;
            var updated = await notificationRepo.UpdateAsync(notification);
            return ToDTO(updated);
        }

        public async Task DeleteAsync(int id)
        {
            await notificationRepo.DeleteAsync(id);
        }

        private static NotificationResponseDTO ToDTO(Notification n) => new()
        {
            IdNotification = n.IdNotification,
            Type = n.Type,
            Titre = n.Titre,
            Message = n.Message,
            Lu = n.Lu,
            DateCreation = n.DateCreation,
            IdUser = n.IdUser,
            NomUser = n.User?.Nom ?? "",
            PrenomUser = n.User?.Prenom ?? ""
        };
    }
}