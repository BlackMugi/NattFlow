using Microsoft.EntityFrameworkCore;
using NattFlow.Entities;

namespace NattFlow.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options){ }

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Clés Primaires
            modelBuilder.Entity<Role>().HasKey(r => r.IdRole);
            modelBuilder.Entity<User>().HasKey(u => u.IdUser);

            // Relation User - Role
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.IdRole);

            // On injecte les deux roles directement (ADMIN / MEMBRE)
            modelBuilder.Entity<Role>().HasData(
                new Role { IdRole = 1, NomRole = "ADMIN" },
                new Role { IdRole = 2, NomRole = "MEMBRE" }
            );
        }
    }
}