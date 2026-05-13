import { API } from '../constants/api';
import axiosInstance from './axiosInstance';
import type { BroadcastNotificationDTO, NotificationCreateDTO, NotificationResponseDTO } from '../types/notification.types';
import type { PaginationDTO } from '../types/pagination.type';

export const getAllNotifications = async (
  page = 1,
  pageSize = 10
): Promise<PaginationDTO<NotificationResponseDTO>> => {
  const { data } = await axiosInstance.get<PaginationDTO<NotificationResponseDTO>>(
    API.notifications.getAll(page, pageSize)
  );
  return data;
};

export const getNotificationsByUser = async (
  idUser: number,
  page = 1,
  pageSize = 10
): Promise<PaginationDTO<NotificationResponseDTO>> => {
  const { data } = await axiosInstance.get<PaginationDTO<NotificationResponseDTO>>(
    API.notifications.byUser(idUser, page, pageSize)
  );
  return data;
};

export const createNotification = async (dto: NotificationCreateDTO): Promise<NotificationResponseDTO> => {
  const { data } = await axiosInstance.post<NotificationResponseDTO>(API.notifications.create, dto);
  return data;
};

export const broadcastNotification = async (dto: BroadcastNotificationDTO): Promise<void> => {
  await axiosInstance.post(API.notifications.broadcast, dto);
};

export const marquerCommeLu = async (id: number): Promise<NotificationResponseDTO> => {
  const { data } = await axiosInstance.put<NotificationResponseDTO>(API.notifications.marquerLu(id));
  return data;
};

export const deleteNotification = async (id: number): Promise<void> => {
  await axiosInstance.delete(API.notifications.delete(id));
};