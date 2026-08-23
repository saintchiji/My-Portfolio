import { PageSection } from '../../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

interface AboutPreviewBlockProps {
  section: PageSection;
}

export default function AboutPreviewBlock({ section }: AboutPreviewBlockProps) {
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

  return (
    <section className={`w-full ${bgClasses[section.background]}`} style={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            {section.subtitle && (
              <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">{section.subtitle}</h3>
            )}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-8">
              {section.title}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-7"
          >
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              {section.description}
            </p>
            <Link to={section.buttonLink || "/about"} className="text-white hover:text-cinema-red uppercase tracking-widest text-xs font-bold transition-colors inline-flex items-center gap-2 border-b border-gray-700 hover:border-cinema-red pb-1">
              {section.buttonText || "Read About"} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
