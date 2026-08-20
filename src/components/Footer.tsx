import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Video, Youtube, Linkedin, Facebook } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useBranding } from '../context/BrandingContext';
import MediaImage from './MediaImage';

const IconMap: Record<string, any> = {
  'Instagram': Instagram,
  'Youtube': Youtube,
  'Vimeo': Video,
  'Twitter': Twitter,
  'LinkedIn': Linkedin,
  'Facebook': Facebook
};

export default function Footer() {
  const { content } = useContent();
  const { branding } = useBranding();
  const socialLinks = content.socialLinks.filter(l => l.isVisible);

  return (
    <footer className="border-t border-cinema-red/10 bg-cinema-black text-gray-400" id="contact">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Let's create <br/><span className="text-cinema-red italic">something</span> beautiful.</h2>
            <p className="max-w-md text-sm leading-relaxed mb-8">
              {content.footer.text}
            </p>
            <a href={`mailto:${content.contact.email}`} className="inline-flex items-center gap-3 text-white uppercase tracking-widest text-xs font-bold hover:text-cinema-red transition-colors">
              <Mail className="w-4 h-4" />
              {content.contact.email}
            </a>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Socials</h4>
            <ul className="space-y-4">
              {socialLinks.map(link => {
                const Icon = IconMap[link.platform];
                if (!Icon) return null;
                return (
                  <li key={link.id}>
                    <a href={link.url} className="flex items-center gap-3 text-sm hover:text-cinema-red transition-colors">
                      <Icon className="w-4 h-4" /> {link.platform}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Location</h4>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {content.contact.location}
            </p>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase">
          <div className="flex items-center gap-4">
            {(branding.logoMode === 'image' && branding.footerLogo) ? (
              <MediaImage 
                src={branding.footerLogo} 
                alt="Footer Logo" 
                style={{ width: `${branding.footerLogoWidth}px` }}
                className="object-contain" 
              />
            ) : null}
            <p>&copy; {new Date().getFullYear()} {content.branding.logoText}.</p>
          </div>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
