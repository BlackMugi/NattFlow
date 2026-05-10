import { motion } from 'framer-motion';
import LandingPage from '../components/sections/homePage/LandingPage';
import Fonctionnalite from '../components/sections/homePage/Fonctionnalite';


const stats = [
  { valeur: '100%', label: 'Sécurisé' },
  { valeur: 'Temps réel', label: 'Suivi des paiements' },
  { valeur: 'PDF / Excel', label: 'Export des rapports' },
];

function Accueil() {
  return (
    <div className=" min-h-screen">
      <LandingPage/>

      <section className="bg-[#343434] py-16 px-6">
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
      
      <Fonctionnalite/>
    </div>
  );
}

export default Accueil;