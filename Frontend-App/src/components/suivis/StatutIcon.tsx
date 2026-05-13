import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { STATUT_PAIEMENT } from '../../constants/paiement.constants';

export function StatutIcon({ statut }: { statut: string }) {
  if (statut === STATUT_PAIEMENT.VALIDE)     return <CheckCircle size={18} className="text-green-400" />;
  if (statut === STATUT_PAIEMENT.EN_ATTENTE) return <Clock size={18} className="text-yellow-400" />;
  return <XCircle size={18} className="text-red-400" />;
}