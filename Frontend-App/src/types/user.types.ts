export interface UserResponseDTO {
  idUser: number;
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
  addresse: string;
  nomRole: string;
}

export interface UserCreateDTO {
  email: string;
    password?: string;
  nom: string;
  prenom: string;
  telephone: string;
  addresse: string;
  idRole: number;
}

export interface UserUpdateDTO {
  email: string;
  password?: string;
  nom: string;
  prenom: string;
  telephone: string;
  addresse: string;
  idRole: number;
}

