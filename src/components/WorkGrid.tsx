import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';
import { useProjects } from '../context/ProjectContext';

const FILTERS = ['All', 'Commercial', 'Short-form', 'Long-form', 'Cinematography', 'Video Editing'];

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { projects } = useProjects();

  const publishedProjects = projects
    .filter(p => p.published)
    .sort((a, b) => a.order - b.order);

  const filteredProjects = publishedProjects.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Commercial') return project.category === 'Commercial';
    if (activeFilter === 'Short-form') return project.format === 'Short-form';
    if (activeFilter === 'Long-form') return project.format === 'Long-form';
    if (activeFilter === 'Cinematography') return project.roles.includes('Cinematography');
    if (activeFilter === 'Video Editing') return project.roles.includes('Video Editing');
    return true;
  });

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto" id="work">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
        <div>
          <p className="uppercase tracking-widest text-cinema-red-light text-xs font-bold mb-4">Portfolio</p>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">SELECTED WORK</h2>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-8">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`uppercase tracking-widest text-[10px] md:text-xs pb-1 transition-colors relative ${
                activeFilter === filter ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-cinema-red"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
