import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import type { UserResponseDTO } from '../../../../types/user.types';

interface Props {
  users: UserResponseDTO[];
}

export function DerniersMembres({ users }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0d0d0d] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <p className="text-white font-semibold">Derniers membres inscrits</p>
        <button
          onClick={() => navigate('/admin/utilisateurs')}
          className="px-3 py-1 rounded-lg text-xs bg-[#ff7200]/20 text-[#ff7200] hover:bg-[#ff7200]/30 transition-colors flex items-center gap-1"
        >
          <Eye size={14} /> Voir plus
        </button>
      </div>
      <div className="divide-y divide-white/5">
        {users.slice(0, 5).map(user => (
          <div key={user.idUser} className="px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff7200] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">
                {user.prenom?.[0]?.toUpperCase() ?? '?'}
              </span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user.prenom} {user.nom}</p>
              <p className="text-white/40 text-xs">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}