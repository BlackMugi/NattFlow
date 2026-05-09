using NattFlow.DTOs.Paiement;

namespace NattFlow.Services.Interfaces
{
    public interface IPaiementService
    {
        Task<IEnumerable<PaiementResponseDTO>> GetAllAsync();
        Task<IEnumerable<PaiementResponseDTO>> GetByUserIdAsync(int idUser);
        Task<IEnumerable<PaiementResponseDTO>> GetByCotisationIdAsync(int idCotisation);
        Task<PaiementResponseDTO> GetByIdAsync(int id);
        Task<PaiementResponseDTO> CreateAsync(PaiementCreateDTO dto);
        Task<PaiementResponseDTO> UpdateAsync(int id, PaiementCreateDTO dto);
        Task DeleteAsync(int id);
    }
}