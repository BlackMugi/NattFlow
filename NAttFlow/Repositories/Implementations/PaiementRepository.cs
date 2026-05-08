using Microsoft.EntityFrameworkCore;
using NattFlow.Data;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;

namespace NattFlow.Repositories.Implementations
{
    public class PaiementRepository(AppDbContext context) : IPaiementRepository
    {
        public async Task<IEnumerable<Paiement>> GetAllAsync() =>
            await context.Paiements
                .Include(p => p.User)
                .Include(p => p.Cotisation)
                .AsNoTracking()
                .ToListAsync();

        public async Task<IEnumerable<Paiement>> GetByUserIdAsync(int idUser) =>
            await context.Paiements
                .Include(p => p.Cotisation)
                .Where(p => p.IdUser == idUser)
                .AsNoTracking()
                .ToListAsync();

        public async Task<IEnumerable<Paiement>> GetByCotisationIdAsync(int idCotisation) =>
            await context.Paiements
                .Include(p => p.User)
                .Where(p => p.IdCotisation == idCotisation)
                .AsNoTracking()
                .ToListAsync();

        public async Task<Paiement?> GetByIdAsync(int id) =>
            await context.Paiements
                .Include(p => p.User)
                .Include(p => p.Cotisation)
                .FirstOrDefaultAsync(p => p.IdPaiement == id);

        public async Task<Paiement> CreateAsync(Paiement paiement)
        {
            context.Paiements.Add(paiement);
            await context.SaveChangesAsync();
            return paiement;
        }

        public async Task<Paiement> UpdateAsync(Paiement paiement)
        {
            context.Paiements.Update(paiement);
            await context.SaveChangesAsync();
            return paiement;
        }

        public async Task DeleteAsync(int id)
        {
            var paiement = await GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable.");
            context.Paiements.Remove(paiement);
            await context.SaveChangesAsync();
        }
    }
}