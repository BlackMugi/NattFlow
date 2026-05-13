import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { formatDateFr } from '../utils/dateUtils';
import type { NotificationResponseDTO } from '../types/notification.types';

function NotificationItem({
  n, onClick,
}: {
  n: NotificationResponseDTO;
  onClick: (n: NotificationResponseDTO) => void;
}) {
  return (
    <button
      onClick={() => onClick(n)}
      className={`w-full text-left bg-white rounded-xl border shadow-sm px-5 py-4 flex items-start gap-4 hover:shadow-md transition-shadow ${
        !n.lu ? 'border-[#ff7200]/30' : 'border-gray-100'
      }`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
        !n.lu ? 'bg-[#ff7200]/10' : 'bg-gray-100'
      }`}>
        <Bell size={16} className={!n.lu ? 'text-[#ff7200]' : 'text-gray-400'} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={`text-sm font-semibold truncate ${!n.lu ? 'text-[#0d0d0d]' : 'text-gray-500'}`}>
            {n.titre}
          </p>
          {!n.lu && (
            <span className="px-1.5 py-0.5 rounded-full bg-[#ff7200] text-white text-[10px] font-bold shrink-0">
              Nouveau
            </span>
          )}
        </div>
        <p className="text-gray-400 text-xs truncate">{n.message}</p>
        <p className="text-gray-300 text-[10px] mt-1">{formatDateFr(n.dateCreation)}</p>
      </div>
    </button>
  );
}

function MesNotifications() {
  const { notifications, loading, page, setPage, totalPages, nonLues, handleClick } = useNotifications();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0d0d0d]">Mes notifications</h1>
        <p className="text-sm text-gray-500">
          {nonLues > 0 ? `${nonLues} non lue${nonLues > 1 ? 's' : ''}` : 'Toutes lues'}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">Chargement...</div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">Aucune notification.</div>
        ) : (
          notifications.map(n => (
            <NotificationItem key={n.idNotification} n={n} onClick={handleClick} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <span className="text-gray-400 text-xs">Page {page} sur {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs text-gray-500 border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              Précédent
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs text-gray-500 border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MesNotifications;