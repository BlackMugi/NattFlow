import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import type { CotisationCreateDTO, CotisationResponseDTO } from '../../../../types/cotisation.types';

interface Props {
  cotisation?: CotisationResponseDTO | null;
  onSubmit: (dto: CotisationCreateDTO) => Promise<void>;
  onClose: () => void;
  loading: boolean;
  error: string;
}

const MOIS = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
];

const EMPTY: CotisationCreateDTO = {
  montant: 0, libelle: '', mois: '', dateEcheance: '',
};

export function CotisationFormModal({ cotisation, onSubmit, onClose, loading, error }: Props) {
  const isEdit = !!cotisation;

  const initial = useMemo<CotisationCreateDTO>(() => {
    if (!cotisation) return EMPTY;
    return {
      montant:      cotisation.montant,
      libelle:      cotisation.libelle,
      mois:         cotisation.mois,
      dateEcheance: cotisation.dateEcheance.slice(0, 10),
    };
  }, [cotisation]);

  const [form, setForm] = useState<CotisationCreateDTO>(initial);
  const set = (field: keyof CotisationCreateDTO, value: string | number) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-bold">
            {isEdit ? 'Modifier la cotisation' : 'Nouvelle cotisation'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Libellé */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Libellé</label>
            <input
              type="text"
              value={form.libelle}
              onChange={e => set('libelle', e.target.value)}
              required
              placeholder="Ex: Cotisation mensuelle janvier"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
            />
          </div>

          {/* Mois */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Mois</label>
            <select
              value={form.mois}
              onChange={e => set('mois', e.target.value)}
              required
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
            >
              <option value="" disabled className="bg-[#1a1a1a]">Sélectionner un mois</option>
              {MOIS.map(m => (
                <option key={m} value={m} className="bg-[#1a1a1a]">{m}</option>
              ))}
            </select>
          </div>

          {/* Montant */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Montant (FCFA)</label>
            <input
              type="number"
              value={form.montant}
              onChange={e => set('montant', Number(e.target.value))}
              required
              min={0}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
            />
          </div>

          {/* Date échéance */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs">Date d'échéance</label>
            <input
              type="date"
              value={form.dateEcheance}
              onChange={e => set('dateEcheance', e.target.value)}
              required
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7200] scheme-dark"
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
              {loading ? 'Enregistrement...' : isEdit ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}