import { CreditCard, CheckCircle, Clock } from 'lucide-react';
import { STATUT_PAIEMENT } from '../../constants/paiement.constants';
import { formatDateFr } from '../../utils/dateUtils';
import type { CotisationResponseDTO } from '../../types/cotisation.types';
import type { PaiementResponseDTO } from '../../types/paiement.types';

interface Props {
  cotisation: CotisationResponseDTO;
  paiement?:  PaiementResponseDTO;
  onPayer:    (cotisation: CotisationResponseDTO) => void;
}

export function CotisationDuMois({ cotisation, paiement, onPayer }: Props) {
  const borderClass =
    paiement?.statut === STATUT_PAIEMENT.VALIDE     ? 'bg-green-50 border-green-200'   :
    paiement?.statut === STATUT_PAIEMENT.EN_ATTENTE ? 'bg-yellow-50 border-yellow-200' :
    'bg-[#ff7200]/5 border-[#ff7200]';

  return (
    <div className={`mb-6 rounded-xl p-5 border-2 ${borderClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase text-[#ff7200]">Mois en cours</span>
          <p className="text-[#0d0d0d] font-bold text-lg">{cotisation.libelle}</p>
          <p className="text-gray-500 text-sm">
            {cotisation.mois} • Échéance : {formatDateFr(cotisation.dateEcheance)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-[#ff7200] text-2xl font-bold">
            {cotisation.montant.toLocaleString('fr-FR')} FCFA
          </p>
          {!paiement ? (
            <button
              onClick={() => onPayer(cotisation)}
              className="flex items-center gap-2 px-4 py-2 bg-[#ff7200] text-white text-sm font-semibold rounded-lg hover:bg-[#be5500] transition-colors"
            >
              <CreditCard size={16} /> Payer maintenant
            </button>
          ) : paiement.statut === STATUT_PAIEMENT.VALIDE ? (
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <CheckCircle size={16} /> Paiement validé
            </div>
          ) : paiement.statut === STATUT_PAIEMENT.EN_ATTENTE ? (
            <div className="flex items-center gap-1 text-yellow-600 text-sm font-semibold">
              <Clock size={16} /> En attente de validation
            </div>
          ) : (
            <button
              onClick={() => onPayer(cotisation)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              <CreditCard size={16} /> Repayer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}