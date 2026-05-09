const BASE = import.meta.env.VITE_API_URL;

export const API = {
  auth: {
    login: `${BASE}/auth/login`,
  },
  users: {
    byId: (id: number) => `${BASE}/users/${id}`,
  },
} as const;