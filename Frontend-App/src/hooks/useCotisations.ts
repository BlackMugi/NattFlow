import { useEffect, useState } from 'react';
import {
  getAllCotisations,
  createCotisation,
  updateCotisation,
  deleteCotisation,
} from '../services/cotisationService';
import type { CotisationResponseDTO, CotisationCreateDTO } from '../types/cotisation.types';

export function useCotisations() {
  const [cotisations, setCotisations]   = useState<CotisationResponseDTO[]>([]);
  const [loading, setLoading]           = useState(false);
  const [selected, setSelected]         = useState<CotisationResponseDTO | null>(null);
  const [formModal, setFormModal]       = useState(false);
  const [deleteModal, setDeleteModal]   = useState(false);
  const [formLoading, setFormLoading]   = useState(false);
  const [formError, setFormError]       = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const totalMontant = cotisations.reduce((sum, c) => sum + c.montant, 0);

  const fetchCotisations = async () => {
    setLoading(true);
    try {
      const res = await getAllCotisations();
      setCotisations(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getAllCotisations();
        setCotisations(res.data);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const openCreate = () => {
    setSelected(null);
    setFormModal(true);
  };

  const openEdit = (c: CotisationResponseDTO) => {
    setSelected(c);
    setFormModal(true);
  };

  const openDelete = (c: CotisationResponseDTO) => {
    setSelected(c);
    setDeleteModal(true);
  };

  const closeFormModal = () => {
    setFormModal(false);
    setSelected(null);
    setFormError('');
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelected(null);
  };

  const handleSubmit = async (dto: CotisationCreateDTO) => {
    setFormLoading(true);
    setFormError('');
    try {
      if (selected) {
        await updateCotisation(selected.idCotisation, dto);
      } else {
        await createCotisation(dto);
      }
      closeFormModal();
      void fetchCotisations();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleteLoading(true);
    try {
      await deleteCotisation(selected.idCotisation);
      closeDeleteModal();
      void fetchCotisations();
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    cotisations, loading, selected, totalMontant,
    formModal, deleteModal, formLoading, formError, deleteLoading,
    openCreate, openEdit, openDelete,
    closeFormModal, closeDeleteModal,
    handleSubmit, handleDelete,
  };
}