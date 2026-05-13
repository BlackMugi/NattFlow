import { useEffect, useState } from 'react';
import { getAllNotifications, deleteNotification, marquerCommeLu } from '../services/notificationService';
import type { NotificationResponseDTO } from '../types/notification.types';

export function useNotificationsAdmin() {
  const [notifications, setNotifications] = useState<NotificationResponseDTO[]>([]);
  const [loading, setLoading]             = useState(false);
  const [selected, setSelected]           = useState<NotificationResponseDTO | null>(null);
  const [sendModal, setSendModal]         = useState(false);
  const [deleteModal, setDeleteModal]     = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isBroadcast, setIsBroadcast]     = useState(false);

  const nonLues = notifications.filter(n => !n.lu).length;

  const fetchNotifications = async () => {
    const res = await getAllNotifications();
    setNotifications(res.data);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchNotifications();
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const handleMarquerLu = async (id: number) => {
    await marquerCommeLu(id);
    void fetchNotifications();
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleteLoading(true);
    try {
      await deleteNotification(selected.idNotification);
      closeDeleteModal();
      void fetchNotifications();
    } finally {
      setDeleteLoading(false);
    }
  };

  const openBroadcast = () => { setIsBroadcast(true);  setSendModal(true); };
  const openSend      = () => { setIsBroadcast(false); setSendModal(true); };

  const openDelete = (n: NotificationResponseDTO) => {
    setSelected(n);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelected(null);
  };

  const onSent = () => {
    setSendModal(false);
    void fetchNotifications();
  };

  return {
    notifications, loading, selected, nonLues,
    sendModal, setSendModal, deleteModal,
    deleteLoading, isBroadcast,
    openBroadcast, openSend, openDelete, closeDeleteModal,
    handleMarquerLu, handleDelete, onSent,
  };
}