using NattFlow.DTOs.Notification;

namespace NattFlow.Services.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationResponseDTO>> GetAllAsync();
        Task<IEnumerable<NotificationResponseDTO>> GetByUserIdAsync(int idUser);
        Task<NotificationResponseDTO> GetByIdAsync(int id);
        Task<NotificationResponseDTO> CreateAsync(NotificationCreateDTO dto);
        Task<NotificationResponseDTO> MarquerCommeLuAsync(int id);
        Task DeleteAsync(int id);
    }
}