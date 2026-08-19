import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function About() {
  const { content } = useContent();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* 01 — BIOGRAPHY */}
        <section className="mb-32 md:mb-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-5">
              <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-6">ABOUT</h1>
              <div className="w-16 h-[2px] bg-cinema-red mb-8"></div>
              <div className="space-y-2 uppercase tracking-widest text-xs font-bold text-gray-500 mb-8">
                <p>{content.branding.logoText} Studio</p>
                <p>Visual Storytelling & Cinematography</p>
                <p>{content.contact.location}</p>
              </div>
            </div>
            
            <div className="md:col-span-7 lg:col-span-6">
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
                {content.about.headline}
              </h2>
              <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
                <p>{content.about.biography1}</p>
                <p>{content.about.biography2}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 02 — WHAT WE DO */}
        <section className="mb-32 md:mb-48 border-t border-gray-800 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">02 — What We Do</h3>
              <h2 className="font-serif text-3xl md:text-5xl text-white">Capabilities</h2>
            </div>
            
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {content.about.capabilities.map((cap) => (
                <div key={cap.id} className="border-l border-gray-800 pl-6">
                  <h4 className="text-white text-xl mb-3">{cap.title}</h4>
                  <p className="text-gray-500 font-light">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — OUR APPROACH */}
        <section className="mb-32 md:mb-48 border-t border-gray-800 pt-24">
          <div className="mb-16">
            <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">03 — Our Approach</h3>
            <h2 className="font-serif text-3xl md:text-5xl text-white">The Execution Process</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {content.about.approach.map((phase) => (
              <div key={phase.id} className="bg-cinema-black p-8 border border-gray-800 hover:border-cinema-red transition-colors group">
                <span className="text-4xl font-serif text-gray-800 group-hover:text-cinema-red transition-colors block mb-6">{phase.step}</span>
                <h4 className="text-white text-lg mb-3 uppercase tracking-widest">{phase.title}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 — CREATIVE PHILOSOPHY */}
        <section className="mb-32 border-y border-gray-800 py-32 text-center bg-cinema-black">
          <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-8">04 — Philosophy</h3>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-white tracking-tight max-w-5xl mx-auto leading-tight">
            {content.about.philosophy}
          </h2>
        </section>

        {/* 05 — CTA */}
        <section className="flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl text-white mb-8">Ready to collaborate?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/work" className="btn-primary px-8 py-4 uppercase tracking-widest text-xs font-semibold inline-flex items-center gap-2">
              View Our Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="px-8 py-4 uppercase tracking-widest text-xs font-semibold text-white border border-gray-700 hover:border-cinema-red transition-colors rounded-[var(--radius-custom)]">
              Explore Services
            </Link>
            <Link to="/contact" className="px-8 py-4 uppercase tracking-widest text-xs font-semibold text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
