using NattFlow.Entities;

namespace NattFlow.Repositories.Interfaces
{
    public interface IPaiementRepository
    {
        Task<IEnumerable<Paiement>> GetAllAsync();
        Task<IEnumerable<Paiement>> GetByUserIdAsync(int idUser);
        Task<IEnumerable<Paiement>> GetByCotisationIdAsync(int idCotisation);
        Task<Paiement?> GetByIdAsync(int id);
        Task<Paiement> CreateAsync(Paiement paiement);
        Task<Paiement> UpdateAsync(Paiement paiement);
        Task DeleteAsync(int id);
    }
}