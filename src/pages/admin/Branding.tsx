import { useState } from 'react';
import { useBranding } from '../../context/BrandingContext';
import { useContent } from '../../context/ContentContext';
import { useDatabase } from '../../context/DatabaseContext';
import LogoUploader from '../../components/admin/LogoUploader';
import MediaImage from '../../components/MediaImage';
import { Sparkles, Eye, UploadCloud, Smartphone, Monitor, Info } from 'lucide-react';

export default function Branding() {
  const { branding, updateBranding } = useBranding();
  const { content, updateNestedContent } = useContent();
  const { publish, isPublishing, hasUnsavedChanges, saveDraft } = useDatabase();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const brandName = branding.logoMark || content.branding?.logoText || 'VXN';

  const handleBrandNameChange = (val: string) => {
    updateBranding({ logoMark: val });
    updateNestedContent('branding', 'logoText', val);
  };

  const currentMode = branding.logoMode || 'text';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Logo & Branding</h1>
          <p className="text-sm text-gray-400 mt-1">
            Customize the header logo, mobile logo, footer branding, and typography for your website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={saveDraft}
            disabled={!hasUnsavedChanges}
            className={`px-4 py-2 border rounded text-xs font-bold uppercase tracking-wider transition-colors ${
              hasUnsavedChanges ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600' : 'bg-gray-900 text-gray-500 border-gray-800'
            }`}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={publish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-4 py-2 bg-cinema-red hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            {isPublishing ? 'Publishing...' : 'Publish To Live Site'}
          </button>
        </div>
      </div>

      {/* Live Header Logo Preview Banner */}
      <div className="bg-cinema-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-gray-900/80 px-6 py-3 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300">
            <Eye className="w-4 h-4 text-cinema-red" /> Live Header Preview
          </div>
          <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-md border border-gray-800 text-xs">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                previewDevice === 'desktop' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                previewDevice === 'mobile' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-black to-cinema-dark flex items-center justify-between border-b border-gray-800/40">
          <div className="flex items-center">
            {currentMode === 'image' && (
              previewDevice === 'desktop' ? (
                branding.primaryLogo ? (
                  <MediaImage
                    src={branding.primaryLogo}
                    alt={brandName}
                    style={{ width: `${branding.logoWidth || 140}px` }}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-yellow-500 text-xs border border-yellow-500/40 px-3 py-1.5 rounded bg-yellow-500/10">
                    Upload Primary Logo below to preview image
                  </span>
                )
              ) : (
                (branding.mobileLogo || branding.primaryLogo) ? (
                  <MediaImage
                    src={branding.mobileLogo || branding.primaryLogo}
                    alt={brandName}
                    style={{ width: `${branding.mobileLogoWidth || 80}px` }}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-yellow-500 text-xs border border-yellow-500/40 px-3 py-1.5 rounded bg-yellow-500/10">
                    Upload Mobile or Primary Logo
                  </span>
                )
              )
            )}

            {currentMode === 'text' && (
              <span className="font-serif text-2xl tracking-widest text-white">
                {brandName.length > 2 ? (
                  <>{brandName.slice(0, 1)}<span className="text-cinema-red">{brandName.slice(1, 2)}</span>{brandName.slice(2)}</>
                ) : (
                  brandName
                )}
              </span>
            )}

            {currentMode === 'mark' && (
              <div className="flex items-center gap-3">
                {(branding.mobileLogo || branding.primaryLogo) && (
                  <MediaImage
                    src={branding.mobileLogo || branding.primaryLogo}
                    alt="Logo Mark"
                    style={{ width: `${Math.min(branding.logoWidth || 40, 48)}px` }}
                    className="object-contain h-8"
                  />
                )}
                <span className="font-serif text-2xl tracking-widest text-white">
                  {brandName}
                </span>
              </div>
            )}

            {currentMode === 'none' && (
              <span className="text-gray-500 text-xs italic">[Logo Hidden]</span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest text-gray-400 font-medium">
            <span>Work</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>
      </div>

      <div className="bg-cinema-black border border-gray-800 rounded-xl p-8 max-w-5xl space-y-10">
        
        {/* Section 1: Logo Presentation Mode */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-3">
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Logo Display Mode</h2>
            <p className="text-xs text-gray-400 mt-1">Select whether your website displays an uploaded image logo, stylized typography, or a combination.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => updateBranding({ logoMode: 'image' })}
              className={`p-4 rounded-lg border text-left transition-all ${
                currentMode === 'image'
                  ? 'border-cinema-red bg-cinema-red/10 text-white ring-1 ring-cinema-red'
                  : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <div className="font-bold text-sm text-white mb-1">Image Logo</div>
              <p className="text-xs text-gray-400">Display your company logo graphic or SVG mark.</p>
            </button>

            <button
              type="button"
              onClick={() => updateBranding({ logoMode: 'text' })}
              className={`p-4 rounded-lg border text-left transition-all ${
                currentMode === 'text'
                  ? 'border-cinema-red bg-cinema-red/10 text-white ring-1 ring-cinema-red'
                  : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <div className="font-bold text-sm text-white mb-1">Text Only Logo</div>
              <p className="text-xs text-gray-400">Use stylized serif brand typography with red accent.</p>
            </button>

            <button
              type="button"
              onClick={() => updateBranding({ logoMode: 'mark' })}
              className={`p-4 rounded-lg border text-left transition-all ${
                currentMode === 'mark'
                  ? 'border-cinema-red bg-cinema-red/10 text-white ring-1 ring-cinema-red'
                  : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <div className="font-bold text-sm text-white mb-1">Logo Mark + Text</div>
              <p className="text-xs text-gray-400">Combine an icon image mark with your brand name.</p>
            </button>
          </div>
        </section>

        {/* Section 2: Brand Name / Text Logo */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-3">
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Brand Name & Identity</h2>
            <p className="text-xs text-gray-400 mt-1">This text is used for your text logo, browser title tab, footer copyright, and SEO metadata.</p>
          </div>

          <div className="max-w-md space-y-2">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
              Website Brand Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => handleBrandNameChange(e.target.value)}
              placeholder="e.g. VXN or ACME STUDIOS"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cinema-red outline-none text-base font-medium"
            />
            <p className="text-[11px] text-gray-500">
              For 3-letter names like "VXN", the middle letter is automatically stylized with the cinema accent color.
            </p>
          </div>
        </section>

        {/* Section 3: Logo Assets (Upload / URL) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-3 flex justify-between items-end">
            <div>
              <h2 className="text-lg font-serif text-white tracking-wider uppercase">Logo Assets & Files</h2>
              <p className="text-xs text-gray-400 mt-1">
                Upload image files (PNG, SVG, JPG, WebP) or provide direct URLs. Transparent PNG or SVG formats recommended.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LogoUploader
              label="Primary Logo (Header Desktop)"
              description="Main logo for the website header on desktop and tablet screens."
              value={branding.primaryLogo}
              onChange={(val) => updateBranding({ primaryLogo: val })}
            />

            <LogoUploader
              label="Mobile Logo (Header Mobile)"
              description="Compact logo or mark for phones. Falls back to Primary Logo if empty."
              value={branding.mobileLogo}
              onChange={(val) => updateBranding({ mobileLogo: val })}
            />

            <LogoUploader
              label="Footer Logo"
              description="Displayed in the bottom website footer copyright bar."
              value={branding.footerLogo}
              onChange={(val) => updateBranding({ footerLogo: val })}
            />

            <LogoUploader
              label="Browser Favicon"
              description="Small icon for browser tabs and mobile bookmarks (32x32 px)."
              value={branding.favicon}
              onChange={(val) => updateBranding({ favicon: val })}
            />
          </div>
        </section>

        {/* Section 4: Logo Dimensions & Sizing */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-3">
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Logo Dimensions</h2>
            <p className="text-xs text-gray-400 mt-1">Fine-tune the display size of your logo across different screen resolutions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-5 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Desktop Width</label>
                <span className="text-xs font-mono text-cinema-red font-bold">{branding.logoWidth || 140}px</span>
              </div>
              <input
                type="range"
                min={40}
                max={320}
                step={5}
                value={branding.logoWidth || 140}
                onChange={(e) => updateBranding({ logoWidth: parseInt(e.target.value) })}
                className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded appearance-none cursor-pointer"
              />
            </div>

            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-5 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Mobile Width</label>
                <span className="text-xs font-mono text-cinema-red font-bold">{branding.mobileLogoWidth || 80}px</span>
              </div>
              <input
                type="range"
                min={30}
                max={200}
                step={5}
                value={branding.mobileLogoWidth || 80}
                onChange={(e) => updateBranding({ mobileLogoWidth: parseInt(e.target.value) })}
                className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded appearance-none cursor-pointer"
              />
            </div>

            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-5 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Footer Width</label>
                <span className="text-xs font-mono text-cinema-red font-bold">{branding.footerLogoWidth || 100}px</span>
              </div>
              <input
                type="range"
                min={30}
                max={220}
                step={5}
                value={branding.footerLogoWidth || 100}
                onChange={(e) => updateBranding({ footerLogoWidth: parseInt(e.target.value) })}
                className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded appearance-none cursor-pointer"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
