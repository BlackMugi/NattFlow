import { STATUT_PAIEMENT } from '../../constants/paiement.constants';

const STYLES: Record<string, string> = {
  [STATUT_PAIEMENT.EN_ATTENTE]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  [STATUT_PAIEMENT.VALIDE]:     'bg-green-500/10 text-green-400 border-green-500/20',
  [STATUT_PAIEMENT.REJETE]:     'bg-red-500/10 text-red-400 border-red-500/20',
};

const LABELS: Record<string, string> = {
  [STATUT_PAIEMENT.EN_ATTENTE]: 'En attente',
  [STATUT_PAIEMENT.VALIDE]:     'Validé',
  [STATUT_PAIEMENT.REJETE]:     'Rejeté',
};

export function StatutBadge({ statut }: { statut: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${STYLES[statut] ?? 'bg-white/10 text-white/60'}`}>
      {LABELS[statut] ?? statut}
    </span>
  );
}