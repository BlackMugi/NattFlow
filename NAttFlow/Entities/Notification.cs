namespace NattFlow.Entities
{
    public class Notification
    {
        public int IdNotification { get; set; }
        public string Type { get; set; } = string.Empty;
           public string Titre { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool Lu { get; set; } = false;
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;

           public int IdUser { get; set; }
        public User User { get; set; } = null!;
    }
}