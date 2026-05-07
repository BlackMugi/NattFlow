using System.ComponentModel.DataAnnotations;

namespace NattFlow.DTOs.Notification
{
    public class NotificationCreateDTO
    {
        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public string Titre { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        [Required]
        public int IdUser { get; set; }
    }
}