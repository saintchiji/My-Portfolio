import { PageSection } from '../../types';
import { motion } from 'motion/react';
import { ArrowRight, Film, Scissors, PlaySquare, MonitorPlay, Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

const IconMap: Record<string, any> = {
  'Scissors': Scissors,
  'Film': Film,
  'PlaySquare': PlaySquare,
  'MonitorPlay': MonitorPlay,
  'Clapperboard': Clapperboard
};

interface ServicesPreviewBlockProps {
  section: PageSection;
}

export default function ServicesPreviewBlock({ section }: ServicesPreviewBlockProps) {
  const { content } = useContent();

  // Spacing map
  const spacingMap = {
    'tight': '3rem',
    'normal': '5rem',
    'loose': '8rem',
  };
  const paddingValue = `calc(${spacingMap[section.spacing]} * var(--spacing-scale))`;
  const bgClasses = {
    'transparent': 'bg-transparent',
    'cinema-black': 'bg-cinema-black',
    'cinema-dark': 'bg-cinema-dark',
    'cinema-red-burn': 'bg-gradient-to-b from-cinema-dark via-cinema-red/10 to-cinema-dark',
  };

  const previewServices = content.services.filter(s => s.isVisible).slice(0, 3);

  return (
    <section className={`w-full ${bgClasses[section.background]} border-y border-gray-800`} style={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {section.subtitle && (
            <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">{section.subtitle}</h3>
          )}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">{section.title}</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {previewServices.map((service, i) => {
            const Icon = IconMap[service.iconName] || Clapperboard;
            return (
              <div key={service.id} className="bg-cinema-black border border-gray-800 p-8 flex flex-col items-center justify-center gap-4 hover:border-cinema-red transition-colors group">
                <Icon className="w-8 h-8 text-gray-600 group-hover:text-cinema-red transition-colors" />
                <h4 className="text-white text-lg tracking-widest uppercase">{service.title}</h4>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to={section.buttonLink || "/services"} className="btn-primary inline-flex items-center gap-2 px-8 py-4 uppercase tracking-widest text-xs font-semibold">
            {section.buttonText || "View Services"} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
