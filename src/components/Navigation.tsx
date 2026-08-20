import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useBranding } from '../context/BrandingContext';
import MediaImage from './MediaImage';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { content } = useContent();
  const { branding } = useBranding();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [...content.navigation]
    .filter(link => link.isVisible)
    .sort((a, b) => a.order - b.order);

  const renderLogo = () => {
    if (branding.logoMode === 'none') return null;
    
    if (branding.logoMode === 'image' && branding.primaryLogo) {
      return (
        <MediaImage 
          src={branding.primaryLogo} 
          alt={content.branding.logoText} 
          style={{ width: `${branding.logoWidth}px` }}
          className="object-contain md:block hidden" 
        />
      );
    }
    
    // Splitting logic for VXN style text logo
    return content.branding.logoText.length > 2 ? (
      <>{content.branding.logoText.slice(0, 1)}<span className="text-cinema-red">{content.branding.logoText.slice(1, 2)}</span>{content.branding.logoText.slice(2)}</>
    ) : content.branding.logoText;
  };

  const renderMobileLogo = () => {
    if (branding.logoMode === 'none') return null;
    
    if (branding.logoMode === 'image' && branding.mobileLogo) {
      return (
        <MediaImage 
          src={branding.mobileLogo} 
          alt={content.branding.logoText} 
          style={{ width: `${branding.mobileLogoWidth}px` }}
          className="object-contain block md:hidden" 
        />
      );
    }
    
    // Splitting logic for VXN style text logo
    return content.branding.logoText.length > 2 ? (
      <>{content.branding.logoText.slice(0, 1)}<span className="text-cinema-red">{content.branding.logoText.slice(1, 2)}</span>{content.branding.logoText.slice(2)}</>
    ) : content.branding.logoText;
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          isScrolled || location.pathname !== '/'
            ? 'bg-cinema-black/90 backdrop-blur-md border-cinema-red/10 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link 
            to="/" 
            className="font-serif text-2xl tracking-widest text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-red focus-visible:ring-offset-4 focus-visible:ring-offset-cinema-dark rounded"
            aria-label={`${content.branding.logoText} Home`}
          >
            {branding.logoMode === 'image' ? (
              <>
                {branding.primaryLogo && (
                  <div className="hidden md:block">
                    <MediaImage src={branding.primaryLogo} alt="Logo" style={{ width: `${branding.logoWidth}px` }} className="object-contain" />
                  </div>
                )}
                {branding.mobileLogo && (
                  <div className="md:hidden block">
                    <MediaImage src={branding.mobileLogo} alt="Logo" style={{ width: `${branding.mobileLogoWidth}px` }} className="object-contain" />
                  </div>
                )}
                {(!branding.primaryLogo && !branding.mobileLogo) && renderLogo()}
              </>
            ) : renderLogo()}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.id} 
                to={link.path}
                className={`uppercase tracking-widest text-xs font-medium transition-colors focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-cinema-red rounded px-1 ${
                  location.pathname.startsWith(link.path) && link.path !== '/'
                    ? 'text-white border-b-2 border-cinema-red pb-1' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-white hover:text-cinema-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-red rounded p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-cinema-black flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-cinema-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-red rounded p-1"
                aria-label="Close Mobile Menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  key={link.id}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-4xl hover:text-cinema-red transition-colors focus:outline-none focus-visible:text-cinema-red ${
                      location.pathname.startsWith(link.path) && link.path !== '/' ? 'text-cinema-red' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
