using System.ComponentModel.DataAnnotations;

namespace NattFlow.DTOs.Paiement
{
    public class PaiementCreateDTO
    {
        [Required]
        public int Montant { get; set; }

        [Required]
        public DateTime DatePaiement { get; set; }

        [Required]
        public string Method { get; set; } = string.Empty;

        [Required]
        public string Statut { get; set; } = string.Empty;

        [Required]
        public int IdCotisation { get; set; }

        [Required]
        public int IdUser { get; set; }
    }
}