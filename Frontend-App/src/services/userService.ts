import { API } from '../constants/api';
import axiosInstance from './axiosInstance';
import type { PaginationDTO, UserCreateDTO, UserUpdateDTO, UserResponseDTO } from '../types/user.types';

export const getAllUsers = async (
  page = 1,
  pageSize = 20
): Promise<PaginationDTO<UserResponseDTO>> => {
  const { data } = await axiosInstance.get<PaginationDTO<UserResponseDTO>>(
    API.users.getAll(page, pageSize)
  );
  return data;
};

export const getUserById = async (id: number): Promise<UserResponseDTO> => {
  const { data } = await axiosInstance.get<UserResponseDTO>(API.users.byId(id));
  return data;
};

export const createUser = async (dto: UserCreateDTO): Promise<UserResponseDTO> => {
  const { data } = await axiosInstance.post<UserResponseDTO>(API.users.create, dto);
  return data;
};

export const updateUser = async (id: number, dto: UserUpdateDTO): Promise<UserResponseDTO> => {
  const payload = {
    ...dto,
    password: dto.password?.trim() || null,
  };
  const { data } = await axiosInstance.put<UserResponseDTO>(API.users.update(id), payload);
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(API.users.delete(id));
};