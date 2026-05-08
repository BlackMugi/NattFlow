using Microsoft.EntityFrameworkCore;
using NattFlow.Data;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;

namespace NattFlow.Repositories.Implementations
{
    public class CotisationRepository(AppDbContext context) : ICotisationRepository
    {
        public async Task<IEnumerable<Cotisation>> GetAllAsync() =>
            await context.Cotisations.AsNoTracking().ToListAsync();

        public async Task<Cotisation?> GetByIdAsync(int id) =>
            await context.Cotisations.FindAsync(id);

        public async Task<Cotisation> CreateAsync(Cotisation cotisation)
        {
            context.Cotisations.Add(cotisation);
            await context.SaveChangesAsync();
            return cotisation;
        }

        public async Task<Cotisation> UpdateAsync(Cotisation cotisation)
        {
            context.Cotisations.Update(cotisation);
            await context.SaveChangesAsync();
            return cotisation;
        }

        public async Task DeleteAsync(int id)
        {
            var cotisation = await GetByIdAsync(id)
                ?? throw new NotFoundException($"Cotisation {id} introuvable.");
            context.Cotisations.Remove(cotisation);
            await context.SaveChangesAsync();
        }
    }
}