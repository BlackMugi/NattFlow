import { useEffect, useState, useCallback } from 'react';
import { getAllPaiements, validerPaiement, rejeterPaiement, deletePaiement } from '../services/paiementService';
import { STATUT_PAIEMENT } from '../constants/paiement.constants';
import { pageSize } from '../constants/pageSize.constants';
import type { PaiementResponseDTO } from '../types/paiement.types';

export function useAdminPaiements() {
  const [paiements, setPaiements]         = useState<PaiementResponseDTO[]>([]);
  const [loading, setLoading]             = useState(false);
  const [page, setPage]                   = useState(1);
  const [totalCount, setTotalCount]       = useState(0);
  const [selected, setSelected]           = useState<PaiementResponseDTO | null>(null);
  const [deleteModal, setDeleteModal]     = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [filtreStatut, setFiltreStatut]   = useState<string>('TOUS');

  const totalPages = Math.ceil(totalCount / pageSize);

  const totalValide = paiements
    .filter(p => p.statut === STATUT_PAIEMENT.VALIDE)
    .reduce((s, p) => s + p.montant, 0);

  const enAttenteCount = paiements.filter(p => p.statut === STATUT_PAIEMENT.EN_ATTENTE).length;

  const paiementsFiltres = filtreStatut === 'TOUS'
    ? paiements
    : paiements.filter(p => p.statut === filtreStatut);

  const fetchPaiements = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllPaiements(page, pageSize);
      setPaiements(res.data);
      setTotalCount(res.totalCount);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await getAllPaiements(page, pageSize);
        if (!cancelled) {
          setPaiements(res.data);
          setTotalCount(res.totalCount);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();

    return () => { cancelled = true; };
  }, [page]);

  // Quand on change de filtre, revenir à la page 1
  const handleFiltreStatut = (statut: string) => {
    setFiltreStatut(statut);
    setPage(1);
  };

  const handleValider = async (id: number) => {
    setActionLoading(id);
    try {
      await validerPaiement(id);
      void fetchPaiements();
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejeter = async (id: number) => {
    setActionLoading(id);
    try {
      await rejeterPaiement(id);
      void fetchPaiements();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleteLoading(true);
    try {
      await deletePaiement(selected.idPaiement);
      closeDeleteModal();
      void fetchPaiements();
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDelete = (p: PaiementResponseDTO) => {
    setSelected(p);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelected(null);
  };

  return {
    paiements, paiementsFiltres, loading,
    page, setPage, totalCount, totalPages,
    selected, deleteModal, deleteLoading, actionLoading,
    filtreStatut, setFiltreStatut: handleFiltreStatut,
    totalValide, enAttenteCount,
    openDelete, closeDeleteModal,
    handleValider, handleRejeter, handleDelete,
  };
}