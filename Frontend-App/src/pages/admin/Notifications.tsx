import { Bell, Trash2, Send, Radio } from 'lucide-react';
import { useNotificationsAdmin } from '../../hooks/useNotificationsAdmin';
import { formatDateFr } from '../../utils/dateUtils';
import { NotificationFormModal } from '../../components/layout/admin/modals/NotificationFormModal';
import { DeleteConfirmModal }    from '../../components/layout/admin/modals/DeleteConfirmModal';

export default function Notifications() {
  const {
    notifications, loading, selected, nonLues,
    sendModal, setSendModal, deleteModal,
    deleteLoading, isBroadcast,
    openBroadcast, openSend, openDelete, closeDeleteModal,
    handleMarquerLu, handleDelete, onSent,
  } = useNotificationsAdmin();

  return (
    <div className="p-6 min-h-screen bg-black">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f4f5]">Notifications</h1>
          <p className="text-sm text-gray-500">{nonLues} non lue{nonLues > 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openBroadcast}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-300 text-sm font-semibold hover:bg-white hover:text-[#0d0d0d] transition-colors"
          >
            <Radio size={16} /> Diffuser à tous
          </button>
          <button
            onClick={openSend}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff7200] text-white text-sm font-semibold hover:bg-[#be5500] transition-colors"
          >
            <Send size={16} /> Envoyer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0d0d0d] rounded-xl px-6 py-4">
          <p className="text-white/40 text-xs uppercase mb-1">Total</p>
          <p className="text-white text-xl font-bold">{notifications.length}</p>
        </div>
        <div className="bg-[#ff7200]/10 border border-[#ff7200]/20 rounded-xl px-6 py-4">
          <p className="text-[#ff7200] text-xs uppercase mb-1">Non lues</p>
          <p className="text-[#ff7200] text-xl font-bold">{nonLues}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4">
          <p className="text-green-400 text-xs uppercase mb-1">Lues</p>
          <p className="text-green-400 text-xl font-bold">{notifications.length - nonLues}</p>
        </div>
      </div>

      {/* Liste */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="bg-[#0d0d0d] rounded-xl px-6 py-12 text-center text-white/40">Chargement...</div>
        ) : notifications.length === 0 ? (
          <div className="bg-[#0d0d0d] rounded-xl px-6 py-12 text-center text-white/40">Aucune notification.</div>
        ) : (
          notifications.map(n => (
            <div
              key={n.idNotification}
              className={`bg-[#0d0d0d] rounded-xl px-6 py-4 flex items-start gap-4 border transition-colors ${
                n.lu ? 'border-white/5' : 'border-[#ff7200]/30'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                n.lu ? 'bg-white/10' : 'bg-[#ff7200]/20'
              }`}>
                <Bell size={16} className={n.lu ? 'text-white/40' : 'text-[#ff7200]'} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-white font-semibold text-sm truncate">{n.titre}</p>
                  {!n.lu && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#ff7200] text-white text-[10px] font-bold shrink-0">
                      Nouveau
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-xs mb-1">{n.message}</p>
                <div className="flex items-center gap-3 text-white/30 text-xs">
                  <span>Pour : {n.prenomUser} {n.nomUser}</span>
                  <span>•</span>
                  <span>{formatDateFr(n.dateCreation)}</span>
                  <span>•</span>
                  <span className="px-1.5 py-0.5 bg-white/5 rounded">{n.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!n.lu && (
                  <button
                    onClick={() => handleMarquerLu(n.idNotification)}
                    className="text-xs text-white/40 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Marquer lu
                  </button>
                )}
                <button
                  onClick={() => openDelete(n)}
                  className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {sendModal && (
        <NotificationFormModal
          isBroadcast={isBroadcast}
          onClose={() => setSendModal(false)}
          onSent={onSent}
        />
      )}

      {deleteModal && selected && (
        <DeleteConfirmModal
          message={`Supprimer la notification "${selected.titre}" ?`}
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}