using NattFlow.Entities;

namespace NattFlow.Repositories.Interfaces
{
    public interface IPaiementRepository
    {
        Task<(IEnumerable<Paiement> Items, int Total)> GetAllAsync(int page, int pageSize);
        Task<(IEnumerable<Paiement> Items, int Total)> GetByUserIdAsync(int idUser, int page, int pageSize);
        Task<(IEnumerable<Paiement> Items, int Total)> GetByCotisationIdAsync(int idCotisation, int page, int pageSize);
        Task<IEnumerable<Paiement>> GetByUserIdRawAsync(int idUser); // utilisé en interne par InitierAsync
        Task<Paiement?> GetByIdAsync(int id);
        Task<Paiement> CreateAsync(Paiement paiement);
        Task<Paiement> UpdateAsync(Paiement paiement);
        Task DeleteAsync(int id);
    }
}