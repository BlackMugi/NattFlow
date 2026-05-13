import { API } from '../constants/api';
import axiosInstance from './axiosInstance';
import type { CotisationCreateDTO, CotisationResponseDTO } from '../types/cotisation.types';
import type { PaginationDTO } from '../types/pagination.type';

export const getAllCotisations = async (
  page = 1,
  pageSize = 10
): Promise<PaginationDTO<CotisationResponseDTO>> => {
  const { data } = await axiosInstance.get<PaginationDTO<CotisationResponseDTO>>(
    API.cotisations.getAll(page, pageSize)
  );
  return data;
};

export const createCotisation = async (dto: CotisationCreateDTO): Promise<CotisationResponseDTO> => {
  const { data } = await axiosInstance.post<CotisationResponseDTO>(API.cotisations.create, dto);
  return data;
};

export const updateCotisation = async (id: number, dto: CotisationCreateDTO): Promise<CotisationResponseDTO> => {
  const { data } = await axiosInstance.put<CotisationResponseDTO>(API.cotisations.update(id), dto);
  return data;
};

export const deleteCotisation = async (id: number): Promise<void> => {
  await axiosInstance.delete(API.cotisations.delete(id));
};