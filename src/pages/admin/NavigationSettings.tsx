import { useContent } from '../../context/ContentContext';
import { useBranding } from '../../context/BrandingContext';
import { Link } from 'react-router-dom';
import { Brush, ArrowRight } from 'lucide-react';
import MediaImage from '../../components/MediaImage';

export default function NavigationSettings() {
  const { content, updateContent, updateNestedContent } = useContent();
  const { branding } = useBranding();

  const brandName = branding.logoMark || content.branding?.logoText || 'VXN';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Navigation</h1>
          <p className="text-sm text-gray-400 mt-1">Configure header links, navigation visibility, and footer information.</p>
        </div>
      </div>
      
      <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-8 max-w-3xl">
        
        {/* Header Logo Banner */}
        <div className="bg-gray-950 border border-gray-800/80 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center p-2">
              {branding.logoMode === 'image' && branding.primaryLogo ? (
                <MediaImage src={branding.primaryLogo} alt="Logo" className="max-h-full object-contain" />
              ) : (
                <span className="font-serif text-sm font-bold text-white">{brandName}</span>
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Header Logo & Branding</h4>
              <p className="text-xs text-gray-400">
                Mode: <span className="text-cinema-red font-medium uppercase">{branding.logoMode || 'text'}</span> • Brand: {brandName}
              </p>
            </div>
          </div>

          <Link
            to="/admin/branding"
            className="flex items-center gap-2 px-4 py-2 bg-cinema-red/10 hover:bg-cinema-red text-cinema-red hover:text-white border border-cinema-red/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Brush className="w-3.5 h-3.5" />
            <span>Customize Logo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div>
          <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Main Navigation Menu</h3>
          <p className="text-sm text-gray-500 mb-6">Control which navigation links appear in the website header.</p>
          
          <div className="space-y-3">
            {content.navigation.map((link, idx) => (
              <label key={link.id} className="flex items-center gap-3 p-4 border border-gray-800 rounded bg-gray-900/50 cursor-pointer hover:bg-gray-800 transition-colors">
                <input 
                  type="checkbox"
                  checked={link.isVisible}
                  onChange={(e) => {
                    const newNav = [...content.navigation];
                    newNav[idx] = { ...newNav[idx], isVisible: e.target.checked };
                    updateContent({ navigation: newNav });
                  }}
                  className="accent-cinema-red w-4 h-4"
                />
                <span className="text-sm text-white font-medium">{link.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Footer Text</h3>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Footer Description</label>
            <textarea 
              rows={3}
              value={content.footer.text}
              onChange={e => updateNestedContent('footer', 'text', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
