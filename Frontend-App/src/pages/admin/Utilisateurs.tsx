import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Settings2 } from 'lucide-react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import { getAllRoles } from '../../services/roleService';
import type { UserResponseDTO, UserCreateDTO } from '../../types/user.types';
import type { RoleDTO } from '../../types/role.types';
import { UserFormModal }   from '../../components/layout/admin/modals/UserFormModal';
import { DeleteUserModal } from '../../components/layout/admin/modals/DeleteUserModal';
import { RoleFormModal }   from '../../components/layout/admin/modals/RoleFormModal';

export default function Utilisateurs() {
  const [users, setUsers]           = useState<UserResponseDTO[]>([]);
  const [roles, setRoles]           = useState<RoleDTO[]>([]);
  const [page, setPage]             = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const pageSize = 10;

  // Modals
  const [userModal, setUserModal]     = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [roleModal, setRoleModal]     = useState(false);
  const [selected, setSelected]       = useState<UserResponseDTO | null>(null);

  // Form state
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError]     = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

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

    const loadData = async () => {
      await Promise.all([
        fetchUsers(),
        fetchRoles()
      ]);
    };

    loadData();

  }, [fetchUsers, fetchRoles]);

  // Créer / Modifier
  const handleSubmit = async (dto: UserCreateDTO) => {
    setFormLoading(true);
    setFormError('');
    try {
      if (selected) {
        await updateUser(selected.idUser, dto);
      } else {
        await createUser(dto);
      }
      setUserModal(false);
      setSelected(null);
      fetchUsers();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setFormLoading(false);
    }
  };

  // Supprimer
  const handleDelete = async () => {
    if (!selected) return;
    setDeleteLoading(true);
    try {
      await deleteUser(selected.idUser);
      setDeleteModal(false);
      setSelected(null);
      fetchUsers();
    } finally {
      setDeleteLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-6 min-h-screen bg-[#f4f4f5]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0d0d0d]">Utilisateurs</h1>
          <p className="text-sm text-gray-500">{totalCount} utilisateur{totalCount > 1 ? 's' : ''} au total</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRoleModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0d0d0d] text-[#0d0d0d] text-sm font-semibold hover:bg-[#0d0d0d] hover:text-white transition-colors"
          >
            <Settings2 size={16} /> Gérer les rôles
          </button>
          <button
            onClick={() => { setSelected(null); setUserModal(true); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff7200] text-white text-sm font-semibold hover:bg-[#be5500] transition-colors"
          >
            <Plus size={16} /> Nouvel utilisateur
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-[#0d0d0d] rounded-xl overflow-hidden shadow-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs uppercase border-b border-white/10">
              <th className="px-6 py-4 text-left">Nom</th>
              <th className="px-6 py-4 text-left hidden md:table-cell">Email</th>
              <th className="px-6 py-4 text-left hidden lg:table-cell">Téléphone</th>
              <th className="px-6 py-4 text-left">Rôle</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingList ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                  Chargement...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.idUser} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ff7200] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold">
                          {u.prenom[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.prenom} {u.nom}</p>
                        <p className="text-white/40 text-xs md:hidden">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60 hidden md:table-cell">{u.email}</td>
                  <td className="px-6 py-4 text-white/60 hidden lg:table-cell">{u.telephone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      u.nomRole === 'ADMIN'
                        ? 'bg-[#ff7200]/20 text-[#ff7200]'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {u.nomRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setSelected(u); setUserModal(true); }}
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => { setSelected(u); setDeleteModal(true); }}
                        className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <span className="text-white/40 text-xs">
              Page {page} sur {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:bg-white/5 disabled:opacity-30 transition-colors"
              >
                Précédent
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:bg-white/5 disabled:opacity-30 transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {userModal && (
        <UserFormModal
          user={selected}
          roles={roles}
          onSubmit={handleSubmit}
          onClose={() => { setUserModal(false); setSelected(null); setFormError(''); }}
          loading={formLoading}
          error={formError}
        />
      )}

      {deleteModal && selected && (
        <DeleteUserModal
          userName={`${selected.prenom} ${selected.nom}`}
          onConfirm={handleDelete}
          onCancel={() => { setDeleteModal(false); setSelected(null); }}
          loading={deleteLoading}
        />
      )}

      {roleModal && (
        <RoleFormModal
          roles={roles}
          onClose={() => setRoleModal(false)}
          onRolesChanged={fetchRoles}
        />
      )}
    </div>
  );
}