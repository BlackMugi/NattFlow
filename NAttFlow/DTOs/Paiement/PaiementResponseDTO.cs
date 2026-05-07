namespace NattFlow.DTOs.Paiement
{
    public class PaiementResponseDTO
    {
        public int IdPaiement { get; set; }
        public int Montant { get; set; }
        public DateTime DatePaiement { get; set; }
        public string Method { get; set; } = string.Empty;
        public string Statut { get; set; } = string.Empty;
        public int IdCotisation { get; set; }
        public string LibelleCotisation { get; set; } = string.Empty;
        public int IdUser { get; set; }
        public string NomUser { get; set; } = string.Empty;
        public string PrenomUser { get; set; } = string.Empty;
    }
}