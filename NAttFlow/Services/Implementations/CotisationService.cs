using NattFlow.DTOs.Cotisation;
using NattFlow.DTOs.Common;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations
{
    public class CotisationService(ICotisationRepository cotisationRepo) : ICotisationService
    {
        public async Task<PaginationDTO<CotisationResponseDTO>> GetAllAsync(int page, int pageSize)
        {
            var (items, total) = await cotisationRepo.GetAllAsync(page, pageSize);
            return new PaginationDTO<CotisationResponseDTO>
            {
                Data      = items.Select(ToDTO),
                Page      = page,
                PageSize  = pageSize,
                TotalCount = total
            };
        }

        public async Task<CotisationResponseDTO> GetByIdAsync(int id)
        {
            var cotisation = await cotisationRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Cotisation {id} introuvable.");
            return ToDTO(cotisation);
        }

        public async Task<CotisationResponseDTO> CreateAsync(CotisationCreateDTO dto)
        {
            var cotisation = new Cotisation
            {
                Montant      = dto.Montant,
                Libelle      = dto.Libelle,
                Mois         = dto.Mois,
                DateEcheance = dto.DateEcheance
            };
            var created = await cotisationRepo.CreateAsync(cotisation);
            return ToDTO(created);
        }

        public async Task<CotisationResponseDTO> UpdateAsync(int id, CotisationCreateDTO dto)
        {
            var cotisation = await cotisationRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Cotisation {id} introuvable.");
            cotisation.Montant      = dto.Montant;
            cotisation.Libelle      = dto.Libelle;
            cotisation.Mois         = dto.Mois;
            cotisation.DateEcheance = dto.DateEcheance;
            var updated = await cotisationRepo.UpdateAsync(cotisation);
            return ToDTO(updated);
        }

        public async Task DeleteAsync(int id) => await cotisationRepo.DeleteAsync(id);

        private static CotisationResponseDTO ToDTO(Cotisation c) => new()
        {
            IdCotisation = c.IdCotisation,
            Montant      = c.Montant,
            Libelle      = c.Libelle,
            Mois         = c.Mois,
            DateEcheance = c.DateEcheance
        };
    }
}