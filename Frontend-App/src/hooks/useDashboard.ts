import { useEffect, useState, useMemo } from 'react';
import { getAllUsers } from '../services/userService';
import { getAllCotisations } from '../services/cotisationService';
import { getAllPaiements } from '../services/paiementService';
import { STATUT_PAIEMENT } from '../constants/paiement.constants';
import { getLast6Months } from '../utils/dateUtils';
import type { PaiementResponseDTO } from '../types/paiement.types';
import type { UserResponseDTO } from '../types/user.types';

export const COLORS = {
  orange:      '#ff7200',
  green:       '#22c55e',
  yellow:      '#eab308',
  red:         '#ef4444',
  wave:        '#1dc8ff',
  mixx:        '#ffd004',
  orangeMoney: '#ff7900',
  especes:     '#018639',
  virement:    '#8b5cf6',
} as const;

export type MethodePaiement = 'Espèces' | 'Wave' | 'Mixx by Yass' | 'Orange Money' | 'Virement';

export interface MethodePaiementData {
  color: string;
  count: number;
  total: number;
}

export type MethodesPaiementType = Record<MethodePaiement, MethodePaiementData>;

const METHODE_MAP: Record<string, MethodePaiement> = {
  ESPECES:      'Espèces',
  WAVE:         'Wave',
  MIXX_BY_YASS: 'Mixx by Yass',
  ORANGE_MONEY: 'Orange Money',
  VIREMENT:     'Virement',
};

export function useDashboard() {
  const [paiements, setPaiements]             = useState<PaiementResponseDTO[]>([]);
  const [users, setUsers]                     = useState<UserResponseDTO[]>([]);
  const [totalUsers, setTotalUsers]           = useState(0);
  const [totalCotisations, setTotalCotisations] = useState(0);
  const [loading, setLoading]                 = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [usersRes, cotisationsRes, paiementsRes] = await Promise.all([
          getAllUsers(1, 100),
          getAllCotisations(1, 100),
          getAllPaiements(1, 100),
        ]);
        setTotalUsers(usersRes.totalCount);
        setTotalCotisations(cotisationsRes.totalCount);
        setPaiements(paiementsRes?.data ?? []);
        setUsers(usersRes.data);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const moisLabels = useMemo(() => getLast6Months(), []);

  const getMoisLabel = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const totalEncaisse = useMemo(() =>
    paiements
      .filter(p => p.statut === STATUT_PAIEMENT.VALIDE)
      .reduce((s, p) => s + p.montant, 0),
  [paiements]);

  const enAttente = useMemo(() =>
    paiements.filter(p => p.statut === STATUT_PAIEMENT.EN_ATTENTE),
  [paiements]);

  const moisMontant = useMemo(() =>
    moisLabels.map(mois =>
      paiements
        .filter(p => getMoisLabel(p.datePaiement) === mois && p.statut === STATUT_PAIEMENT.VALIDE)
        .reduce((s, p) => s + p.montant, 0)
    ),
  [paiements, moisLabels]);

  const moisNombre = useMemo(() =>
    moisLabels.map(mois =>
      paiements.filter(p => getMoisLabel(p.datePaiement) === mois).length
    ),
  [paiements, moisLabels]);

  const tauxPaiementParMois = useMemo(() =>
    moisLabels.map(mois => {
      const moisPaiements = paiements.filter(p => getMoisLabel(p.datePaiement) === mois);
      const valides = moisPaiements.filter(p => p.statut === STATUT_PAIEMENT.VALIDE).length;
      return moisPaiements.length > 0 ? Math.round((valides / moisPaiements.length) * 100) : 0;
    }),
  [paiements, moisLabels]);

  const methodesPaiement = useMemo((): MethodesPaiementType => {
    const data: MethodesPaiementType = {
      'Espèces':     { color: COLORS.especes,     count: 0, total: 0 },
      'Wave':        { color: COLORS.wave,         count: 0, total: 0 },
      'Mixx by Yass':{ color: COLORS.mixx,         count: 0, total: 0 },
      'Orange Money':{ color: COLORS.orangeMoney,  count: 0, total: 0 },
      'Virement':    { color: COLORS.virement,     count: 0, total: 0 },
    };
    paiements.forEach(p => {
      const key = METHODE_MAP[p.method];
      if (key) {
        data[key].count++;
        if (p.statut === STATUT_PAIEMENT.VALIDE) data[key].total += p.montant;
      }
    });
    return data;
  }, [paiements]);

  const derniersPaiements = useMemo(() =>
    [...paiements]
      .sort((a, b) => new Date(b.datePaiement).getTime() - new Date(a.datePaiement).getTime())
      .slice(0, 5),
  [paiements]);

  return {
    loading, users, totalUsers, totalCotisations,
    totalEncaisse, enAttente,
    moisLabels, moisMontant, moisNombre, tauxPaiementParMois,
    methodesPaiement, derniersPaiements,
  };
}