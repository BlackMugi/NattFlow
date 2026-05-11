const BASE = import.meta.env.VITE_API_URL;

export const API = {
  auth: {
    login: `${BASE}/auth/login`,
  },
  users: {
    getAll: (page: number, pageSize: number) =>
      `${BASE}/users?page=${page}&pageSize=${pageSize}`,
    byId:   (id: number) => `${BASE}/users/${id}`,
    create: `${BASE}/users`,
    update: (id: number) => `${BASE}/users/${id}`,
    delete: (id: number) => `${BASE}/users/${id}`,
  },
  roles: {
    getAll: `${BASE}/roles`,
    create: `${BASE}/roles`,
    delete: (id: number) => `${BASE}/roles/${id}`,
  },
} as const;