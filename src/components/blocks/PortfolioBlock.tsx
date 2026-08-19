import { PageSection } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import ProjectCard from '../ProjectCard';
import { motion } from 'motion/react';

interface PortfolioBlockProps {
  section: PageSection;
}

export default function PortfolioBlock({ section }: PortfolioBlockProps) {
  const { projects } = useProjects();
  
  // Filter and sort projects based on section configuration
  let sectionProjects = projects.filter(p => p.published).sort((a, b) => a.order - b.order);

  if (section.projectSelection.type === 'manual' && section.projectSelection.ids.length > 0) {
    sectionProjects = sectionProjects.filter(p => section.projectSelection.ids.includes(p.id));
    // Sort manually selected projects based on the order in the ids array
    sectionProjects.sort((a, b) => section.projectSelection.ids.indexOf(a.id) - section.projectSelection.ids.indexOf(b.id));
  }

  if (sectionProjects.length === 0) return null;

  // Background classes
  const bgClasses = {
    'transparent': 'bg-transparent',
    'cinema-black': 'bg-cinema-black',
    'cinema-dark': 'bg-cinema-dark',
    'cinema-red-burn': 'bg-gradient-to-b from-cinema-dark via-cinema-red/10 to-cinema-dark',
  };

  // Spacing map to actual rem values
  const spacingMap = {
    'tight': '3rem',
    'normal': '5rem',
    'loose': '8rem',
  };
  const paddingValue = `calc(${spacingMap[section.spacing]} * var(--spacing-scale))`;

  const containerClass = `px-6 md:px-12 max-w-[1600px] mx-auto ${bgClasses[section.background]}`;

  // Helper to render grid based on layout
  const renderLayout = () => {
    switch (section.layout) {
      case 'masonry':
        return (
          <div className={`columns-1 md:columns-${section.columns === 2 ? '2' : '3'} gap-6 md:gap-10 space-y-6 md:space-y-10`}>
            {sectionProjects.map((project, i) => (
              <div key={project.id} className="break-inside-avoid">
                <ProjectCard project={project} index={i} layout={section.layout} />
              </div>
            ))}
          </div>
        );
      
      case 'carousel':
        return (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 pb-8 hide-scrollbar">
            {sectionProjects.map((project, i) => (
              <div key={project.id} className="snap-center shrink-0 w-[85vw] md:w-[600px]">
                <ProjectCard project={project} index={i} layout={section.layout} />
              </div>
            ))}
          </div>
        );

      case 'editorial':
        return (
          <div className="space-y-20 md:space-y-32">
            {sectionProjects.map((project, i) => (
              <div key={project.id} className={`flex flex-col md:flex-row gap-10 md:gap-20 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-3/5">
                  <ProjectCard project={project} index={i} layout={section.layout} />
                </div>
                <div className="w-full md:w-2/5">
                  <h3 className="font-serif text-3xl md:text-5xl text-white mb-6">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">{project.description}</p>
                  <a href={`/project/${project.id}`} className="text-cinema-red uppercase tracking-widest text-xs font-bold hover:text-white transition-colors border-b border-cinema-red pb-1">
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        );

      case 'featured-supporting':
        const featured = sectionProjects[0];
        const supporting = sectionProjects.slice(1);
        return (
          <div className="space-y-6 md:space-y-10">
            {featured && (
              <div className="w-full">
                <ProjectCard project={featured} index={0} layout="full-width" />
              </div>
            )}
            {supporting.length > 0 && (
              <div className={`grid grid-cols-1 md:grid-cols-${section.columns || 3} gap-6 md:gap-10`}>
                {supporting.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i + 1} layout="cinematic-grid" />
                ))}
              </div>
            )}
          </div>
        );

      // Default grids (two-column, three-column, full-width, cinematic-grid)
      default:
        let gridColsClass = 'md:grid-cols-3';
        if (section.layout === 'two-column' || section.columns === 2) gridColsClass = 'md:grid-cols-2';
        if (section.layout === 'full-width' || section.columns === 1) gridColsClass = 'md:grid-cols-1';
        if (section.columns === 4) gridColsClass = 'md:grid-cols-2 lg:grid-cols-4';

        return (
          <div className={`grid grid-cols-1 ${gridColsClass} gap-6 md:gap-10`}>
            {sectionProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} layout={section.layout} />
            ))}
          </div>
        );
    }
  };

  return (
    <section className="w-full">
      <div className={containerClass} style={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
        <div className="mb-16 md:mb-20">
          {section.subtitle && (
            <p className="uppercase tracking-widest text-cinema-red-light text-xs font-bold mb-4">{section.subtitle}</p>
          )}
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">{section.title}</h2>
        </div>
        
        {renderLayout()}

        {/* Dynamic View All CTA */}
        {section.title.toLowerCase().includes('featured') || section.title.toLowerCase().includes('selected') ? (
          <div className="mt-16 md:mt-24 flex justify-center">
            <a href="/work" className="btn-primary inline-flex items-center gap-2 px-8 py-4 uppercase tracking-widest text-xs font-semibold">
              View All Work <span className="text-lg leading-none">&rarr;</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
