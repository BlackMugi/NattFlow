using System.ComponentModel.DataAnnotations;

namespace NattFlow.DTOs.Cotisation
{
    public class CotisationCreateDTO
    {
        [Required]
        public int Montant { get; set; }

        [Required]
        public string Libelle { get; set; } = string.Empty;

        [Required]
        public string Mois { get; set; } = string.Empty;

        [Required]
        public DateTime DateEcheance { get; set; }
    }
}