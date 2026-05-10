import { Users, CreditCard, BarChart3, FileText, Bell, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: <Users size={28} />, titre: 'Gestion des membres', desc: 'Ajoutez, modifiez et suivez tous vos membres facilement.' },
  { icon: <CreditCard size={28} />, titre: 'Suivi des cotisations', desc: 'Visualisez en temps réel qui a payé et qui est en retard.' },
  { icon: <BarChart3 size={28} />, titre: 'Tableau de bord', desc: 'Des statistiques claires pour piloter votre association.' },
  { icon: <FileText size={28} />, titre: 'Export rapports', desc: 'Générez des rapports financiers en un clic.' },
  { icon: <Bell size={28} />, titre: 'Notifications', desc: 'Recevez des alertes automatiques pour les retards.' },
  { icon: <Shield size={28} />, titre: 'Sécurité', desc: 'Vos données sont protégées avec authentification JWT.' },
];


function Fonctionnalite(){
  return (
    <section id="fonctionnalites" className="min-h-screen py-20 px-6 bg-[#0d0d0d]">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-white text-center mb-12"
      >
        Nos <span className="text-[#ff7200]">fonctionnalités</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-[#111111] rounded-2xl p-6 border border-gray-800 hover:border-[#ff7200] transition"
          >
            <div className="text-[#ff7200] mb-4">{feature.icon}</div>
            <h3 className="text-white font-bold text-lg mb-2">{feature.titre}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Fonctionnalite