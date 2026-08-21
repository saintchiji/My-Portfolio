import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectContext';
import { useSections } from '../context/SectionContext';

export default function Work() {
  const { category } = useParams();
  const { projects } = useProjects();
  const { sections } = useSections();
  
  // Find the Portfolio block to get category visibility settings
  const portfolioSection = sections.find(s => s.type === 'portfolio');
  const visibleCategories = portfolioSection?.projectSelection?.type === 'categories' 
    ? portfolioSection.projectSelection.ids 
    : ['All', 'Long-Form', 'Short-Form', 'Commercial', 'Wedding', 'Cinematography', 'Video Editing', 'Music Video', 'Documentary', 'Fashion'];
  
  let publishedProjects = projects.filter(p => p.published);

  // Apply visibility rules
  if (portfolioSection?.projectSelection?.type === 'categories') {
    publishedProjects = publishedProjects.filter(p => visibleCategories.includes(p.category));
  }
  
  // Get unique categories from published projects
  let availableCategories = ['All', 'Featured', ...Array.from(new Set(publishedProjects.map(p => p.category)))];

  // Filter projects based on the current category param
  let displayedProjects = publishedProjects;
  
  if (category) {
    if (category.toLowerCase() === 'featured') {
      displayedProjects = publishedProjects.filter(p => p.featured);
    } else {
      // Basic formatting to match category slug back to name (e.g. "short-form" -> "Short-Form")
      displayedProjects = publishedProjects.filter(p => p.category.toLowerCase() === category.replace(/-/g, ' ').toLowerCase());
    }
  }

  // Ensure projects are sorted by order
  displayedProjects.sort((a, b) => a.order - b.order);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-6">WORK</h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl">
            Selected work across film, commercial production, cinematography and digital storytelling.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="mb-12 flex flex-wrap gap-4 border-b border-gray-800 pb-6">
          {availableCategories.map((cat) => {
            const isAll = cat === 'All';
            const slug = cat.toLowerCase().replace(/\s+/g, '-');
            const path = isAll ? '/work' : `/work/${slug}`;
            const isActive = isAll ? !category : category === slug;
            
            return (
              <Link 
                key={cat}
                to={path}
                className={`uppercase tracking-widest text-xs font-bold transition-colors px-3 py-1.5 rounded-full border ${
                  isActive 
                    ? 'border-cinema-red text-cinema-red bg-cinema-red/10' 
                    : 'border-transparent text-gray-500 hover:text-white hover:border-gray-700'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-gray-500 text-lg">No projects found for this category.</p>
          </div>
        )}

        <div className="mt-32 pt-12 border-t border-gray-800 flex flex-wrap gap-6 items-center justify-between">
          <p className="text-gray-400">Looking for something specific?</p>
          <div className="flex gap-4">
            <Link to="/services" className="btn-primary px-6 py-3 uppercase tracking-widest text-xs font-semibold">
              Explore Services
            </Link>
            <Link to="/contact" className="px-6 py-3 uppercase tracking-widest text-xs font-semibold text-white border border-gray-700 hover:border-cinema-red transition-colors rounded-[var(--radius-custom)]">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
