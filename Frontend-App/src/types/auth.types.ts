export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  email: string;
  prenom: string;
  role: string;
  expirationToken: string;
}

export interface StoredUser {
  email: string;
  prenom: string;
  role: { nomRole: string };
  expirationToken: string;
}