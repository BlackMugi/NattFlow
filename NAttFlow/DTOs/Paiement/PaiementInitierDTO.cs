using System.ComponentModel.DataAnnotations;

namespace NattFlow.DTOs.Paiement;

public class PaiementInitierDTO
{
    [Required]
    public int IdCotisation { get; set; }

    [Required]
    public int IdUser { get; set; }

    [Required]
    public string Method { get; set; } = string.Empty; 
}