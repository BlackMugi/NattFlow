namespace NattFlow.Entities
{
    public class Paiement
    {
        public int IdPaiement { get; set; }
        public decimal Montant { get; set; }
        public DateTime DatePaiement { get; set; }
        public string ModePaiement { get; set; } = string.Empty; // Espèces, Mobile Money, Virement
        public string Statut { get; set; } = string.Empty; // Payé, En attente, En retard

        // Many to One → User
        public int IdUser { get; set; }
        public User User { get; set; } = null!;

        // Many to One → Cotisation
        public int IdCotisation { get; set; }
        public Cotisation Cotisation { get; set; } = null!;

        // One to Many → Notifications
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}