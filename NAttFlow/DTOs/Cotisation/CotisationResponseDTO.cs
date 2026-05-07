namespace NattFlow.DTOs.Cotisation
{
    public class CotisationResponseDTO
    {
        public int IdCotisation { get; set; }
        public int Montant { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public string Mois { get; set; } = string.Empty;
        public DateTime DateEcheance { get; set; }
    }
}