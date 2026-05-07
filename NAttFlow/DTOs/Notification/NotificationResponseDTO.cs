namespace NattFlow.DTOs.Notification
{
    public class NotificationResponseDTO
    {
        public int IdNotification { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Titre { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool Lu { get; set; }
        public DateTime DateCreation { get; set; }
        public int IdUser { get; set; }
        public string NomUser { get; set; } = string.Empty;
        public string PrenomUser { get; set; } = string.Empty;
    }
}