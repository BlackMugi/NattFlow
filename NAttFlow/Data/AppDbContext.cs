using Microsoft.EntityFrameworkCore;
using NattFlow.Entities;

namespace NattFlow.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Cotisation> Cotisations { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Paiement> Paiements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Clés primaires
            modelBuilder.Entity<Role>().HasKey(r => r.IdRole);
            modelBuilder.Entity<User>().HasKey(u => u.IdUser);
            modelBuilder.Entity<Cotisation>().HasKey(c => c.IdCotisation); 
            modelBuilder.Entity<Notification>().HasKey(n => n.IdNotification); 
            modelBuilder.Entity<Paiement>().HasKey(p => p.IdPaiement);

            // Relation User → Role
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.IdRole);

            // Relation Paiement → Cotisation
            modelBuilder.Entity<Paiement>()
                .HasOne(p => p.Cotisation)
                .WithMany(c => c.Paiements)
                .HasForeignKey(p => p.IdCotisation);

            // Relation Paiement → User
            modelBuilder.Entity<Paiement>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.IdUser);

            // Relation Notification → User
            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.IdUser);

            // Seed roles
            modelBuilder.Entity<Role>().HasData(
                new Role { IdRole = 1, NomRole = "ADMIN" },
                new Role { IdRole = 2, NomRole = "MEMBRE" }
            );
        }
    }
}