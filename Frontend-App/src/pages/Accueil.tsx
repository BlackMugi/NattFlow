import { motion } from 'framer-motion';
import { Users, CreditCard, BarChart3, FileText, Bell, Shield } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';

const features = [
  { icon: <Users size={28} />, titre: 'Gestion des membres', desc: 'Ajoutez, modifiez et suivez tous vos membres facilement.' },
  { icon: <CreditCard size={28} />, titre: 'Suivi des cotisations', desc: 'Visualisez en temps réel qui a payé et qui est en retard.' },
  { icon: <BarChart3 size={28} />, titre: 'Tableau de bord', desc: 'Des statistiques claires pour piloter votre association.' },
  { icon: <FileText size={28} />, titre: 'Export rapports', desc: 'Générez des rapports financiers en un clic.' },
  { icon: <Bell size={28} />, titre: 'Notifications', desc: 'Recevez des alertes automatiques pour les retards.' },
  { icon: <Shield size={28} />, titre: 'Sécurité', desc: 'Vos données sont protégées avec authentification JWT.' },
];

const stats = [
  { valeur: '100%', label: 'Sécurisé' },
  { valeur: 'Temps réel', label: 'Suivi des paiements' },
  { valeur: 'PDF / Excel', label: 'Export des rapports' },
];

function Accueil() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      <Navbar />

      <section className="min-h-screen flex items-center justify-center text-center px-6 pt-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#ff7200] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Gestion des cotisations
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Gérez vos cotisations <br />
            <span className="text-[#ff7200]">sans effort</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
          >
            NattFlow digitalise la gestion des cotisations de votre association.
            Suivez les paiements et gérez vos membres en temps réel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a href="/login" className="bg-[#ff7200] text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition">
              Commencer maintenant
            </a>
            <a href="#fonctionnalites" className="border border-[#ff7200] text-[#ff7200] font-bold px-8 py-3 rounded-xl hover:bg-[#ff7200] hover:text-white transition">
              En savoir plus
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#111111] py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <p className="text-3xl font-extrabold text-[#ff7200]">{stat.valeur}</p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="fonctionnalites" className="py-20 px-6 bg-[#0d0d0d]">
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
    </div>
  );
}

export default Accueil;