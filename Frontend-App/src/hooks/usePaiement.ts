import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getAllCotisations } from '../services/cotisationService';
import { getPaiementsByUser, initierPaiement } from '../services/paiementService';
import { STATUT_PAIEMENT } from '../constants/paiement.constants';
import type { CotisationResponseDTO } from '../types/cotisation.types';
import type { PaiementResponseDTO } from '../types/paiement.types';

export interface PaiementModal {
  cotisation: CotisationResponseDTO;
}

export function usePaiement() {
  const { user } = useAuth();

  const [cotisations, setCotisations] = useState<CotisationResponseDTO[]>([]);
  const [paiements, setPaiements]     = useState<PaiementResponseDTO[]>([]);
  const [loading, setLoading]         = useState(false);
  const [modal, setModal]             = useState<PaiementModal | null>(null);
  const [method, setMethod]           = useState('');
  const [payLoading, setPayLoading]   = useState(false);
  const [payError, setPayError]       = useState('');
  const [paySuccess, setPaySuccess]   = useState(false);

  useEffect(() => {
    if (!user?.idUser) return;
    const load = async () => {
      setLoading(true);
      try {
        const [cots, pays] = await Promise.all([
          getAllCotisations(),
          getPaiementsByUser(user.idUser),
        ]);
        setCotisations(cots?.data ?? []);
        setPaiements(pays?.data ?? []);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [user]);

  const getPaiementPourCotisation = (idCotisation: number) =>
    paiements.find(p => p.idCotisation === idCotisation);

  const totalVerse = (paiements ?? [])
    .filter(p => p.statut === STATUT_PAIEMENT.VALIDE)
    .reduce((s, p) => s + p.montant, 0);

  const moisEnCours = new Date().toLocaleDateString('fr-FR', { month: 'long' });
  const cotisationDuMois = cotisations.find(c =>
    c.mois.toLowerCase() === moisEnCours.toLowerCase()
  );
  const paiementDuMois = cotisationDuMois
    ? getPaiementPourCotisation(cotisationDuMois.idCotisation)
    : undefined;

  const closeModal = () => {
    setModal(null);
    setPayError('');
    setMethod('');
  };

  const handlePayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal || !user?.idUser) return;
    setPayLoading(true);
    setPayError('');
    try {
      await initierPaiement({
        idCotisation: modal.cotisation.idCotisation,
        idUser:       user.idUser,
        method,
      });
      setPaySuccess(true);
      const res = await getPaiementsByUser(user.idUser);
      setPaiements(res.data);
      setTimeout(() => {
        closeModal();
        setPaySuccess(false);
      }, 2000);
    } catch (err) {
      setPayError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setPayLoading(false);
    }
  };

  return {
    cotisations, paiements, loading,
    modal, setModal, closeModal,
    method, setMethod,
    payLoading, payError, paySuccess,
    totalVerse, cotisationDuMois, paiementDuMois,
    getPaiementPourCotisation, handlePayer,
  };
}