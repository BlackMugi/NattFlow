using System.ComponentModel.DataAnnotations;

namespace NattFlow.DTOs.User
{
  public class UserUpdateDTO
  {
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [MinLength(6)]
    public string? Password { get; set; }

    [Required]
    public string Nom { get; set; } = string.Empty;

    [Required]
    public string Prenom { get; set; } = string.Empty;

    [Required]
    public string Telephone { get; set; } = string.Empty;

    [Required]
    public string Addresse { get; set; } = string.Empty;

    [Required]
    public int IdRole { get; set; }
  }
}