import { Play } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Simulator */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80" 
          alt="Showreel Background" 
          className="w-full h-full object-cover opacity-30 grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-dark/90 via-cinema-dark/60 to-cinema-dark"></div>
        <div className="absolute inset-0 bg-cinema-red/5 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="uppercase tracking-[0.3em] text-cinema-red-light text-xs md:text-sm font-semibold mb-6"
        >
          Director & Cinematographer
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white mb-10 leading-none"
        >
          CINEMATIC <br className="hidden md:block" /> VISIONS
        </motion.h1>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="group inline-flex items-center gap-4 bg-transparent border border-cinema-red text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-cinema-red transition-colors duration-500"
        >
          <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          <span>Play Showreel</span>
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="uppercase tracking-widest text-[10px] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cinema-red to-transparent"></div>
      </motion.div>
    </section>
  );
}
