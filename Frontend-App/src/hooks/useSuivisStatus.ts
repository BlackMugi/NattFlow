import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getPaiementsByUser } from '../services/paiementService';
import { STATUT_PAIEMENT } from '../constants/paiement.constants';
import type { PaiementResponseDTO } from '../types/paiement.types';

export function useSuivisStatus() {
  const { user } = useAuth();
  const [paiements, setPaiements] = useState<PaiementResponseDTO[]>([]);
  const [loading, setLoading]     = useState(false);
  const [filtre, setFiltre]       = useState<string>('TOUS');

  useEffect(() => {
    if (!user?.idUser) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getPaiementsByUser(user.idUser);
        setPaiements(res?.data ?? []);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [user]);

  const valides    = paiements.filter(p => p.statut === STATUT_PAIEMENT.VALIDE);
  const enAttente  = paiements.filter(p => p.statut === STATUT_PAIEMENT.EN_ATTENTE);
  const rejetes    = paiements.filter(p => p.statut === STATUT_PAIEMENT.REJETE);
  const totalVerse = valides.reduce((s, p) => s + p.montant, 0);

  const paiementsFiltres = filtre === 'TOUS'
    ? paiements
    : paiements.filter(p => p.statut === filtre);

  return {
    loading, filtre, setFiltre,
    paiementsFiltres,
    stats: { totalVerse, valides: valides.length, enAttente: enAttente.length, rejetes: rejetes.length },
  };
}