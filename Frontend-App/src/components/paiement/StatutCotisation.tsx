import { STATUT_PAIEMENT } from '../../constants/paiement.constants';
import type { PaiementResponseDTO } from '../../types/paiement.types';

const STATUT_STYLES: Record<string, string> = {
  [STATUT_PAIEMENT.VALIDE]:     'text-green-500',
  [STATUT_PAIEMENT.EN_ATTENTE]: 'text-yellow-500',
  [STATUT_PAIEMENT.REJETE]:     'text-red-500',
};

const STATUT_LABELS: Record<string, string> = {
  [STATUT_PAIEMENT.VALIDE]:     'Validé',
  [STATUT_PAIEMENT.EN_ATTENTE]: 'En attente',
  [STATUT_PAIEMENT.REJETE]:     'Rejeté',
};

interface Props {
  paiement?: PaiementResponseDTO;
}

export function StatutCotisation({ paiement }: Props) {
  if (!paiement) return <span className="text-xs text-gray-400">Non payé</span>;
  return (
    <span className={`text-xs font-semibold ${STATUT_STYLES[paiement.statut]}`}>
      {STATUT_LABELS[paiement.statut]}
    </span>
  );
}