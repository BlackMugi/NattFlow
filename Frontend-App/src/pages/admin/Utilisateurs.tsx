import { Plus, Pencil, Trash2, Settings2 } from 'lucide-react';
import { useUtilisateurs } from '../../hooks/useUtilisateurs';
import { UserFormModal }   from '../../components/layout/admin/modals/UserFormModal';
import { DeleteUserModal } from '../../components/layout/admin/modals/DeleteUserModal';
import { RoleFormModal }   from '../../components/layout/admin/modals/RoleFormModal';

export default function Utilisateurs() {
  const {
    users, roles, page, setPage, totalCount, totalPages, loadingList,
    selected, userModal, deleteModal, roleModal, setRoleModal,
    formLoading, formError, deleteLoading,
    openCreate, openEdit, openDelete,
    closeUserModal, closeDeleteModal,
    handleSubmit, handleDelete, fetchRoles,
  } = useUtilisateurs();

  return (
    <div className="p-6 min-h-screen bg-black">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#f4f4f5]">Utilisateurs</h1>
          <p className="text-sm text-gray-500">
            {totalCount} utilisateur{totalCount > 1 ? 's' : ''} au total
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRoleModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-500 text-gray-300 text-sm font-semibold hover:bg-white hover:text-[#0d0d0d] transition-colors"
          >
            <Settings2 size={16} /> Gérer les rôles
          </button>
          <button
            onClick={openCreate}
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
                <td colSpan={5} className="px-6 py-12 text-center text-white/40">Chargement...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-white/40">Aucun utilisateur trouvé.</td>
              </tr>
            ) : (
              users.map(u => (
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
                      u.nomRole === 'ADMIN' ? 'bg-[#ff7200]/20 text-[#ff7200]' : 'bg-white/10 text-white/60'
                    }`}>
                      {u.nomRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => openDelete(u)}
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
            <span className="text-white/40 text-xs">Page {page} sur {totalPages}</span>
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
          onClose={closeUserModal}
          loading={formLoading}
          error={formError}
        />
      )}

      {deleteModal && selected && (
        <DeleteUserModal
          userName={`${selected.prenom} ${selected.nom}`}
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
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