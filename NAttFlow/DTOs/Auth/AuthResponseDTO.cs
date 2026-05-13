namespace NattFlow.DTOs.Auth;
public class AuthResponseDTO
{
  public int IdUser { get; set; }
  public string Token {get; set;} = string.Empty;
  public string Email {get; set;} = string.Empty;
  public string Prenom {get; set;} = string.Empty;
  public string Role {get; set;} = string.Empty;
  public DateTime ExpirationToken{get; set;}
}
