import { motion } from 'framer-motion';
import LandingImage from '../../../assets/img/landing-image.png';
function LandingPage() {
  return (
    <section className="min-h-screen bg-white text-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#ff7200] font-semibold text-sm uppercase tracking-widest mb-4">
              Gestion des cotisations
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Gérez vos cotisations <br />
              <span className="text-[#ff7200]">sans effort</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
              NattFlow digitalise la gestion des cotisations de votre
              association. Suivez les paiements et gérez vos membres en temps
              réel.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <a
                href="mes-paiements"
                className="bg-[#ff7200] text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition"
              >
                Commencer maintenant
              </a>
              <a
                href="#fonctionnalites"
                className="border border-[#ff7200] text-[#ff7200] font-bold px-8 py-3 rounded-xl hover:bg-[#ff7200] hover:text-white transition"
              >
                En savoir plus
              </a>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={LandingImage} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
