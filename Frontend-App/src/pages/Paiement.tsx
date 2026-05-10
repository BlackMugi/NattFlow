import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const paiements = [
  { id: 1, mois: 'Janvier 2026', montant: 5000, method: 'Mobile Money', statut: 'Payé', date: '05/01/2026' },
  { id: 2, mois: 'Février 2026', montant: 5000, method: 'Espèces', statut: 'Payé', date: '03/02/2026' },
  { id: 3, mois: 'Mars 2026', montant: 5000, method: '-', statut: 'En attente', date: '-' },
  { id: 4, mois: 'Avril 2026', montant: 5000, method: '-', statut: 'En retard', date: '-' },
];

function getStatutStyle(statut: string) {
  if (statut === 'Payé') return { color: '#22c55e', icon: <CheckCircle size={16} /> };
  if (statut === 'En attente') return { color: '#f59e0b', icon: <Clock size={16} /> };
  return { color: '#ef4444', icon: <AlertCircle size={16} /> };
}

function Paiement() {
  const totalPaye = paiements
    .filter(p => p.statut === 'Payé')
    .reduce((acc, p) => acc + p.montant, 0);

  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold text-white mb-2"
        >
          Mes <span className="text-[#ff7200]">Paiements</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 mb-10"
        >
          Historique complet de vos paiements de cotisations.
        </motion.p>

        {/* RESUME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total paiements', valeur: paiements.length, color: '#ff7200' },
            { label: 'Montant payé', valeur: `${totalPaye.toLocaleString()} FCFA`, color: '#22c55e' },
            { label: 'En attente / retard', valeur: paiements.filter(p => p.statut !== 'Payé').length, color: '#ef4444' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#111111] rounded-2xl p-6 border border-gray-800"
            >
              <p className="text-gray-400 text-sm mb-1">{item.label}</p>
              <p className="text-2xl font-extrabold" style={{ color: item.color }}>
                {item.valeur}
              </p>
            </motion.div>
          ))}
        </div>

        {/* LISTE PAIEMENTS */}
        <div className="flex flex-col gap-4">
          {paiements.map((p, i) => {
            const style = getStatutStyle(p.statut);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-[#111111] rounded-2xl p-6 border border-gray-800 hover:border-[#ff7200] transition flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#1a1a1a] p-3 rounded-xl">
                    <CreditCard size={24} className="text-[#ff7200]" />
                  </div>
                  <div>
                    <p className="text-white font-bold">{p.mois}</p>
                    <p className="text-gray-400 text-sm">{p.method} · {p.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-white font-bold">{p.montant.toLocaleString()} FCFA</p>
                  <span className="flex items-center gap-1 text-sm font-semibold justify-end mt-1" style={{ color: style.color }}>
                    {style.icon} {p.statut}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Paiement;