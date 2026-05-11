import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import type { UserCreateDTO, UserUpdateDTO, UserResponseDTO } from '../../../../types/user.types';
import type { RoleDTO } from '../../../../types/role.types';

interface Props {
  user?: UserResponseDTO | null;
  roles: RoleDTO[];
  onSubmit: (dto: UserCreateDTO | UserUpdateDTO) => Promise<void>;
  onClose: () => void;
  loading: boolean;
  error: string;
}

const EMPTY: UserCreateDTO = {
  email: '', password: '', nom: '', prenom: '',
  telephone: '', addresse: '', idRole: 0,
};

export function UserFormModal({ user, roles, onSubmit, onClose, loading, error }: Props) {
  const isEdit = !!user;

  const initialForm = useMemo<UserCreateDTO>(() => {
  if (user) {
    const matchedRole = roles.find(r => r.nomRole === user.nomRole);

    return {
      email: user.email,
      password: '',
      nom: user.nom,
      prenom: user.prenom,
      telephone: user.telephone,
      addresse: user.addresse,
      idRole: matchedRole?.idRole ?? 0,
    };
  }

  return EMPTY;
}, [user, roles]);

const [form, setForm] = useState<UserCreateDTO>(initialForm);

  const set = (field: keyof UserCreateDTO, value: string | number) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-lg border border-white/10 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-bold">
            {isEdit ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom"    value={form.prenom}    onChange={v => set('prenom', v)} />
            <Field label="Nom"       value={form.nom}       onChange={v => set('nom', v)} />
          </div>
          <Field label="Email" type="email" value={form.email} onChange={v => set('email', v)} />
          <Field
            label={isEdit ? 'Nouveau mot de passe (laisser vide = inchangé)' : 'Mot de passe'}
            type="password"
            value={form.password}
            onChange={v => set('password', v)}
            required={!isEdit}
          />
          <Field label="Téléphone"  value={form.telephone} onChange={v => set('telephone', v)} />
          <Field label="Adresse"    value={form.addresse}  onChange={v => set('addresse', v)} />

          {/* Rôle */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Rôle</label>
            <select
              value={form.idRole}
              onChange={e => set('idRole', Number(e.target.value))}
              required
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
            >
              <option value={0} disabled className="bg-[#1a1a1a]">Sélectionner un rôle</option>
              {roles.map(r => (
                <option key={r.idRole} value={r.idRole} className="bg-[#1a1a1a]">
                  {r.nomRole}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm bg-[#ff7200] text-white font-semibold hover:bg-[#be5500] transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : isEdit ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = 'text', required = true
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/60 text-xs">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
      />
    </div>
  );
}