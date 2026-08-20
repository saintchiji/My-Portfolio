import { useBranding } from '../../context/BrandingContext';

export default function BrandingEditor() {
  const { branding, updateBranding } = useBranding();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Branding & Logos</h1>
        <p className="text-gray-400 mt-2 text-sm">Configure site-wide logos, icons, and sizing.</p>
      </div>

      <div className="bg-cinema-black border border-gray-800 rounded-lg p-6 space-y-8">
        
        <section>
          <h2 className="text-xl font-serif text-white mb-4 border-b border-gray-800 pb-2">Logo Display Mode</h2>
          <div className="flex gap-4">
            {(['image', 'text', 'mark', 'none'] as const).map(mode => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="logoMode" 
                  checked={branding.logoMode === mode}
                  onChange={() => updateBranding({ logoMode: mode })}
                  className="accent-cinema-red"
                />
                <span className="text-sm text-gray-300 uppercase tracking-wider">{mode}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-serif text-white mb-4 border-b border-gray-800 pb-2">Logo Assets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Primary Logo URL</label>
              <input 
                type="text" 
                value={branding.primaryLogo || ''}
                onChange={e => updateBranding({ primaryLogo: e.target.value })}
                placeholder="Paste URL from Media Library"
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Light Logo (For dark backgrounds)</label>
              <input 
                type="text" 
                value={branding.lightLogo || ''}
                onChange={e => updateBranding({ lightLogo: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Logo (Icon only)</label>
              <input 
                type="text" 
                value={branding.mobileLogo || ''}
                onChange={e => updateBranding({ mobileLogo: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Favicon</label>
              <input 
                type="text" 
                value={branding.favicon || ''}
                onChange={e => updateBranding({ favicon: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-serif text-white mb-4 border-b border-gray-800 pb-2">Sizing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between">
                <span>Desktop Width</span>
                <span>{branding.logoWidth}px</span>
              </label>
              <input 
                type="range" 
                min="50" max="400" 
                value={branding.logoWidth}
                onChange={e => updateBranding({ logoWidth: Number(e.target.value) })}
                className="w-full accent-cinema-red"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between">
                <span>Mobile Width</span>
                <span>{branding.mobileLogoWidth}px</span>
              </label>
              <input 
                type="range" 
                min="30" max="250" 
                value={branding.mobileLogoWidth}
                onChange={e => updateBranding({ mobileLogoWidth: Number(e.target.value) })}
                className="w-full accent-cinema-red"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between">
                <span>Footer Width</span>
                <span>{branding.footerLogoWidth}px</span>
              </label>
              <input 
                type="range" 
                min="50" max="400" 
                value={branding.footerLogoWidth}
                onChange={e => updateBranding({ footerLogoWidth: Number(e.target.value) })}
                className="w-full accent-cinema-red"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
