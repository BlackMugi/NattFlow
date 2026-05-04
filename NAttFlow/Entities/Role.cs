namespace NattFlow.Entities
{
  public class Role
  {
    public int IdRole {get; set; }
    public string NomRole {get; set;} = string.Empty;

  //One to Many
    public ICollection<User> Users { get; set; } = new List<User>();
  }
}