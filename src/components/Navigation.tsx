import { Menu, X, Brush } from 'lucide-react';
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

  const brandName = branding.logoMark || content.branding?.logoText || 'VXN';
  const logoMode = branding.logoMode || 'text';

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

  // Styled brand text with cinematic red highlight for 3-letter names like VXN
  const renderTextLogo = () => {
    if (brandName.length > 2) {
      return (
        <span className="font-serif text-2xl tracking-widest text-white">
          {brandName.slice(0, 1)}
          <span className="text-cinema-red">{brandName.slice(1, 2)}</span>
          {brandName.slice(2)}
        </span>
      );
    }
    return (
      <span className="font-serif text-2xl tracking-widest text-white">
        {brandName}
      </span>
    );
  };

  const renderLogoContent = () => {
    if (logoMode === 'none') {
      return null;
    }

    if (logoMode === 'image') {
      const desktopLogo = branding.primaryLogo;
      const mobileLogo = branding.mobileLogo || branding.primaryLogo;

      if (!desktopLogo && !mobileLogo) {
        return renderTextLogo();
      }

      return (
        <>
          {/* Desktop Logo */}
          {desktopLogo && (
            <div className="hidden md:block">
              <MediaImage
                src={desktopLogo}
                alt={brandName}
                style={{ width: `${branding.logoWidth || 140}px` }}
                className="object-contain max-h-12"
              />
            </div>
          )}
          {/* Mobile Logo: falls back to desktop logo if mobile specific logo isn't set */}
          {mobileLogo && (
            <div className="md:hidden block">
              <MediaImage
                src={mobileLogo}
                alt={brandName}
                style={{ width: `${branding.mobileLogoWidth || 80}px` }}
                className="object-contain max-h-10"
              />
            </div>
          )}
        </>
      );
    }

    if (logoMode === 'mark') {
      const markIcon = branding.mobileLogo || branding.primaryLogo;
      return (
        <div className="flex items-center gap-3">
          {markIcon && (
            <MediaImage
              src={markIcon}
              alt="Logo Mark"
              style={{ width: `${Math.min(branding.logoWidth || 36, 40)}px` }}
              className="object-contain h-7"
            />
          )}
          {renderTextLogo()}
        </div>
      );
    }

    // Default: 'text' mode
    return renderTextLogo();
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
          
          {/* Brand Logo & Quick Edit Trigger */}
          <div className="relative group flex items-center">
            <Link 
              to="/" 
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-red focus-visible:ring-offset-4 focus-visible:ring-offset-cinema-dark rounded flex items-center"
              aria-label={`${brandName} Home`}
            >
              {renderLogoContent()}
            </Link>

            {/* Subtle edit logo hover icon for admins/owners */}
            <Link
              to="/admin/branding"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1.5 bg-gray-900/90 border border-gray-700/80 rounded-full text-gray-400 hover:text-cinema-red hover:border-cinema-red hidden md:flex items-center"
              title="Change Website Logo & Branding"
              aria-label="Edit Website Logo"
            >
              <Brush className="w-3 h-3" />
            </Link>
          </div>

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

            {/* Quick Link to Logo & Admin Settings */}
            <Link
              to="/admin/branding"
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/60 hover:bg-gray-800 border border-gray-800 hover:border-cinema-red/50 text-gray-400 hover:text-white rounded-md text-[11px] uppercase tracking-wider font-medium transition-all"
              title="Customize Logo & Site Branding"
            >
              <Brush className="w-3 h-3 text-cinema-red" />
              <span>Edit Logo</span>
            </Link>
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
            <div className="p-6 flex justify-between items-center border-b border-gray-900">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
              >
                {renderLogoContent()}
              </Link>
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                className="pt-6 border-t border-gray-800 w-48 text-center"
              >
                <Link
                  to="/admin/branding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-900 border border-gray-700 rounded-lg text-xs font-bold uppercase tracking-wider text-white hover:border-cinema-red transition-colors"
                >
                  <Brush className="w-4 h-4 text-cinema-red" />
                  <span>Change Logo / Admin</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
