import { StatutCotisation } from './StatutCotisation';
import { formatDateFr } from '../../utils/dateUtils';
import type { CotisationResponseDTO } from '../../types/cotisation.types';
import type { PaiementResponseDTO } from '../../types/paiement.types';

interface Props {
  cotisations:              CotisationResponseDTO[];
  loading:                  boolean;
  idCotisationMoisCourant?: number;
  getPaiement:              (idCotisation: number) => PaiementResponseDTO | undefined;
  onPayer:                  (cotisation: CotisationResponseDTO) => void;
}

export function CotisationList({
  cotisations, loading, idCotisationMoisCourant, getPaiement, onPayer,
}: Props) {
  if (loading) {
    return <div className="bg-white rounded-xl p-8 text-center text-gray-400">Chargement...</div>;
  }

  if (cotisations.length === 0) {
    return <div className="bg-white rounded-xl p-8 text-center text-gray-400">Aucune cotisation disponible.</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {cotisations.map(c => {
        const paiement       = getPaiement(c.idCotisation);
        const estMoisCourant = c.idCotisation === idCotisationMoisCourant;
        return (
          <div
            key={c.idCotisation}
            className={`bg-white rounded-xl border shadow-sm px-5 py-4 flex items-center gap-4 ${
              estMoisCourant ? 'border-[#ff7200]/30' : 'border-gray-100'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[#0d0d0d] font-semibold text-sm">{c.libelle}</p>
                {estMoisCourant && (
                  <span className="px-1.5 py-0.5 rounded bg-[#ff7200]/10 text-[#ff7200] text-[10px] font-bold">
                    CE MOIS
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-xs mt-0.5">
                {c.mois} • Échéance : {formatDateFr(c.dateEcheance)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <p className="text-[#ff7200] font-bold text-sm">{c.montant.toLocaleString('fr-FR')} FCFA</p>
              <StatutCotisation paiement={paiement} />
            </div>
            {!paiement && (
              <button
                onClick={() => onPayer(c)}
                className="ml-2 px-3 py-1.5 bg-[#ff7200] text-white text-xs font-semibold rounded-lg hover:bg-[#be5500] transition-colors shrink-0"
              >
                Payer
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}