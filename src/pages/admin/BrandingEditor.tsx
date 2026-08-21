import { useBranding } from '../../context/BrandingContext';
import MediaSelector from '../../components/admin/MediaSelector';

export default function BrandingEditor() {
  const { branding, updateBranding } = useBranding();

  return (
    <div className="bg-cinema-black border border-gray-800 rounded-lg p-8 max-w-3xl">
      <section className="space-y-6">
        <h2 className="text-xl font-serif text-white mb-4 border-b border-gray-800 pb-2">Logo Assets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Primary Logo Image</label>
            <MediaSelector 
              type="image" 
              value={branding.primaryLogo || ''}
              onChange={val => updateBranding({ primaryLogo: val })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Light Logo (For dark backgrounds)</label>
            <MediaSelector 
              type="image" 
              value={branding.lightLogo || ''}
              onChange={val => updateBranding({ lightLogo: val })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Logo (Icon only)</label>
            <MediaSelector 
              type="image" 
              value={branding.mobileLogo || ''}
              onChange={val => updateBranding({ mobileLogo: val })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Favicon (16x16 / 32x32)</label>
            <MediaSelector 
              type="image" 
              value={branding.favicon || ''}
              onChange={val => updateBranding({ favicon: val })}
            />
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-serif text-white mb-4 border-b border-gray-800 pb-2">Sizing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Desktop Height (px)</label>
            <input 
              type="number" 
              value={branding.logoHeightDesktop || 32}
              onChange={e => updateBranding({ logoHeightDesktop: parseInt(e.target.value) })}
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Height (px)</label>
            <input 
              type="number" 
              value={branding.logoHeightMobile || 24}
              onChange={e => updateBranding({ logoHeightMobile: parseInt(e.target.value) })}
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
