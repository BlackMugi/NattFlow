export interface CotisationResponseDTO {
  idCotisation: number;
  montant: number;
  libelle: string;
  mois: string;
  dateEcheance: string;
}

export interface CotisationCreateDTO {
  montant: number;
  libelle: string;
  mois: string;
  dateEcheance: string;
}