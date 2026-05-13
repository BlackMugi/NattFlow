import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { marquerCommeLu } from '../services/notificationService';
import type { NotificationResponseDTO } from '../types/notification.types';
import { formatDateLongFr } from '../utils/dateUtils';

function NotificationDetail() {
  const { state } = useLocation() as { state: { notification: NotificationResponseDTO } | null };
  const navigate  = useNavigate();

  const [notification, setNotification] = useState<NotificationResponseDTO | null>(
    state?.notification ?? null
  );

  const notificationId  = notification?.idNotification;
  const estDejaLue      = notification?.lu ?? true;

  useEffect(() => {
    if (!notificationId || estDejaLue) return;
    void marquerCommeLu(notificationId).then(() => {
      setNotification(prev => prev ? { ...prev, lu: true } : prev);
    });
  }, [notificationId, estDejaLue]);
  if (!notification) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-gray-400">
        Notification introuvable.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-[#ff7200] text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Retour
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Bandeau haut */}
        <div className="bg-[#ff7200]/5 border-b border-[#ff7200]/10 px-6 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ff7200]/10 flex items-center justify-center shrink-0">
            <Bell size={22} className="text-[#ff7200]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-[#0d0d0d] font-bold text-lg leading-tight">{notification.titre}</h1>
              <span className="px-2 py-0.5 rounded bg-[#ff7200]/10 text-[#ff7200] text-[10px] font-bold uppercase shrink-0">
                {notification.type}
              </span>
            </div>
            <p className="text-gray-400 text-xs">{formatDateLongFr(notification.dateCreation)}</p>
          </div>
        </div>

        {/* Corps */}
        <div className="px-6 py-6">
          <p className="text-[#0d0d0d] text-sm leading-relaxed whitespace-pre-line">
            {notification.message}
          </p>
        </div>

        {/* Pied */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${notification.lu ? 'bg-green-400' : 'bg-[#ff7200]'}`} />
            <span className="text-xs text-gray-400">{notification.lu ? 'Lue' : 'Non lue'}</span>
          </div>
          <button
            onClick={() => navigate('/mes-notifications')}
            className="text-xs text-[#ff7200] hover:underline"
          >
            ← Toutes mes notifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationDetail;