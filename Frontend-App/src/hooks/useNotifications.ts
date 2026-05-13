import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { getNotificationsByUser, marquerCommeLu } from '../services/notificationService';
import type { NotificationResponseDTO } from '../types/notification.types';
import { pageSize } from '../constants/pageSize.constants';

export function useNotifications() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationResponseDTO[]>([]);
  const [loading, setLoading]             = useState(false);
  const [page, setPage]                   = useState(1);
  const [totalCount, setTotalCount]       = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await getNotificationsByUser(user.idUser, page, pageSize);
        if (cancelled) return;
        setNotifications(res.data);
        setTotalCount(res.totalCount);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => { cancelled = true; };
  }, [user, page]);

  const handleClick = async (n: NotificationResponseDTO) => {
    if (!n.lu) await marquerCommeLu(n.idNotification);
    navigate(`/mes-notifications/${n.idNotification}`, { state: { notification: n } });
  };

  const nonLues = notifications.filter(n => !n.lu).length;

  return { notifications, loading, page, setPage, totalPages, nonLues, handleClick };
}