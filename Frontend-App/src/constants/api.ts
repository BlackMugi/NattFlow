const BASE = import.meta.env.VITE_API_URL;

export const API = {
  auth: {
    login: `${BASE}/auth/login`,
  },
  users: {
    getAll: (page: number, pageSize: number) => `${BASE}/users?page=${page}&pageSize=${pageSize}`,
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
  cotisations: {
    getAll: (page: number, pageSize: number) => `${BASE}/cotisations?page=${page}&pageSize=${pageSize}`,
    byId:   (id: number) => `${BASE}/cotisations/${id}`,
    create: `${BASE}/cotisations`,
    update: (id: number) => `${BASE}/cotisations/${id}`,
    delete: (id: number) => `${BASE}/cotisations/${id}`,
  },
  paiements: {
    getAll:       (page: number, pageSize: number) => `${BASE}/paiements?page=${page}&pageSize=${pageSize}`,
    byId:         (id: number) => `${BASE}/paiements/${id}`,
    byUser:       (idUser: number, page: number, pageSize: number) => `${BASE}/paiements/user/${idUser}?page=${page}&pageSize=${pageSize}`,
    byCotisation: (idCotisation: number, page: number, pageSize: number) => `${BASE}/paiements/cotisation/${idCotisation}?page=${page}&pageSize=${pageSize}`,
    create:       `${BASE}/paiements`,
    update:       (id: number) => `${BASE}/paiements/${id}`,
    initier:      `${BASE}/paiements/initier`,
    valider:      (id: number) => `${BASE}/paiements/${id}/valider`,
    rejeter:      (id: number) => `${BASE}/paiements/${id}/rejeter`,
    delete:       (id: number) => `${BASE}/paiements/${id}`,
  },
  notifications: {
    getAll:    (page: number, pageSize: number) => `${BASE}/notifications?page=${page}&pageSize=${pageSize}`,
    byId:      (id: number) => `${BASE}/notifications/${id}`,
    byUser:    (idUser: number, page: number, pageSize: number) => `${BASE}/notifications/user/${idUser}?page=${page}&pageSize=${pageSize}`,
    create:    `${BASE}/notifications`,
    broadcast: `${BASE}/notifications/broadcast`,
    marquerLu: (id: number) => `${BASE}/notifications/${id}/lu`,
    delete:    (id: number) => `${BASE}/notifications/${id}`,
  },
} as const;