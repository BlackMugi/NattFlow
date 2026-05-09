import type { StoredUser } from '../types/auth.types';

export const getDashboardPath = (user: StoredUser): string => {
  if (user.role.nomRole === 'ADMIN') return '/admin';
  return '/';
};