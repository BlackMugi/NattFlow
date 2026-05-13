using NattFlow.DTOs.Cotisation;
using NattFlow.DTOs.Common;

namespace NattFlow.Services.Interfaces
{
    public interface ICotisationService
    {
        Task<PaginationDTO<CotisationResponseDTO>> GetAllAsync(int page, int pageSize);
        Task<CotisationResponseDTO> GetByIdAsync(int id);
        Task<CotisationResponseDTO> CreateAsync(CotisationCreateDTO dto);
        Task<CotisationResponseDTO> UpdateAsync(int id, CotisationCreateDTO dto);
        Task DeleteAsync(int id);
    }
}