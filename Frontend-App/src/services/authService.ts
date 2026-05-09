import { API } from '../constants/api';
import type { AuthResponseDTO, StoredUser } from '../types/auth.types';

//Storage
const storage = {
  setToken: (token: string) => localStorage.setItem('token', token),
  setUser:  (user: StoredUser) => localStorage.setItem('user', JSON.stringify(user)),
  getToken: () => localStorage.getItem('token'),
  getUser:  (): StoredUser | null => {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  },
  clear: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

//Login
export const login = async (email: string, password: string): Promise<StoredUser> => {
  const response = await fetch(API.auth.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Email ou mot de passe incorrect');

  const data: AuthResponseDTO = await response.json();
  storage.setToken(data.token);

  try {
    const userResponse = await fetch(API.users.byId(data.userId), {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    if (userResponse.ok) {
      const fullUser: StoredUser = await userResponse.json();
      storage.setUser(fullUser);
      return fullUser;
    }
  } catch (err) {
    console.error('Erreur récupération utilisateur complet:', err);
  }


  const fallback: StoredUser = {
    id:    data.userId,
    prenom: data.prenom,
    nom:   '',
    email: data.email,
    role:  { id: 0, nomRole: data.role },
  };
  storage.setUser(fallback);
  return fallback;
};

//helpers

export const logout = (): void => storage.clear();

export const getUser = (): StoredUser | null => storage.getUser();

export const getUserFirstLetter = (): string =>
  getUser()?.prenom?.charAt(0).toUpperCase() ?? '';

export const getUserPrenom = (): string =>
  getUser()?.prenom ?? '';

export const getUserRole = (): string =>
  getUser()?.role?.nomRole?.toUpperCase() ?? '';

export const getToken = (): string | null => storage.getToken();