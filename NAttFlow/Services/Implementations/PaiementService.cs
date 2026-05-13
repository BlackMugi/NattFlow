using NattFlow.Constants;
using NattFlow.DTOs.Common;
using NattFlow.DTOs.Paiement;
using NattFlow.Entities;
using NattFlow.Exceptions;
using NattFlow.Repositories.Interfaces;
using NattFlow.Services.Interfaces;

namespace NattFlow.Services.Implementations
{
    public class PaiementService(
        IPaiementRepository paiementRepo,
        ICotisationRepository cotisationRepo,
        INotificationRepository notificationRepo
    ) : IPaiementService
    {
        public async Task<PaginationDTO<PaiementResponseDTO>> GetAllAsync(int page, int pageSize)
        {
            var (items, total) = await paiementRepo.GetAllAsync(page, pageSize);
            return new PaginationDTO<PaiementResponseDTO>
            {
                Data       = items.Select(ToDTO),
                Page       = page,
                PageSize   = pageSize,
                TotalCount = total
            };
        }

        public async Task<PaginationDTO<PaiementResponseDTO>> GetByUserIdAsync(int idUser, int page, int pageSize)
        {
            var (items, total) = await paiementRepo.GetByUserIdAsync(idUser, page, pageSize);
            return new PaginationDTO<PaiementResponseDTO>
            {
                Data       = items.Select(ToDTO),
                Page       = page,
                PageSize   = pageSize,
                TotalCount = total
            };
        }

        public async Task<PaginationDTO<PaiementResponseDTO>> GetByCotisationIdAsync(int idCotisation, int page, int pageSize)
        {
            var (items, total) = await paiementRepo.GetByCotisationIdAsync(idCotisation, page, pageSize);
            return new PaginationDTO<PaiementResponseDTO>
            {
                Data       = items.Select(ToDTO),
                Page       = page,
                PageSize   = pageSize,
                TotalCount = total
            };
        }

        public async Task<PaiementResponseDTO> GetByIdAsync(int id)
        {
            var paiement = await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable.");
            return ToDTO(paiement);
        }

        public async Task<PaiementResponseDTO> InitierAsync(PaiementInitierDTO dto)
        {
            var cotisation = await cotisationRepo.GetByIdAsync(dto.IdCotisation)
                ?? throw new NotFoundException($"Cotisation {dto.IdCotisation} introuvable.");

            // Vérifie les doublons sans pagination
            var existants = await paiementRepo.GetByUserIdRawAsync(dto.IdUser);
            var dejaPaye = existants.Any(p =>
                p.IdCotisation == dto.IdCotisation &&
                (p.Statut == StatutPaiement.EnAttente || p.Statut == StatutPaiement.Valide));

            if (dejaPaye)
                throw new ConflictException("Un paiement est déjà en cours ou validé pour cette cotisation.");

            var paiement = new Paiement
            {
                Montant      = cotisation.Montant,
                DatePaiement = DateTime.UtcNow,
                Method       = dto.Method,
                Statut       = StatutPaiement.EnAttente,
                IdCotisation = dto.IdCotisation,
                IdUser       = dto.IdUser
            };

            var created = await paiementRepo.CreateAsync(paiement);
            return ToDTO(created);
        }

        public async Task<PaiementResponseDTO> ValiderAsync(int id)
        {
            var paiement = await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable.");

            if (paiement.Statut != StatutPaiement.EnAttente)
                throw new ConflictException("Seul un paiement EN_ATTENTE peut être validé.");

            paiement.Statut = StatutPaiement.Valide;
            await paiementRepo.UpdateAsync(paiement);

            await notificationRepo.CreateAsync(new Notification
            {
                Type         = "PAIEMENT",
                Titre        = "Paiement validé ✓",
                Message      = $"Votre paiement de {paiement.Montant} FCFA a été validé.",
                IdUser       = paiement.IdUser,
                Lu           = false,
                DateCreation = DateTime.UtcNow
            });

            return ToDTO(await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable."));
        }

        public async Task<PaiementResponseDTO> RejeterAsync(int id)
        {
            var paiement = await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable.");

            if (paiement.Statut != StatutPaiement.EnAttente)
                throw new ConflictException("Seul un paiement EN_ATTENTE peut être rejeté.");

            paiement.Statut = StatutPaiement.Rejete;
            await paiementRepo.UpdateAsync(paiement);

            await notificationRepo.CreateAsync(new Notification
            {
                Type         = "PAIEMENT",
                Titre        = "Paiement rejeté ✗",
                Message      = $"Votre paiement de {paiement.Montant} FCFA a été rejeté. Contactez l'administrateur.",
                IdUser       = paiement.IdUser,
                Lu           = false,
                DateCreation = DateTime.UtcNow
            });

            return ToDTO(await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable."));
        }

        public async Task<PaiementResponseDTO> CreateAsync(PaiementCreateDTO dto)
        {
            var paiement = new Paiement
            {
                Montant      = dto.Montant,
                DatePaiement = dto.DatePaiement,
                Method       = dto.Method,
                Statut       = dto.Statut,
                IdCotisation = dto.IdCotisation,
                IdUser       = dto.IdUser
            };
            var created = await paiementRepo.CreateAsync(paiement);
            return ToDTO(created);
        }

        public async Task<PaiementResponseDTO> UpdateAsync(int id, PaiementCreateDTO dto)
        {
            var paiement = await paiementRepo.GetByIdAsync(id)
                ?? throw new NotFoundException($"Paiement {id} introuvable.");
            paiement.Montant      = dto.Montant;
            paiement.DatePaiement = dto.DatePaiement;
            paiement.Method       = dto.Method;
            paiement.Statut       = dto.Statut;
            paiement.IdCotisation = dto.IdCotisation;
            paiement.IdUser       = dto.IdUser;
            await paiementRepo.UpdateAsync(paiement);
            return ToDTO(paiement);
        }

        public async Task DeleteAsync(int id) => await paiementRepo.DeleteAsync(id);

        private static PaiementResponseDTO ToDTO(Paiement p) => new()
        {
            IdPaiement         = p.IdPaiement,
            Montant            = p.Montant,
            DatePaiement       = p.DatePaiement,
            Method             = p.Method,
            Statut             = p.Statut,
            IdCotisation       = p.IdCotisation,
            LibelleCotisation  = p.Cotisation?.Libelle ?? "",
            IdUser             = p.IdUser,
            NomUser            = p.User?.Nom ?? "",
            PrenomUser         = p.User?.Prenom ?? ""
        };
    }
}