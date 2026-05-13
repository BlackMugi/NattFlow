import { useEffect, useState, useCallback } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';
import { getAllRoles } from '../services/roleService';
import type { UserResponseDTO, UserCreateDTO } from '../types/user.types';
import type { RoleDTO } from '../types/role.types';
import { pageSize } from '../constants/pageSize.constants';

export function useUtilisateurs() {
  const [users, setUsers]               = useState<UserResponseDTO[]>([]);
  const [roles, setRoles]               = useState<RoleDTO[]>([]);
  const [page, setPage]                 = useState(1);
  const [totalCount, setTotalCount]     = useState(0);
  const [loadingList, setLoadingList]   = useState(false);
  const [selected, setSelected]         = useState<UserResponseDTO | null>(null);
  const [userModal, setUserModal]       = useState(false);
  const [deleteModal, setDeleteModal]   = useState(false);
  const [roleModal, setRoleModal]       = useState(false);
  const [formLoading, setFormLoading]   = useState(false);
  const [formError, setFormError]       = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchUsers = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await getAllUsers(page, pageSize);
      setUsers(res.data);
      setTotalCount(res.totalCount);
    } finally {
      setLoadingList(false);
    }
  }, [page]);

  const fetchRoles = useCallback(async () => {
    const res = await getAllRoles();
    setRoles(res);
  }, []);

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchUsers(), fetchRoles()]);
    };
    void load();
  }, [fetchUsers, fetchRoles]);

  const openCreate = () => {
    setSelected(null);
    setUserModal(true);
  };

  const openEdit = (u: UserResponseDTO) => {
    setSelected(u);
    setUserModal(true);
  };

  const openDelete = (u: UserResponseDTO) => {
    setSelected(u);
    setDeleteModal(true);
  };

  const closeUserModal = () => {
    setUserModal(false);
    setSelected(null);
    setFormError('');
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelected(null);
  };

  const handleSubmit = async (dto: UserCreateDTO) => {
    setFormLoading(true);
    setFormError('');
    try {
      if (selected) {
        await updateUser(selected.idUser, dto);
      } else {
        await createUser(dto);
      }
      closeUserModal();
      void fetchUsers();
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
      await deleteUser(selected.idUser);
      closeDeleteModal();
      void fetchUsers();
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    users, roles, page, setPage, totalCount, totalPages, loadingList,
    selected, userModal, deleteModal, roleModal, setRoleModal,
    formLoading, formError, deleteLoading,
    openCreate, openEdit, openDelete,
    closeUserModal, closeDeleteModal,
    handleSubmit, handleDelete, fetchRoles,
  };
}