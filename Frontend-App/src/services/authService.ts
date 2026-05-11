import axios from './axiosInstance';
import { API } from '../constants/api';
import type { AuthResponseDTO, LoginRequestDTO, StoredUser } from '../types/auth.types';

export const login = async (email: string, password: string): Promise<StoredUser> => {
  const payload: LoginRequestDTO = { email, password };

  const { data } = await axios.post<AuthResponseDTO>(API.auth.login, payload);

  const user: StoredUser = {
    email: data.email,
    prenom: data.prenom,
    role: { nomRole: data.role },
    expirationToken: data.expirationToken,
  };

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = (): StoredUser | null => {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};

export const getUserRole = (): string | null =>
  getUser()?.role.nomRole ?? null;

export const getUserFirstLetter = (): string =>
  getUser()?.prenom?.[0]?.toUpperCase() ?? '?';