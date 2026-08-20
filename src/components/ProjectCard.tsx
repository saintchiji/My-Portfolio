import { Link } from 'react-router-dom';
import { Project, PortfolioLayout } from '../types';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import MediaImage from './MediaImage';
import MediaVideo from './MediaVideo';

interface ProjectCardProps {
  project: Project;
  index: number;
  layout?: PortfolioLayout | 'hero';
  className?: string;
}

export default function ProjectCard({ project, index, layout = 'cinematic-grid', className = '' }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Silently handle autoplay restrictions
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const isCinematic = layout === 'cinematic-grid';
  const gridSpan = isCinematic && project.featured ? 'md:col-span-2 md:row-span-2' : '';
  const aspectClass = isCinematic && project.featured ? 'aspect-[16/9]' : layout === 'full-width' ? 'aspect-video' : 'aspect-[4/5]';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      className={`group relative overflow-hidden bg-cinema-black cursor-pointer rounded-sm ${gridSpan} ${className} focus-within:ring-2 focus-within:ring-cinema-red focus-within:ring-offset-4 focus-within:ring-offset-cinema-dark`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <Link to={`/project/${project.id}`} className="block w-full h-full focus:outline-none" aria-label={`View project: ${project.title}`}>
        <div className={`relative w-full h-full ${aspectClass} overflow-hidden`}>
          
          {/* Static Image Layer */}
          <MediaImage 
            src={project.imageUrl} 
            alt={`Thumbnail for ${project.title}`} 
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 ${isHovered && project.video.previewUrl ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'} grayscale-[50%] group-hover:grayscale-0 z-10`}
          />

          {/* Hover Video Preview Layer */}
          {project.video.previewUrl && (
            <MediaVideo
              ref={videoRef}
              src={project.video.previewUrl}
              muted
              loop
              playsInline
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          {/* Overlays */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-transparent transition-opacity duration-700 z-30 pointer-events-none group-hover:opacity-60"
            style={{ opacity: 'var(--overlay-intensity)' }}
          ></div>
          <div className="absolute inset-0 bg-cinema-red/10 opacity-0 group-hover:opacity-100 mix-blend-color-burn transition-opacity duration-700 z-30 pointer-events-none"></div>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out z-40">
          <div className="flex flex-wrap items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span className="w-6 h-[1px] bg-cinema-red-light"></span>
            <p className="uppercase tracking-widest text-[9px] md:text-[10px] font-bold text-cinema-red-light">
              {project.category} / {project.format}
            </p>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-2">{project.title}</h3>
          
          {/* Roles displayed on hover */}
          <div className="flex gap-2 flex-wrap h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
            {project.roles.map((role, i) => (
              <span key={i} className="text-[10px] uppercase tracking-wider text-gray-400 border border-gray-700 px-2 py-1 rounded-sm">
                {role}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
