using NattFlow.DTOs.Paiement;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations
{
    public class PaiementService(IPaiementRepository paiementRepo) : IPaiementService
    {
        public async Task<IEnumerable<PaiementResponseDTO>> GetAllAsync()
        {
            var paiements = await paiementRepo.GetAllAsync();
            return paiements.Select(p => ToDTO(p));
        }

        public async Task<IEnumerable<PaiementResponseDTO>> GetByUserIdAsync(int idUser)
        {
            var paiements = await paiementRepo.GetByUserIdAsync(idUser);
            return paiements.Select(p => ToDTO(p));
        }

        public async Task<IEnumerable<PaiementResponseDTO>> GetByCotisationIdAsync(int idCotisation)
        {
            var paiements = await paiementRepo.GetByCotisationIdAsync(idCotisation);
            return paiements.Select(p => ToDTO(p));
        }

        public async Task<PaiementResponseDTO> GetByIdAsync(int id)
        {
            var paiement = await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable.");
            return ToDTO(paiement);
        }

        public async Task<PaiementResponseDTO> CreateAsync(PaiementCreateDTO dto)
        {
            var paiement = new Paiement
            {
                Montant = dto.Montant,
                DatePaiement = dto.DatePaiement,
                Method = dto.Method,
                Statut = dto.Statut,
                IdCotisation = dto.IdCotisation,
                IdUser = dto.IdUser
            };
            var created = await paiementRepo.CreateAsync(paiement);
            return ToDTO(created);
        }

        public async Task<PaiementResponseDTO> UpdateAsync(int id, PaiementCreateDTO dto)
        {
            var paiement = await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable.");
            paiement.Montant = dto.Montant;
            paiement.DatePaiement = dto.DatePaiement;
            paiement.Method = dto.Method;
            paiement.Statut = dto.Statut;
            paiement.IdCotisation = dto.IdCotisation;
            paiement.IdUser = dto.IdUser;
            var updated = await paiementRepo.UpdateAsync(paiement);
            return ToDTO(updated);
        }

        public async Task DeleteAsync(int id)
        {
            await paiementRepo.DeleteAsync(id);
        }

        private static PaiementResponseDTO ToDTO(Paiement p) => new()
        {
            IdPaiement = p.IdPaiement,
            Montant = p.Montant,
            DatePaiement = p.DatePaiement,
            Method = p.Method,
            Statut = p.Statut,
            IdCotisation = p.IdCotisation,
            LibelleCotisation = p.Cotisation?.Libelle ?? "",
            IdUser = p.IdUser,
            NomUser = p.User?.Nom ?? "",
            PrenomUser = p.User?.Prenom ?? ""
        };
    }
}