namespace NattFlow.Entities
{
    public class Cotisation
    {
        public int IdCotisation { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public decimal Montant { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public string Periodicite { get; set; } = string.Empty; // Mensuelle, Trimestrielle, Annuelle
        public bool IsActive { get; set; } = true;

        // One to Many
        public ICollection<Paiement> Paiements { get; set; } = new List<Paiement>();
    }
}