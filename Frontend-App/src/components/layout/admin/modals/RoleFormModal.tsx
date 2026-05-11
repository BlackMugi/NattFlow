import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { RoleDTO } from '../../../../types/role.types';
import { createRole, deleteRole } from '../../../../services/roleService';

interface Props {
  roles: RoleDTO[];
  onClose: () => void;
  onRolesChanged: () => void;
}

export function RoleFormModal({ roles, onClose, onRolesChanged }: Props) {
  const [nomRole, setNomRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleCreate = async () => {
    if (!nomRole.trim()) return;
    setLoading(true);
    setError('');
    try {
      await createRole({ nomRole: nomRole.trim().toUpperCase() });
      setNomRole('');
      onRolesChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRole(id);
      onRolesChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-bold">Gestion des rôles</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Liste des rôles existants */}
        <div className="flex flex-col gap-2 mb-6">
          {roles.map((role) => (
            <div key={role.idRole} className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-lg">
              <span className="text-white text-sm font-medium">{role.nomRole}</span>
              <button
                onClick={() => handleDelete(role.idRole)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Créer un rôle */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nom du rôle (ex: MODERATEUR)"
            value={nomRole}
            onChange={(e) => setNomRole(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
          />
          <button
            onClick={handleCreate}
            disabled={loading || !nomRole.trim()}
            className="px-4 py-2 bg-[#ff7200] text-white rounded-lg text-sm font-semibold hover:bg-[#be5500] transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Ajouter'}
          </button>
        </div>

        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
      </div>
    </div>
  );
}