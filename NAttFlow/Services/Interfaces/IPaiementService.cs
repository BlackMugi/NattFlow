using NattFlow.DTOs.Common;
using NattFlow.DTOs.Paiement;

namespace NattFlow.Services.Interfaces
{
    public interface IPaiementService
    {
        Task<PaginationDTO<PaiementResponseDTO>> GetAllAsync(int page, int pageSize);
        Task<PaginationDTO<PaiementResponseDTO>> GetByUserIdAsync(int idUser, int page, int pageSize);
        Task<PaginationDTO<PaiementResponseDTO>> GetByCotisationIdAsync(int idCotisation, int page, int pageSize);
        Task<PaiementResponseDTO> GetByIdAsync(int id);
        Task<PaiementResponseDTO> CreateAsync(PaiementCreateDTO dto);
        Task<PaiementResponseDTO> UpdateAsync(int id, PaiementCreateDTO dto);
        Task<PaiementResponseDTO> InitierAsync(PaiementInitierDTO dto);
        Task<PaiementResponseDTO> ValiderAsync(int id);
        Task<PaiementResponseDTO> RejeterAsync(int id);
        Task DeleteAsync(int id);
    }
}