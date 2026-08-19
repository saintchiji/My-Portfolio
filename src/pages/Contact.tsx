import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MapPin, Instagram, Youtube, Video, Linkedin, Facebook } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../context/ContentContext';

const IconMap: Record<string, any> = {
  'Instagram': Instagram,
  'Youtube': Youtube,
  'Vimeo': Video,
  'Twitter': Video, // fallback
  'LinkedIn': Linkedin,
  'Facebook': Facebook
};

export default function Contact() {
  const { content } = useContent();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate submission
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const socialLinks = content.socialLinks.filter(l => l.isVisible);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Header & Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5"
          >
            <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-8">CONTACT</h1>
            <p className="text-gray-400 text-lg md:text-xl font-light mb-16 leading-relaxed">
              {content.contact.headline}
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-3">Direct Inquiry</h3>
                <a href={`mailto:${content.contact.email}`} className="flex items-center gap-3 text-white hover:text-cinema-red transition-colors text-xl">
                  <Mail className="w-5 h-5" /> {content.contact.email}
                </a>
              </div>
              
              <div>
                <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-3">Location</h3>
                <div className="flex items-center gap-3 text-white text-xl">
                  <MapPin className="w-5 h-5" /> Available Worldwide
                </div>
                <p className="text-gray-500 mt-2 ml-8 font-light whitespace-pre-line">{content.contact.location}</p>
              </div>
              
              <div className="pt-8 border-t border-gray-800">
                <h3 className="uppercase tracking-widest text-xs font-bold text-gray-500 mb-6">Social</h3>
                <div className="flex gap-6">
                  {socialLinks.map(link => {
                    const Icon = IconMap[link.platform];
                    if (!Icon) return null;
                    return (
                      <a key={link.id} href={link.url} className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-cinema-red transition-colors" aria-label={link.platform}>
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-24 flex flex-wrap gap-4">
              <Link to="/work" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-700"></span> View Work
              </Link>
              <Link to="/about" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-700"></span> About Us
              </Link>
              <Link to="/services" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-700"></span> Services
              </Link>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-cinema-black border border-gray-800 p-8 md:p-12 relative overflow-hidden">
              {status === 'success' ? (
                <div className="absolute inset-0 bg-cinema-black flex flex-col items-center justify-center text-center p-8 z-10">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-4">Inquiry Received</h3>
                  <p className="text-gray-400 mb-8 max-w-sm">
                    Thank you for reaching out. Our team will review your project details and get back to you within 24-48 hours.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="btn-primary px-8 py-3 uppercase tracking-widest text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest font-bold text-gray-500">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-transparent border-b border-gray-800 focus:border-cinema-red py-3 text-white outline-none transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest font-bold text-gray-500">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full bg-transparent border-b border-gray-800 focus:border-cinema-red py-3 text-white outline-none transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="block text-xs uppercase tracking-widest font-bold text-gray-500">Service Interest</label>
                  <select 
                    id="interest"
                    required
                    className="w-full bg-transparent border-b border-gray-800 focus:border-cinema-red py-3 text-white outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-cinema-black text-gray-500">Select an option</option>
                    <option value="commercial" className="bg-cinema-black">Commercial Production</option>
                    <option value="film" className="bg-cinema-black">Film / Documentary</option>
                    <option value="editing" className="bg-cinema-black">Video Editing</option>
                    <option value="content" className="bg-cinema-black">Content Production</option>
                    <option value="other" className="bg-cinema-black">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-xs uppercase tracking-widest font-bold text-gray-500">Estimated Budget</label>
                  <select 
                    id="budget"
                    className="w-full bg-transparent border-b border-gray-800 focus:border-cinema-red py-3 text-white outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-cinema-black text-gray-500">Select a range (Optional)</option>
                    <option value="5k" className="bg-cinema-black">Under $5k</option>
                    <option value="5k-15k" className="bg-cinema-black">$5k - $15k</option>
                    <option value="15k-50k" className="bg-cinema-black">$15k - $50k</option>
                    <option value="50k+" className="bg-cinema-black">$50k+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest font-bold text-gray-500">Project Details</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    required
                    className="w-full bg-transparent border-b border-gray-800 focus:border-cinema-red py-3 text-white outline-none transition-colors resize-none"
                    placeholder="Tell us about your story, timeline, and goals..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-primary w-full py-5 uppercase tracking-widest text-sm font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>

      </div>
    </div>
  );
}
