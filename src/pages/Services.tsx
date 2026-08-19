import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Film, Scissors, PlaySquare, MonitorPlay, Clapperboard } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const IconMap: Record<string, any> = {
  'Scissors': Scissors,
  'Film': Film,
  'PlaySquare': PlaySquare,
  'MonitorPlay': MonitorPlay,
  'Clapperboard': Clapperboard
};

export default function Services() {
  const { content } = useContent();
  const services = content.services.filter(s => s.isVisible).sort((a, b) => a.order - b.order);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-6">{content.servicesPage.headline}</h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl">
            {content.servicesPage.description}
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-32 mb-32">
          {services.map((service, index) => {
            const Icon = IconMap[service.iconName] || Clapperboard;
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-5 sticky top-32">
                  <div className="flex items-center gap-4 mb-6 text-cinema-red">
                    <Icon className="w-8 h-8" />
                    <span className="uppercase tracking-widest text-xs font-bold">Service 0{index + 1}</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">{service.title}</h2>
                  <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 uppercase tracking-widest text-xs font-semibold">
                    Start a Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="lg:col-span-6 lg:col-start-7 bg-cinema-black border border-gray-800 p-8 md:p-12">
                  <h3 className="uppercase tracking-widest text-sm font-bold text-white mb-8 border-b border-gray-800 pb-4">Capabilities</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400">
                        <span className="text-cinema-red mt-1">•</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Who We Work With */}
        <section className="mb-32 border-t border-gray-800 pt-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">Who We Work With</h2>
            <p className="text-gray-400 font-light">Tailored production for diverse creative needs.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['Brands', 'Creators', 'Businesses', 'Artists', 'Couples', 'Agencies', 'Production Teams'].map(audience => (
              <span key={audience} className="px-6 py-3 border border-gray-800 text-gray-300 rounded-full text-sm uppercase tracking-widest bg-cinema-black">
                {audience}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cinema-black border border-gray-800 p-12 md:p-24 text-center">
          <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">Have a project in mind?</h3>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-12">Let's build something worth watching.</h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="btn-primary px-8 py-4 uppercase tracking-widest text-xs font-semibold">
              Start a Project
            </Link>
            <Link to="/work" className="px-8 py-4 uppercase tracking-widest text-xs font-semibold text-white border border-gray-700 hover:border-cinema-red transition-colors rounded-[var(--radius-custom)]">
              View Our Work
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
