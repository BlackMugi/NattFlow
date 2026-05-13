using NattFlow.DTOs.Common;
using NattFlow.DTOs.Notification;

namespace NattFlow.Services.Interfaces
{
    public interface INotificationService
    {
        Task<PaginationDTO<NotificationResponseDTO>> GetAllAsync(int page, int pageSize);
        Task<PaginationDTO<NotificationResponseDTO>> GetByUserIdAsync(int idUser, int page, int pageSize);
        Task<NotificationResponseDTO> GetByIdAsync(int id);
        Task<NotificationResponseDTO> CreateAsync(NotificationCreateDTO dto);
        Task<NotificationResponseDTO> MarquerCommeLuAsync(int id);
        Task BroadcastAsync(BroadcastNotificationDTO dto);
        Task DeleteAsync(int id);
    }
}