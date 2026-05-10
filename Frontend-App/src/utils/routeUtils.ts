import type { StoredUser } from '../types/auth.types';

export const getDashboardPath = (user: StoredUser | null): string => {
  if (!user) return '/';
  if (user.role.nomRole === 'ADMIN') return '/admin';
  return '/';
};