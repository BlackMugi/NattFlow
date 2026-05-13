import { motion } from 'framer-motion';
import LandingPage from '../components/sections/homePage/LandingPage';
import Fonctionnalite from '../components/sections/homePage/Fonctionnalite';
import { STATS } from '../constants/accueil.constants';

function Accueil() {
  return (
    <div className="min-h-screen">
      <LandingPage />

      <section className="bg-[#343434] py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {STATS.map((stat) => (
            <motion.div
              key={stat.valeur}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: STATS.indexOf(stat) * 0.2 }}
            >
              <p className="text-3xl font-extrabold text-[#ff7200]">{stat.valeur}</p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Fonctionnalite />
    </div>
  );
}

export default Accueil;