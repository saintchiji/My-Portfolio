import { motion } from 'motion/react';
import { Film } from 'lucide-react';
import { PortfolioLayout } from '../types';

interface ProjectCardSkeletonProps {
  index?: number;
  featured?: boolean;
  layout?: PortfolioLayout | 'hero';
  className?: string;
}

export default function ProjectCardSkeleton({
  index = 0,
  featured = false,
  layout = 'cinematic-grid',
  className = ''
}: ProjectCardSkeletonProps) {
  const isCinematic = layout === 'cinematic-grid';
  const gridSpan = isCinematic && featured ? 'md:col-span-2 md:row-span-2' : '';
  const aspectClass = isCinematic && featured
    ? 'aspect-[16/9]'
    : layout === 'full-width'
      ? 'aspect-video'
      : 'aspect-[4/5]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
      className={`relative overflow-hidden bg-cinema-black/90 rounded-sm border border-gray-800/70 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${gridSpan} ${className}`}
      aria-hidden="true"
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-gradient-to-b from-gray-900/60 via-cinema-dark to-cinema-black`}>
        {/* Continuous cinematic shimmer light wave */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer" />
        </div>

        {/* Cinematic Film Watermark / Center Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-800/80 bg-cinema-black/40 flex items-center justify-center">
            <Film className="w-6 h-6 md:w-7 md:h-7 text-gray-700/60 animate-pulse" />
          </div>
        </div>

        {/* Ambient Top Film Grain / Edge Highlights */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

        {/* Bottom Cinema Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/60 to-transparent z-20 pointer-events-none" />

        {/* Bottom Content Skeleton */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-30 pointer-events-none">
          {/* Category Placeholder with Cinema Red Line */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1.5px] bg-cinema-red/40 animate-pulse" />
            <div className="h-2.5 w-24 bg-gray-800/90 rounded-sm animate-pulse" />
          </div>

          {/* Title Placeholder Bars */}
          <div className="space-y-2 mb-4">
            <div
              className={`h-6 md:h-7 bg-gray-800/80 rounded-sm animate-pulse ${
                featured ? 'w-3/5' : 'w-4/5'
              }`}
            />
            {featured && (
              <div className="h-4 bg-gray-800/50 rounded-sm w-2/5 animate-pulse" />
            )}
          </div>

          {/* Role Badges Placeholder */}
          <div className="flex gap-2 flex-wrap">
            <div className="h-5 w-16 bg-gray-800/40 border border-gray-800/60 rounded-sm animate-pulse" />
            <div className="h-5 w-20 bg-gray-800/40 border border-gray-800/60 rounded-sm animate-pulse" />
            {featured && (
              <div className="h-5 w-14 bg-gray-800/40 border border-gray-800/60 rounded-sm animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
