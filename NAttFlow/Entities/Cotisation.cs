namespace NattFlow.Entities
{
    public class Cotisation
    {
        public int IdCotisation { get; set; }
        public int Montant { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public string Mois { get; set; } = string.Empty;
        public DateTime DateEcheance { get; set; }

        // One to Many
        public ICollection<Paiement> Paiements { get; set; } = new List<Paiement>();
    }
}