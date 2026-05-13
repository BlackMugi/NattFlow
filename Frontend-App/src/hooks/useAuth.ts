import { useMemo } from 'react';
import { getUser, getUserRole, getUserFirstLetter, logout } from '../services/authService';

export const useAuth = () => {
  const user = useMemo(() => getUser(), []);
  const isLoggedIn = !!user;
  const role = getUserRole();
  const firstLetter = getUserFirstLetter();

  return { user, isLoggedIn, role, firstLetter, logout };
};