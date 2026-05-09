namespace NattFlow.Entities
{
  public class User
  {
    public int IdUser {get; set;}
    public string Email {get; set;} = string.Empty;
    public string Password {get; set;} = string.Empty;
    public string Nom {get; set;} = string.Empty;
    public string Prenom {get; set;} = string.Empty;
    public string Telephone {get; set;} = string.Empty;
    public string Addresse {get; set;} = string.Empty;

    //Many to one
     public int IdRole {get; set;}
     public Role Role {get; set;} = null!;
      // One to Many
        public ICollection<Paiement> Paiements { get; set; } = new List<Paiement>();
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();

  }
}

