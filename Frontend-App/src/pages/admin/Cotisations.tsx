import { Plus, Download } from 'lucide-react';
import { Pencil, Trash2 } from 'lucide-react';
import { useCotisations } from '../../hooks/useCotisations';
import { exportCotisationsCSV } from '../../utils/exportUtils';
import { formatDateFr } from '../../utils/dateUtils';
import { CotisationFormModal } from '../../components/layout/admin/modals/CotisationFormModal';
import { DeleteConfirmModal } from '../../components/layout/admin/modals/DeleteConfirmModal';

function Cotisations() {
  const {
    cotisations, loading, selected, totalMontant,
    formModal, deleteModal, formLoading, formError, deleteLoading,
    openCreate, openEdit, openDelete,
    closeFormModal, closeDeleteModal,
    handleSubmit, handleDelete,
  } = useCotisations();

  return (
    <div className="p-6 min-h-screen bg-black">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f4f5]">Cotisations</h1>
          <p className="text-sm text-gray-500">
            {cotisations.length} cotisation{cotisations.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportCotisationsCSV(cotisations)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-300 text-sm font-semibold hover:bg-[#0d0d0d] hover:text-white transition-colors"
          >
            <Download size={16} /> Exporter CSV
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff7200] text-white text-sm font-semibold hover:bg-[#be5500] transition-colors"
          >
            <Plus size={16} /> Nouvelle cotisation
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0d0d0d] rounded-xl px-6 py-4">
          <p className="text-white/40 text-xs uppercase mb-1">Total cotisations</p>
          <p className="text-white text-2xl font-bold">{cotisations.length}</p>
        </div>
        <div className="bg-[#ff7200] rounded-xl px-6 py-4">
          <p className="text-white/80 text-xs uppercase mb-1">Montant cumulé</p>
          <p className="text-white text-2xl font-bold">{totalMontant.toLocaleString('fr-FR')} FCFA</p>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-[#0d0d0d] rounded-xl overflow-hidden shadow-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs uppercase border-b border-white/10">
              <th className="px-6 py-4 text-left">Libellé</th>
              <th className="px-6 py-4 text-left hidden md:table-cell">Mois</th>
              <th className="px-6 py-4 text-left">Montant</th>
              <th className="px-6 py-4 text-left hidden lg:table-cell">Date Échéance</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-white/40">Chargement...</td>
              </tr>
            ) : cotisations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-white/40">Aucune cotisation.</td>
              </tr>
            ) : (
              cotisations.map(c => (
                <tr key={c.idCotisation} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{c.libelle}</p>
                  </td>
                  <td className="px-6 py-4 text-white/60 hidden md:table-cell">{c.mois}</td>
                  <td className="px-6 py-4">
                    <span className="text-[#ff7200] font-semibold">{c.montant.toLocaleString('fr-FR')} FCFA</span>
                  </td>
                  <td className="px-6 py-4 text-white/60 hidden lg:table-cell">
                    {formatDateFr(c.dateEcheance)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => openDelete(c)}
                        className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
      </div>

      {/* Modals */}
      {formModal && (
        <CotisationFormModal
          cotisation={selected}
          onSubmit={handleSubmit}
          onClose={closeFormModal}
          loading={formLoading}
          error={formError}
        />
      )}

      {deleteModal && selected && (
        <DeleteConfirmModal
          message={`Voulez-vous supprimer la cotisation "${selected.libelle}" ?`}
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}

export default Cotisations;