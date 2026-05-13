export const STATUT_PAIEMENT = {
  EN_ATTENTE: 'EN_ATTENTE',
  VALIDE:     'VALIDE',
  REJETE:     'REJETE',
} as const;

export const METHODE_PAIEMENT = [
  { value: 'WAVE',         label: 'Wave' },
  { value: 'ORANGE_MONEY', label: 'Orange Money' },
  { value: 'MIXX_BY_YASS', label: 'Mixx by Yass' },
  { value: 'ESPECES',      label: 'Espèces' },
  { value: 'VIREMENT',     label: 'Virement' },
] as const;


export const FILTRE_LABELS: Record<string, string> = {
  TOUS:                        'Tous',
  [STATUT_PAIEMENT.EN_ATTENTE]: 'En attente',
  [STATUT_PAIEMENT.VALIDE]:     'Validés',
  [STATUT_PAIEMENT.REJETE]:     'Rejetés',
};

export const FILTRES = ['TOUS', STATUT_PAIEMENT.EN_ATTENTE, STATUT_PAIEMENT.VALIDE, STATUT_PAIEMENT.REJETE] as const;