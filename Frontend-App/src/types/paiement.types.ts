export interface PaiementResponseDTO {
  idPaiement: number;
  montant: number;
  datePaiement: string;
  method: string;
  statut: string;
  idCotisation: number;
  libelleCotisation: string;
  idUser: number;
  nomUser: string;
  prenomUser: string;
}

export interface PaiementCreateDTO {
  montant: number;
  datePaiement: string;
  method: string;
  statut: string;
  idCotisation: number;
  idUser: number;
}

export interface PaiementInitierDTO {
  idCotisation: number;
  idUser: number;
  method: string;
}