import { useSuivisStatus } from '../hooks/useSuivisStatus';
import { StatutIcon } from '../components/suivis/StatutIcon';
import { StatutBadge } from '../components/suivis/StatutBadge';
import { formatDateFr } from '../utils/dateUtils';
import { FILTRES, FILTRE_LABELS } from '../constants/paiement.constants';

export default function SuivisStatus() {
  const { loading, filtre, setFiltre, paiementsFiltres, stats } = useSuivisStatus();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0d0d0d]">Suivi de mes paiements</h1>
        <p className="text-sm text-gray-500">Retrouvez l'état de tous vos paiements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Total versé</p>
          <p className="text-[#0d0d0d] text-lg font-bold">{stats.totalVerse.toLocaleString('fr-FR')} F</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 shadow-sm px-4 py-4">
          <p className="text-green-500 text-xs uppercase mb-1">Validés</p>
          <p className="text-green-600 text-lg font-bold">{stats.valides}</p>
        </div>
        <div className="bg-white rounded-xl border border-yellow-100 shadow-sm px-4 py-4">
          <p className="text-yellow-500 text-xs uppercase mb-1">En attente</p>
          <p className="text-yellow-600 text-lg font-bold">{stats.enAttente}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-100 shadow-sm px-4 py-4">
          <p className="text-red-400 text-xs uppercase mb-1">Rejetés</p>
          <p className="text-red-500 text-lg font-bold">{stats.rejetes}</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTRES.map(s => (
          <button
            key={s}
            onClick={() => setFiltre(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filtre === s ? 'bg-[#0d0d0d] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {FILTRE_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">Chargement...</div>
        ) : paiementsFiltres.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">Aucun paiement trouvé.</div>
        ) : (
          paiementsFiltres.map(p => (
            <div key={p.idPaiement} className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4">
              <StatutIcon statut={p.statut} />
              <div className="flex-1 min-w-0">
                <p className="text-[#0d0d0d] font-semibold text-sm truncate">{p.libelleCotisation}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                  <span>{p.method}</span>
                  <span>•</span>
                  <span>{formatDateFr(p.datePaiement)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <p className="text-[#ff7200] font-bold text-sm">{p.montant.toLocaleString('fr-FR')} FCFA</p>
                <StatutBadge statut={p.statut} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}