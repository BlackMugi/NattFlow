using NattFlow.DTOs.Common;
using NattFlow.DTOs.Notification;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations
{
    public class NotificationService(
        INotificationRepository notificationRepo,
        IUserRepository userRepo
    ) : INotificationService
    {
        public async Task<PaginationDTO<NotificationResponseDTO>> GetAllAsync(int page, int pageSize)
        {
            var (items, total) = await notificationRepo.GetAllAsync(page, pageSize);
            return new PaginationDTO<NotificationResponseDTO>
            {
                Data       = items.Select(ToDTO),
                Page       = page,
                PageSize   = pageSize,
                TotalCount = total
            };
        }

        public async Task<PaginationDTO<NotificationResponseDTO>> GetByUserIdAsync(int idUser, int page, int pageSize)
        {
            var (items, total) = await notificationRepo.GetByUserIdAsync(idUser, page, pageSize);
            return new PaginationDTO<NotificationResponseDTO>
            {
                Data       = items.Select(ToDTO),
                Page       = page,
                PageSize   = pageSize,
                TotalCount = total
            };
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
                Type         = dto.Type,
                Titre        = dto.Titre,
                Message      = dto.Message,
                IdUser       = dto.IdUser,
                Lu           = false,
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

        public async Task DeleteAsync(int id) => await notificationRepo.DeleteAsync(id);

        public async Task BroadcastAsync(BroadcastNotificationDTO dto)
        {
            var userIds = await userRepo.GetAllIdsAsync();
            foreach (var idUser in userIds)
                await notificationRepo.CreateAsync(new Notification
                {
                    Type         = dto.Type,
                    Titre        = dto.Titre,
                    Message      = dto.Message,
                    IdUser       = idUser,
                    Lu           = false,
                    DateCreation = DateTime.UtcNow
                });
        }

        private static NotificationResponseDTO ToDTO(Notification n) => new()
        {
            IdNotification = n.IdNotification,
            Type           = n.Type,
            Titre          = n.Titre,
            Message        = n.Message,
            Lu             = n.Lu,
            DateCreation   = n.DateCreation,
            IdUser         = n.IdUser,
            NomUser        = n.User?.Nom ?? "",
            PrenomUser     = n.User?.Prenom ?? ""
        };
    }
}