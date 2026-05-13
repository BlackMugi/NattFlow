export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  idUser: number;
  token: string;
  email: string;
  prenom: string;
  role: string;
  expirationToken: string;
}

export interface StoredUser {
  idUser: number;
  email: string;
  prenom: string;
  role: { nomRole: string };
  expirationToken: string;
}