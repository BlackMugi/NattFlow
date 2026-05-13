using Microsoft.EntityFrameworkCore;
using NattFlow.Data;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;

namespace NattFlow.Repositories.Implementations
{
    public class PaiementRepository(AppDbContext context) : IPaiementRepository
    {
        public async Task<(IEnumerable<Paiement> Items, int Total)> GetAllAsync(int page, int pageSize)
        {
            var query = context.Paiements
                .Include(p => p.User)
                .Include(p => p.Cotisation)
                .AsNoTracking();
            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (items, total);
        }

        public async Task<(IEnumerable<Paiement> Items, int Total)> GetByUserIdAsync(int idUser, int page, int pageSize)
        {
            var query = context.Paiements
                .Include(p => p.Cotisation)
                .Where(p => p.IdUser == idUser)
                .AsNoTracking();
            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (items, total);
        }

        public async Task<(IEnumerable<Paiement> Items, int Total)> GetByCotisationIdAsync(int idCotisation, int page, int pageSize)
        {
            var query = context.Paiements
                .Include(p => p.User)
                .Where(p => p.IdCotisation == idCotisation)
                .AsNoTracking();
            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (items, total);
        }

        // Sans pagination — utilisé par InitierAsync pour vérifier les doublons
        public async Task<IEnumerable<Paiement>> GetByUserIdRawAsync(int idUser) =>
            await context.Paiements
                .Where(p => p.IdUser == idUser)
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