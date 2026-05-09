export interface AuthResponseDTO {
  token: string;
  userId: number;
  email: string;
  prenom: string;
  role: string;
}


export interface StoredUser {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  role: { id: number; nomRole: string };
}