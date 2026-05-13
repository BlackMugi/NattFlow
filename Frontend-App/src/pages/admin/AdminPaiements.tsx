import { Check, X, Trash2, Download } from 'lucide-react';
import { useAdminPaiements } from '../../hooks/useAdminPaiements';
import { exportPaiementsCSV } from '../../utils/exportUtils';
import { StatutBadge } from '../../components/suivis/StatutBadge';
import { formatDateFr } from '../../utils/dateUtils';
import {
  STATUT_PAIEMENT,
  FILTRES,
  FILTRE_LABELS,
} from '../../constants/paiement.constants';
import { DeleteConfirmModal } from '../../components/layout/admin/modals/DeleteConfirmModal';

function AdminPaiements() {
  const {
    paiements,
    paiementsFiltres,
    loading,
    page,
    setPage,
    totalPages,
    selected,
    deleteModal,
    deleteLoading,
    actionLoading,
    filtreStatut,
    setFiltreStatut,
    totalValide,
    enAttenteCount,
    openDelete,
    closeDeleteModal,
    handleValider,
    handleRejeter,
    handleDelete,
  } = useAdminPaiements();

  return (
    <div className="p-6 min-h-screen bg-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f4f5]">Paiements</h1>
          <p className="text-sm text-gray-500">
            {paiements.length} paiement{paiements.length > 1 ? 's' : ''} au
            total
          </p>
        </div>
        <button
          onClick={() => exportPaiementsCSV(paiements)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-300 text-sm font-semibold hover:bg-white hover:text-[#0d0d0d] transition-colors"
        >
          <Download size={16} /> Exporter CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0d0d0d] rounded-xl px-6 py-4">
          <p className="text-white/40 text-xs uppercase mb-1">Total encaissé</p>
          <p className="text-white text-xl font-bold">
            {totalValide.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-6 py-4">
          <p className="text-yellow-400 text-xs uppercase mb-1">En attente</p>
          <p className="text-yellow-400 text-xl font-bold">{enAttenteCount}</p>
        </div>
        <div className="bg-[#ff7200]/10 border border-[#ff7200]/20 rounded-xl px-6 py-4">
          <p className="text-[#ff7200] text-xs uppercase mb-1">
            Total paiements
          </p>
          <p className="text-[#ff7200] text-xl font-bold">{paiements.length}</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-4">
        {FILTRES.map((s) => (
          <button
            key={s}
            onClick={() => setFiltreStatut(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filtreStatut === s
                ? 'bg-[#0d0d0d] text-white'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            {FILTRE_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div className="bg-[#0d0d0d] rounded-xl overflow-hidden shadow-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs uppercase border-b border-white/10">
              <th className="px-6 py-4 text-left">Membre</th>
              <th className="px-6 py-4 text-left hidden md:table-cell">
                Cotisation
              </th>
              <th className="px-6 py-4 text-left">Montant</th>
              <th className="px-6 py-4 text-left hidden lg:table-cell">
                Méthode
              </th>
              <th className="px-6 py-4 text-left">Statut</th>
              <th className="px-6 py-4 text-left hidden lg:table-cell">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-white/40"
                >
                  Chargement...
                </td>
              </tr>
            ) : paiementsFiltres.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-white/40"
                >
                  Aucun paiement.
                </td>
              </tr>
            ) : (
              paiementsFiltres.map((p) => (
                <tr
                  key={p.idPaiement}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ff7200] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold">
                          {p.prenomUser[0]?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white font-medium">
                        {p.prenomUser} {p.nomUser}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60 hidden md:table-cell">
                    {p.libelleCotisation}
                  </td>
                  <td className="px-6 py-4 text-[#ff7200] font-semibold">
                    {p.montant.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="px-6 py-4 text-white/60 hidden lg:table-cell">
                    {p.method}
                  </td>
                  <td className="px-6 py-4">
                    <StatutBadge statut={p.statut} />
                  </td>
                  <td className="px-6 py-4 text-white/60 hidden lg:table-cell">
                    {formatDateFr(p.datePaiement)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {p.statut === STATUT_PAIEMENT.EN_ATTENTE && (
                        <>
                          <button
                            onClick={() => handleValider(p.idPaiement)}
                            disabled={actionLoading === p.idPaiement}
                            title="Valider"
                            className="p-2 rounded-lg text-green-400/60 hover:text-green-400 hover:bg-green-500/10 transition-colors disabled:opacity-30"
                          >
                            <Check size={15} />
                          </button>
                          <button
                            onClick={() => handleRejeter(p.idPaiement)}
                            disabled={actionLoading === p.idPaiement}
                            title="Rejeter"
                            className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30"
                          >
                            <X size={15} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => openDelete(p)}
                        className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <span className="text-white/40 text-xs">
              Page {page} sur {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:bg-white/5 disabled:opacity-30 transition-colors"
              >
                Précédent
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:bg-white/5 disabled:opacity-30 transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>

      {deleteModal && selected && (
        <DeleteConfirmModal
          message={`Supprimer le paiement de ${selected.prenomUser} ${selected.nomUser} (${selected.montant.toLocaleString('fr-FR')} FCFA) ?`}
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}

export default AdminPaiements;
