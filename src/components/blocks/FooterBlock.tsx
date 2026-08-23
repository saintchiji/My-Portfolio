import { PageSection } from '../../types';
import { useBranding } from '../../context/BrandingContext';

interface FooterBlockProps {
  section: PageSection;
}

export default function FooterBlock({ section }: FooterBlockProps) {
  const { branding } = useBranding();
  
  const bgClasses = {
    'transparent': 'bg-transparent',
    'cinema-black': 'bg-cinema-black',
    'cinema-dark': 'bg-cinema-dark',
    'cinema-red-burn': 'bg-gradient-to-b from-cinema-dark via-cinema-red/10 to-cinema-dark',
  };

  const links = (section.items || []).filter(i => i.isVisible).sort((a, b) => a.order - b.order);

  return (
    <footer className={`w-full ${bgClasses[section.background]} border-t border-gray-900 pt-20 pb-10`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          <div className="md:col-span-2">
            {branding.logoMode === 'image' && branding.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" style={{ width: branding.footerLogoWidth }} className="mb-6 object-contain" />
            ) : (
              <h2 className="text-3xl font-bold tracking-tighter text-white mb-6 uppercase">
                {branding.logoText || 'VXN'}
              </h2>
            )}
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              {section.footerText}
            </p>
          </div>
          
          <div className="md:col-span-2 flex flex-wrap gap-8 justify-between md:justify-end">
            <div className="flex flex-col gap-4">
              {links.map(link => (
                <a key={link.id} href={link.buttonUrl} className="text-sm font-semibold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-900 text-xs text-gray-600 font-semibold tracking-widest uppercase">
          <p>{section.copyright}</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
