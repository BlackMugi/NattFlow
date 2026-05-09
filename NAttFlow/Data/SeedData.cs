using NattFlow.Entities;

namespace NattFlow.Data;

public static class SeedData
{
    public static async Task SeedSuperAdminAsync(AppDbContext context, IConfiguration config)
    {
        var email    = config["SuperAdmin:Email"]
            ?? throw new InvalidOperationException("SuperAdmin:Email non configuré.");
        var password = config["SuperAdmin:Password"]
            ?? throw new InvalidOperationException("SuperAdmin:Password non configuré.");

        if (!context.Users.Any(u => u.Email == email))
        {
            var admin = new User
            {
                Email     = email,
                Password  = BCrypt.Net.BCrypt.HashPassword(password),
                Nom       = "Super",
                Prenom    = "Admin",
                Telephone = "771234567",
                Addresse  = "NattFlow HQ",
                IdRole    = 1
            };

            context.Users.Add(admin);
            await context.SaveChangesAsync();

            Console.WriteLine("✅ Super Admin créé avec succès.");
        }
    }
}