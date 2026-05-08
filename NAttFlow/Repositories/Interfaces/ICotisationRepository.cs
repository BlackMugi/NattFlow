using NattFlow.Entities;

namespace NattFlow.Repositories.Interfaces
{
    public interface ICotisationRepository
    {
        Task<IEnumerable<Cotisation>> GetAllAsync();
        Task<Cotisation?> GetByIdAsync(int id);
        Task<Cotisation> CreateAsync(Cotisation cotisation);
        Task<Cotisation> UpdateAsync(Cotisation cotisation);
        Task DeleteAsync(int id);
    }
}