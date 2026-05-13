import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { STATUT_PAIEMENT } from '../../../../constants/paiement.constants';
import type { PaiementResponseDTO } from '../../../../types/paiement.types';

const STATUT_STYLES: Record<string, string> = {
  [STATUT_PAIEMENT.VALIDE]:     'bg-green-500/20 text-green-400',
  [STATUT_PAIEMENT.EN_ATTENTE]: 'bg-yellow-500/20 text-yellow-400',
  [STATUT_PAIEMENT.REJETE]:     'bg-red-500/20 text-red-400',
};

const STATUT_LABELS: Record<string, string> = {
  [STATUT_PAIEMENT.VALIDE]:     'Validé',
  [STATUT_PAIEMENT.EN_ATTENTE]: 'En attente',
  [STATUT_PAIEMENT.REJETE]:     'Rejeté',
};

interface Props {
  paiements: PaiementResponseDTO[];
}

export function DerniersPaiements({ paiements }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0d0d0d] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <p className="text-white font-semibold">Derniers paiements</p>
        <button
          onClick={() => navigate('/admin/paiements')}
          className="px-3 py-1 rounded-lg text-xs bg-[#ff7200]/20 text-[#ff7200] hover:bg-[#ff7200]/30 transition-colors flex items-center gap-1"
        >
          <Eye size={14} /> Voir plus
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-white/40 text-xs uppercase border-b border-white/10">
          <tr>
            <th className="px-6 py-3 text-left">Membre</th>
            <th className="px-6 py-3 text-left">Cotisation</th>
            <th className="px-6 py-3 text-left">Montant</th>
            <th className="px-6 py-3 text-left">Statut</th>
          </tr>
        </thead>
        <tbody>
          {paiements.map(p => (
            <tr key={p.idPaiement} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">
                <p className="text-white text-sm">{p.prenomUser} {p.nomUser}</p>
              </td>
              <td className="px-6 py-4 text-white/60 text-xs">{p.libelleCotisation}</td>
              <td className="px-6 py-4 text-[#ff7200] font-semibold text-sm">
                {p.montant.toLocaleString('fr-FR')} F
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUT_STYLES[p.statut]}`}>
                  {STATUT_LABELS[p.statut]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}