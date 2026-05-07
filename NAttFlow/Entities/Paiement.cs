namespace NattFlow.Entities
{
    public class Paiement
    {
        public int IdPaiement { get; set; }
        public int Montant { get; set; }
        public DateTime DatePaiement { get; set; }
        public string Method { get; set; } = string.Empty;
        public string Statut { get; set; } = string.Empty;
        public int IdCotisation { get; set; }
        public Cotisation Cotisation { get; set; } = null!;
        public int IdUser { get; set; }
        public User User { get; set; } = null!;
    }
}