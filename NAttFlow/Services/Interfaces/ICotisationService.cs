using NattFlow.DTOs.Cotisation;

namespace NattFlow.Services.Interfaces
{
    public interface ICotisationService
    {
        Task<IEnumerable<CotisationResponseDTO>> GetAllAsync();
        Task<CotisationResponseDTO> GetByIdAsync(int id);
        Task<CotisationResponseDTO> CreateAsync(CotisationCreateDTO dto);
        Task<CotisationResponseDTO> UpdateAsync(int id, CotisationCreateDTO dto);
        Task DeleteAsync(int id);
    }
}