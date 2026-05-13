import { API } from '../constants/api';
import axiosInstance from './axiosInstance';
import type { PaiementCreateDTO, PaiementInitierDTO, PaiementResponseDTO } from '../types/paiement.types';
import type { PaginationDTO } from '../types/pagination.type';

export const getAllPaiements = async (
  page = 1,
  pageSize = 10
): Promise<PaginationDTO<PaiementResponseDTO>> => {
  const { data } = await axiosInstance.get<PaginationDTO<PaiementResponseDTO>>(
    API.paiements.getAll(page, pageSize)
  );
  return data;
};

export const getPaiementsByUser = async (
  idUser: number,
  page = 1,
  pageSize = 10
): Promise<PaginationDTO<PaiementResponseDTO>> => {
  const { data } = await axiosInstance.get<PaginationDTO<PaiementResponseDTO>>(
    API.paiements.byUser(idUser, page, pageSize)
  );
  return data;
};

export const getPaiementsByCotisation = async (
  idCotisation: number,
  page = 1,
  pageSize = 10
): Promise<PaginationDTO<PaiementResponseDTO>> => {
  const { data } = await axiosInstance.get<PaginationDTO<PaiementResponseDTO>>(
    API.paiements.byCotisation(idCotisation, page, pageSize)
  );
  return data;
};

export const initierPaiement = async (dto: PaiementInitierDTO): Promise<PaiementResponseDTO> => {
  const { data } = await axiosInstance.post<PaiementResponseDTO>(API.paiements.initier, dto);
  return data;
};

export const validerPaiement = async (id: number): Promise<PaiementResponseDTO> => {
  const { data } = await axiosInstance.put<PaiementResponseDTO>(API.paiements.valider(id));
  return data;
};

export const rejeterPaiement = async (id: number): Promise<PaiementResponseDTO> => {
  const { data } = await axiosInstance.put<PaiementResponseDTO>(API.paiements.rejeter(id));
  return data;
};

export const createPaiement = async (dto: PaiementCreateDTO): Promise<PaiementResponseDTO> => {
  const { data } = await axiosInstance.post<PaiementResponseDTO>(API.paiements.create, dto);
  return data;
};

export const deletePaiement = async (id: number): Promise<void> => {
  await axiosInstance.delete(API.paiements.delete(id));
};