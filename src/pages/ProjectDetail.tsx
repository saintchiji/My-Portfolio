import { useParams, Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'motion/react';
import { ArrowLeft, Film } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useProjects();
  
  const project = projects.find(p => p.id === id);

  if (!project || !project.published) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <Film className="w-16 h-16 text-cinema-red mb-6 opacity-50" />
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">The project you are looking for does not exist or has been removed from the public portfolio.</p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 uppercase tracking-widest text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    );
  }

  // Find related projects based on category or roles, excluding the current one and unpublished ones
  const relatedProjects = projects
    .filter(p => p.published && p.id !== project.id && (p.category === project.category || p.roles.some(r => project.roles.includes(r))))
    .slice(0, 3);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors mb-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-red rounded px-1">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-12 h-[1px] bg-cinema-red-light"></span>
            <p className="uppercase tracking-widest text-xs font-bold text-cinema-red-light">
              {project.category} / {project.year}
            </p>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Video Player Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16 md:mb-24 shadow-2xl shadow-cinema-black/50"
        >
          <VideoPlayer video={project.video} poster={project.imageUrl} />
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 lg:col-span-7"
          >
            <h3 className="uppercase tracking-widest text-xs font-bold text-gray-500 mb-6">About the Project</h3>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
              {project.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 lg:col-start-9 space-y-10"
          >
            {project.client && (
              <div>
                <h3 className="uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-2">Client</h3>
                <p className="text-white text-lg">{project.client}</p>
              </div>
            )}
            <div>
              <h3 className="uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-2">Format</h3>
              <p className="text-white text-lg">{project.format}</p>
            </div>
            <div>
              <h3 className="uppercase tracking-widest text-[10px] font-bold text-gray-500 mb-4">Credits</h3>
              <ul className="space-y-2">
                {project.roles.map(role => (
                  <li key={role} className="text-white border-l-2 border-cinema-red pl-3 text-sm">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="border-t border-cinema-red/10 pt-20">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">RELATED WORK</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {relatedProjects.map((rp, index) => (
                <ProjectCard key={rp.id} project={rp} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
