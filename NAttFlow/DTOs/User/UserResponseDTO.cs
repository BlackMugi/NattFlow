namespace NattFlow.DTOs.User
{
  public class UserResponseDTO
  {
    public int IdUser {get; set;}
    public string Email {get; set;} = string.Empty;
    public string Nom {get; set;} = string.Empty;
    public string Prenom {get; set;} = string.Empty;
    public string Telephone {get; set;} = string.Empty;
    public string Addresse {get; set;} = string.Empty;
    public string NomRole {get; set;} = string.Empty;
    
  }
}