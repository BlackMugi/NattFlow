interface Props {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export function DeleteUserModal({ userName, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-sm border border-white/10 shadow-xl">
        <h2 className="text-white text-lg font-bold mb-2">Supprimer l'utilisateur</h2>
        <p className="text-white/60 text-sm mb-6">
          Voulez-vous vraiment supprimer <span className="text-white font-semibold">{userName}</span> ?
          Cette action est irréversible.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
}