import { PageSection } from '../../types';
import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MediaImage from '../MediaImage';
import MediaVideo from '../MediaVideo';

interface HeroBlockProps {
  section: PageSection;
}

export default function HeroBlock({ section }: HeroBlockProps) {
  const desktopMedia = section.mediaUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80";
  const mobileMedia = section.mobileMediaUrl || desktopMedia;
  const desktopType = section.mediaType || 'image';
  const mobileType = section.mobileMediaType || desktopType;

  // Positioning
  const posClass = section.mediaPosition === 'top' 
    ? 'object-top' 
    : section.mediaPosition === 'bottom' 
      ? 'object-bottom' 
      : 'object-center';

  // Alignment
  const alignContainerClass = section.textAlign === 'left'
    ? 'text-left items-start'
    : section.textAlign === 'right'
      ? 'text-right items-end'
      : 'text-center items-center';

  const headingSizeClass = section.headingSize === 'massive'
    ? 'text-6xl md:text-8xl lg:text-[10rem]'
    : section.headingSize === 'compact'
      ? 'text-5xl md:text-6xl lg:text-7xl'
      : 'font-serif text-6xl md:text-8xl lg:text-9xl';

  const overlayIntensity = section.overlayOpacity !== undefined 
    ? section.overlayOpacity 
    : undefined;

  const overlayBgClass = section.overlayColor === 'cinema-black'
    ? 'from-black/95 via-black/70 to-black'
    : section.overlayColor === 'cinema-red-burn'
      ? 'from-black/90 via-cinema-red/20 to-black'
      : 'from-cinema-dark/95 via-cinema-dark/65 to-cinema-dark';

  const showSubtitle = section.showSubtitle !== false && Boolean(section.subtitle);
  const showPrimaryBtn = section.showPrimaryButton !== false && Boolean(section.buttonText || section.buttonLink || section.showreelUrl);
  const showSecondaryBtn = section.showSecondaryButton !== false && Boolean(section.secondaryButtonText);
  const showScroll = section.showScrollIndicator !== false;

  const primaryBtnText = section.buttonText || 'Play Showreel';
  const primaryBtnLink = section.buttonLink || section.showreelUrl || '#work';

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0">
        
        {/* Desktop Media */}
        <div className="hidden md:block w-full h-full">
          {desktopType === 'video' ? (
            <div className="relative w-full h-full">
              {section.videoFallbackImage && (
                <MediaImage
                  src={section.videoFallbackImage}
                  alt="Poster Fallback"
                  className={`absolute inset-0 w-full h-full object-cover ${posClass} opacity-40 grayscale`}
                />
              )}
              <MediaVideo 
                src={desktopMedia}
                autoPlay
                muted
                loop
                playsInline
                className={`w-full h-full object-cover ${posClass} opacity-40 grayscale mix-blend-luminosity`}
              />
            </div>
          ) : (
            <MediaImage 
              src={desktopMedia} 
              alt="Hero Background" 
              className={`w-full h-full object-cover ${posClass} opacity-40 grayscale mix-blend-luminosity`}
            />
          )}
        </div>

        {/* Mobile Media */}
        <div className="block md:hidden w-full h-full">
          {mobileType === 'video' ? (
            <div className="relative w-full h-full">
              {section.videoFallbackImage && (
                <MediaImage
                  src={section.videoFallbackImage}
                  alt="Poster Fallback"
                  className={`absolute inset-0 w-full h-full object-cover ${posClass} opacity-40 grayscale`}
                />
              )}
              <MediaVideo 
                src={mobileMedia}
                autoPlay
                muted
                loop
                playsInline
                className={`w-full h-full object-cover ${posClass} opacity-40 grayscale mix-blend-luminosity`}
              />
            </div>
          ) : (
            <MediaImage 
              src={mobileMedia} 
              alt="Hero Mobile Background" 
              className={`w-full h-full object-cover ${posClass} opacity-40 grayscale mix-blend-luminosity`}
            />
          )}
        </div>

        {/* Overlay Layers */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${overlayBgClass}`}
          style={{ opacity: overlayIntensity !== undefined ? overlayIntensity : 'var(--overlay-intensity)' }}
        />
        <div className="absolute inset-0 bg-cinema-red/5 mix-blend-multiply" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col ${alignContainerClass}`}>
        
        {/* Subtitle */}
        {showSubtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="uppercase tracking-[0.3em] text-cinema-red-light text-xs md:text-sm font-semibold mb-6 flex items-center gap-3"
          >
            <span className="w-6 h-[1px] bg-cinema-red-light hidden sm:inline-block" />
            <span>{section.subtitle}</span>
          </motion.p>
        )}
        
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className={`font-serif ${headingSizeClass} tracking-tighter text-white mb-10 leading-none whitespace-pre-line`}
        >
          {section.title}
        </motion.h1>
        
        {/* Call-to-action Buttons */}
        {(showPrimaryBtn || showSecondaryBtn) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            {showPrimaryBtn && (
              primaryBtnLink.startsWith('/') ? (
                <Link 
                  to={primaryBtnLink}
                  className="btn-primary group inline-flex items-center gap-3 px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:text-white"
                >
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform text-cinema-red-light" />
                  <span>{primaryBtnText}</span>
                </Link>
              ) : (
                <a 
                  href={primaryBtnLink}
                  className="btn-primary group inline-flex items-center gap-3 px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:text-white"
                >
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform text-cinema-red-light" />
                  <span>{primaryBtnText}</span>
                </a>
              )
            )}

            {showSecondaryBtn && (
              section.secondaryButtonLink?.startsWith('/') ? (
                <Link
                  to={section.secondaryButtonLink}
                  className="inline-flex items-center gap-3 px-7 py-4 border border-gray-700 hover:border-cinema-red text-gray-200 hover:text-white rounded-[var(--radius-custom)] uppercase tracking-widest text-xs font-semibold transition-colors duration-300"
                >
                  <span>{section.secondaryButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  href={section.secondaryButtonLink || '#contact'}
                  className="inline-flex items-center gap-3 px-7 py-4 border border-gray-700 hover:border-cinema-red text-gray-200 hover:text-white rounded-[var(--radius-custom)] uppercase tracking-widest text-xs font-semibold transition-colors duration-300"
                >
                  <span>{section.secondaryButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )
            )}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {showScroll && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="uppercase tracking-widest text-[9px] text-gray-500 font-mono">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-cinema-red to-transparent animate-pulse" />
        </motion.div>
      )}
    </section>
  );
}
