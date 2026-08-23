import { PageSection } from '../../types';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import MediaImage from '../MediaImage';
import MediaVideo from '../MediaVideo';

interface HeroBlockProps {
  section: PageSection;
}

export default function HeroBlock({ section }: HeroBlockProps) {
  // Split title if it has newlines for cinematic effect
  const titleLines = section.title.split('\n');

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Simulator */}
      <div className="absolute inset-0 z-0">
        {section.mediaType === 'video' && section.mediaUrl ? (
          <MediaVideo 
            src={section.mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-luminosity"
          />
        ) : (
          <MediaImage 
            src={section.mediaUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-luminosity"
          />
        )}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-cinema-dark/90 via-cinema-dark/60 to-cinema-dark"
          style={{ opacity: 'var(--overlay-intensity)' }}
        ></div>
        <div className="absolute inset-0 bg-cinema-red/5 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        {section.subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="uppercase tracking-[0.3em] text-cinema-red-light text-xs md:text-sm font-semibold mb-6"
          >
            {section.subtitle}
          </motion.p>
        )}
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white mb-10 leading-none whitespace-pre-line"
        >
          {section.title}
        </motion.h1>
        
        {(section.buttonLink || section.showreelUrl) && (
          <motion.a 
            href={section.buttonLink || section.showreelUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="btn-primary group inline-flex items-center gap-4 px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-colors duration-500 hover:text-white"
          >
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>{section.buttonText || 'Play Showreel'}</span>
          </motion.a>
        )}
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
