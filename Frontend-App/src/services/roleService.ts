import { API } from '../constants/api';
import axiosInstance from './axiosInstance';
import type { RoleCreateDTO, RoleDTO } from '../types/role.types';

export const getAllRoles = async (): Promise<RoleDTO[]> => {
  const { data } = await axiosInstance.get<RoleDTO[]>(API.roles.getAll);
  return data;
};

export const createRole = async (dto: RoleCreateDTO): Promise<RoleDTO> => {
  const { data } = await axiosInstance.post<RoleDTO>(API.roles.create, dto);
  return data;
};

export const deleteRole = async (id: number): Promise<void> => {
  await axiosInstance.delete(API.roles.delete(id));
};