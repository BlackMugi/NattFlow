import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getAllUsers } from '../../../../services/userService';
import { createNotification, broadcastNotification } from '../../../../services/notificationService';
import type { UserResponseDTO } from '../../../../types/user.types';

interface Props {
  isBroadcast: boolean;
  onClose: () => void;
  onSent: () => void;
}

const TYPES = ['INFO', 'PAIEMENT', 'RAPPEL', 'ALERTE'];

export function NotificationFormModal({ isBroadcast, onClose, onSent }: Props) {
  const [users, setUsers]     = useState<UserResponseDTO[]>([]);
  const [type, setType]       = useState('INFO');
  const [titre, setTitre]     = useState('');
  const [message, setMessage] = useState('');
  const [idUser, setIdUser]   = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!isBroadcast) {
      const load = async () => {
        const data = await getAllUsers(1, 100);
        setUsers(data.data);
      };
      void load();
    }
  }, [isBroadcast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isBroadcast) {
        await broadcastNotification({ type, titre, message });
      } else {
        await createNotification({ type, titre, message, idUser });
      }
      onSent();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-bold">
            {isBroadcast ? 'Diffuser à tous les membres' : 'Envoyer une notification'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Type */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
            >
              {TYPES.map(t => (
                <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>
              ))}
            </select>
          </div>

          {/* Destinataire (si pas broadcast) */}
          {!isBroadcast && (
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs">Destinataire</label>
              <select
                value={idUser}
                onChange={e => setIdUser(Number(e.target.value))}
                required
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
              >
                <option value={0} disabled className="bg-[#1a1a1a]">Sélectionner un membre</option>
                {users.map(u => (
                  <option key={u.idUser} value={u.idUser} className="bg-[#1a1a1a]">
                    {u.prenom} {u.nom}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Titre */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Titre</label>
            <input
              type="text"
              value={titre}
              onChange={e => setTitre(e.target.value)}
              required
              placeholder="Titre de la notification"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={3}
              placeholder="Contenu de la notification"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200] resize-none"
            />
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
              {loading ? 'Envoi...' : isBroadcast ? 'Diffuser' : 'Envoyer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}