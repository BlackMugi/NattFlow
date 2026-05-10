import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const cotisations = [
  { mois: 'Janvier 2026', montant: 5000, statut: 'Payé', date: '05/01/2026' },
  { mois: 'Février 2026', montant: 5000, statut: 'Payé', date: '03/02/2026' },
  { mois: 'Mars 2026', montant: 5000, statut: 'En attente', date: '-' },
  { mois: 'Avril 2026', montant: 5000, statut: 'En retard', date: '-' },
  { mois: 'Mai 2026', montant: 5000, statut: 'En attente', date: '-' },
];

function getStatutStyle(statut: string) {
  if (statut === 'Payé') return { color: '#22c55e', icon: <CheckCircle size={16} /> };
  if (statut === 'En attente') return { color: '#f59e0b', icon: <Clock size={16} /> };
  return { color: '#ef4444', icon: <AlertCircle size={16} /> };
}

function SuivisStatus() {
  const payees = cotisations.filter(c => c.statut === 'Payé').length;
  const total = cotisations.length;

  return (
    <div className="bg-[#0d0d0d] min-h-screen">

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold text-white mb-2"
        >
          Suivi du <span className="text-[#ff7200]">statut</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 mb-10"
        >
          Consultez l'état de vos cotisations en temps réel.
        </motion.p>

        {/* RESUME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total cotisations', valeur: total, color: '#ff7200' },
            { label: 'Payées', valeur: payees, color: '#22c55e' },
            { label: 'En attente / retard', valeur: total - payees, color: '#ef4444' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#111111] rounded-2xl p-6 border border-gray-800"
            >
              <p className="text-gray-400 text-sm mb-1">{item.label}</p>
              <p className="text-3xl font-extrabold" style={{ color: item.color }}>
                {item.valeur}
              </p>
            </motion.div>
          ))}
        </div>

        {/* TABLEAU */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#111111] rounded-2xl border border-gray-800 overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 px-6 py-4 font-medium">Période</th>
                <th className="text-left text-gray-400 px-6 py-4 font-medium">Montant</th>
                <th className="text-left text-gray-400 px-6 py-4 font-medium">Date paiement</th>
                <th className="text-left text-gray-400 px-6 py-4 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {cotisations.map((c, i) => {
                const style = getStatutStyle(c.statut);
                return (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="border-b border-gray-800 hover:bg-[#1a1a1a] transition"
                  >
                    <td className="px-6 py-4 text-white">{c.mois}</td>
                    <td className="px-6 py-4 text-white">{c.montant.toLocaleString()} FCFA</td>
                    <td className="px-6 py-4 text-gray-400">{c.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className="flex items-center gap-2 font-semibold"
                        style={{ color: style.color }}
                      >
                        {style.icon}
                        {c.statut}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

export default SuivisStatus;