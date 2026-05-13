import { CheckCircle } from 'lucide-react';
import { METHODE_PAIEMENT } from '../../constants/paiement.constants';

interface Props {
  libelle:    string;
  montant:    number;
  method:     string;
  payLoading: boolean;
  payError:   string;
  paySuccess: boolean;
  onClose:    () => void;
  onSubmit:   (e: React.FormEvent) => void;
  onMethod:   (method: string) => void;
}

export function PaiementModal({
  libelle, montant, method,
  payLoading, payError, paySuccess,
  onClose, onSubmit, onMethod,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
        {paySuccess ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle size={48} className="text-green-500" />
            <p className="text-[#0d0d0d] font-bold text-lg">Paiement soumis !</p>
            <p className="text-gray-400 text-sm text-center">
              Votre paiement est en attente de validation par l'administrateur.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#0d0d0d] font-bold text-lg">Payer une cotisation</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-500 text-xs uppercase mb-1">Cotisation</p>
              <p className="text-[#0d0d0d] font-semibold">{libelle}</p>
              <p className="text-[#ff7200] font-bold text-xl mt-1">
                {montant.toLocaleString('fr-FR')} FCFA
              </p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-500 text-xs">Méthode de paiement</label>
                <select
                  value={method}
                  onChange={e => onMethod(e.target.value)}
                  required
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#ff7200]"
                >
                  <option value="" disabled>Choisir une méthode</option>
                  {METHODE_PAIEMENT.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              {payError && <p className="text-red-500 text-sm">{payError}</p>}

              <button
                type="submit"
                disabled={payLoading}
                className="w-full py-2.5 bg-[#ff7200] text-white font-bold rounded-lg hover:bg-[#be5500] transition-colors disabled:opacity-50"
              >
                {payLoading ? 'Envoi...' : 'Confirmer le paiement'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}