using NattFlow.Entities;

namespace NattFlow.Repositories.Interfaces
{
    public interface ICotisationRepository
    {
        Task<(IEnumerable<Cotisation> Items, int Total)> GetAllAsync(int page, int pageSize);
        Task<Cotisation?> GetByIdAsync(int id);
        Task<Cotisation> CreateAsync(Cotisation cotisation);
        Task<Cotisation> UpdateAsync(Cotisation cotisation);
        Task DeleteAsync(int id);
    }
}