namespace NattFlow.Entities
{
    public class Notification
    {
        public int IdNotification { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // Rappel, Confirmation, Alerte
        public bool IsLu { get; set; } = false;
        public DateTime DateEnvoi { get; set; } = DateTime.UtcNow;

        // Many to One → User
        public int IdUser { get; set; }
        public User User { get; set; } = null!;

        // Many to One → Paiement (optionnel)
        public int? IdPaiement { get; set; }
        public Paiement? Paiement { get; set; }
    }
}