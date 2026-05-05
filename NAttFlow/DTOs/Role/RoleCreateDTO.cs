using System.ComponentModel.DataAnnotations;

namespace NattFlow.DTOs.Role
{
  public class RoleCreateDTO
  {
    
    [Required]
    public string NomRole {get; set;} = string.Empty;
  }
}