import { PageSection } from '../../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ContactBlockProps {
  section: PageSection;
}

export default function ContactBlock({ section }: ContactBlockProps) {
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

  const buttons = section.buttons || [];

  return (
    <section className={`w-full ${bgClasses[section.background]}`} style={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {section.subtitle && (
            <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">{section.subtitle}</h3>
          )}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white tracking-tight mb-8">{section.title}</h2>
          {section.description && (
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12">
              {section.description}
            </p>
          )}
          
          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {buttons.map(btn => btn.isVisible && (
                <a key={btn.id} href={btn.url} className="btn-primary inline-flex items-center gap-2 px-8 py-4 uppercase tracking-widest text-xs font-semibold w-full sm:w-auto justify-center">
                  {btn.text} <ArrowRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
