using System.ComponentModel.DataAnnotations;

namespace NattFlow.DTOs.Notification;

public class BroadcastNotificationDTO
{
    [Required]
    public string Type { get; set; } = string.Empty;

    [Required]
    public string Titre { get; set; } = string.Empty;

    [Required]
    public string Message { get; set; } = string.Empty;
}