import { useState } from 'react';
import { useBranding } from '../../context/BrandingContext';
import { useContent } from '../../context/ContentContext';
import { useDatabase } from '../../context/DatabaseContext';
import LogoUploader from '../../components/admin/LogoUploader';
import MediaImage from '../../components/MediaImage';
import {
  Sparkles,
  Eye,
  UploadCloud,
  Smartphone,
  Monitor,
  RotateCcw,
  Sun,
  Moon,
  Palette,
  Check,
  Save,
  AlertCircle
} from 'lucide-react';

export default function Branding() {
  const { branding, updateBranding } = useBranding();
  const { content, updateNestedContent } = useContent();
  const { publish, isPublishing, hasUnsavedChanges, saveDraft, restorePublished, publishedConfig } = useDatabase();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [notification, setNotification] = useState<string | null>(null);

  const brandName = branding.logoMark || content.branding?.logoText || 'VXN';

  const handleBrandNameChange = (val: string) => {
    updateBranding({ logoMark: val });
    updateNestedContent('branding', 'logoText', val);
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset branding to default studio configuration?')) {
      updateBranding({
        primaryLogo: '',
        darkLogo: '',
        lightLogo: '',
        mobileLogo: '',
        footerLogo: '',
        favicon: '',
        logoMode: 'text',
        logoWidth: 140,
        mobileLogoWidth: 80,
        footerLogoWidth: 100
      });
      handleBrandNameChange('VXN');
      setNotification('Branding reset to defaults.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRevert = async () => {
    if (confirm('Revert all unsaved branding changes to the published version?')) {
      await restorePublished();
      setNotification('Reverted to published branding.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const currentMode = branding.logoMode || 'text';

  // Determine which logo to preview based on theme and device
  const getActivePreviewLogo = () => {
    if (previewTheme === 'light' && branding.lightLogo) {
      return branding.lightLogo;
    }
    if (previewDevice === 'mobile') {
      return branding.mobileLogo || branding.primaryLogo;
    }
    return branding.darkLogo || branding.primaryLogo;
  };

  const activePreviewLogo = getActivePreviewLogo();

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Website Branding</h1>
          <p className="text-sm text-gray-400 mt-1">
            Centralized source of truth for the website logo, favicon, dark/light variants, brand typography, and accent colors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {publishedConfig && (
            <button
              type="button"
              onClick={handleRevert}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 rounded text-xs font-bold uppercase tracking-wider transition-colors"
              title="Revert draft changes to published"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Revert
            </button>
          )}

          <button
            type="button"
            onClick={async () => {
              await saveDraft();
              setNotification('Draft saved successfully.');
              setTimeout(() => setNotification(null), 3000);
            }}
            disabled={!hasUnsavedChanges}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded text-xs font-bold uppercase tracking-wider transition-colors ${
              hasUnsavedChanges
                ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600'
                : 'bg-gray-900 text-gray-500 border-gray-800'
            }`}
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>

          <button
            type="button"
            onClick={async () => {
              await publish();
              setNotification('Branding published live to public site and user dashboard!');
              setTimeout(() => setNotification(null), 4000);
            }}
            disabled={isPublishing}
            className="flex items-center gap-2 px-4 py-2 bg-cinema-red hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            {isPublishing ? 'Publishing...' : 'Publish To Live'}
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-green-950/60 border border-green-800 rounded-lg text-green-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Live Header Logo Preview Banner */}
      <div className="bg-cinema-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-gray-900/90 px-6 py-3 border-b border-gray-800 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300">
            <Eye className="w-4 h-4 text-cinema-red" /> Live Header & Brand Synchronization Preview
          </div>

          <div className="flex items-center gap-2">
            {/* Dark / Light Preview Switcher */}
            <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-md border border-gray-800 text-xs">
              <button
                type="button"
                onClick={() => setPreviewTheme('dark')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                  previewTheme === 'dark' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Dark theme background preview"
              >
                <Moon className="w-3 h-3 text-cinema-red" /> Dark
              </button>
              <button
                type="button"
                onClick={() => setPreviewTheme('light')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                  previewTheme === 'light' ? 'bg-gray-200 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
                title="Light background preview"
              >
                <Sun className="w-3 h-3 text-amber-500" /> Light
              </button>
            </div>

            {/* Device Switcher */}
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
        </div>

        {/* Live Preview Canvas */}
        <div
          className={`p-8 transition-colors duration-300 flex items-center justify-between border-b border-gray-800/40 ${
            previewTheme === 'light'
              ? 'bg-gray-100 text-black'
              : 'bg-gradient-to-b from-black to-cinema-dark text-white'
          }`}
        >
          <div className="flex items-center">
            {currentMode === 'image' && (
              activePreviewLogo ? (
                <MediaImage
                  src={activePreviewLogo}
                  alt={brandName}
                  style={{
                    width: `${
                      previewDevice === 'desktop'
                        ? branding.logoWidth || 140
                        : branding.mobileLogoWidth || 80
                    }px`
                  }}
                  className="object-contain max-h-12"
                />
              ) : (
                <span className="text-yellow-500 text-xs border border-yellow-500/40 px-3 py-1.5 rounded bg-yellow-500/10">
                  Upload logo below to preview
                </span>
              )
            )}

            {currentMode === 'text' && (
              <span className={`font-serif text-2xl tracking-widest ${previewTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {brandName.length > 2 ? (
                  <>{brandName.slice(0, 1)}<span className="text-cinema-red">{brandName.slice(1, 2)}</span>{brandName.slice(2)}</>
                ) : (
                  brandName
                )}
              </span>
            )}

            {currentMode === 'mark' && (
              <div className="flex items-center gap-3">
                {activePreviewLogo && (
                  <MediaImage
                    src={activePreviewLogo}
                    alt="Logo Mark"
                    style={{ width: `${Math.min(branding.logoWidth || 40, 44)}px` }}
                    className="object-contain h-8"
                  />
                )}
                <span className={`font-serif text-2xl tracking-widest ${previewTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {brandName}
                </span>
              </div>
            )}

            {currentMode === 'none' && (
              <span className="text-gray-500 text-xs italic">[Logo Hidden]</span>
            )}
          </div>

          <div className={`hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest font-medium ${
            previewTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <span>Work</span>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>
      </div>

      <div className="bg-cinema-black border border-gray-800 rounded-xl p-6 md:p-8 space-y-10">
        {/* Section 1: Logo Presentation Mode */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-serif text-white tracking-wider uppercase">Logo Display Mode</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Choose how your brand is rendered across headers, navigation bars, and footers.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="text-xs text-gray-400 hover:text-red-400 uppercase tracking-wider font-bold"
            >
              Reset to Defaults
            </button>
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
              <div className="font-bold text-sm text-white mb-1">Graphic Logo (Image/SVG)</div>
              <p className="text-xs text-gray-400">Display your high-res vector SVG or PNG brandmark.</p>
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
              <div className="font-bold text-sm text-white mb-1">Stylized Typography (Text)</div>
              <p className="text-xs text-gray-400">Editorial serif brand typography with red accent.</p>
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
              <div className="font-bold text-sm text-white mb-1">Icon Mark + Text Name</div>
              <p className="text-xs text-gray-400">Combines an icon graphic with the brand name.</p>
            </button>
          </div>
        </section>

        {/* Section 2: Brand Name / Typography */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-3">
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Brand Identity & Name</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Used across the public header, user dashboard, footer copyright, and browser window title.
            </p>
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
              For 3-letter studio names like "VXN", the middle letter is dynamically stylized with cinema red.
            </p>
          </div>
        </section>

        {/* Section 3: Centralized Logo Assets */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-3">
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Logo Assets & Files</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Supports PNG, SVG, JPG, and WebP formats. Files are validated and SVG contents are sanitized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LogoUploader
              label="Primary Logo (Desktop Header)"
              description="Main brand logo displayed on the public website header and user dashboard."
              value={branding.primaryLogo}
              onChange={(val) => updateBranding({ primaryLogo: val })}
            />

            <LogoUploader
              label="Mobile Logo (Smartphone Header)"
              description="Compact mark or emblem optimized for small touch screens."
              value={branding.mobileLogo}
              onChange={(val) => updateBranding({ mobileLogo: val })}
            />

            <LogoUploader
              label="Light Mode Logo Variant (Optional)"
              description="Inverted dark logo used on light backgrounds or client proposal exports."
              value={branding.lightLogo}
              onChange={(val) => updateBranding({ lightLogo: val })}
            />

            <LogoUploader
              label="Dark Mode Logo Variant (Optional)"
              description="High-contrast bright logo for deep black cinema viewports."
              value={branding.darkLogo}
              onChange={(val) => updateBranding({ darkLogo: val })}
            />

            <LogoUploader
              label="Footer Logo"
              description="Subtle logo displayed in the website bottom footer and copyright row."
              value={branding.footerLogo}
              onChange={(val) => updateBranding({ footerLogo: val })}
            />

            <LogoUploader
              label="Browser Favicon (.ico, .png, .svg)"
              description="Icon displayed in browser tabs and mobile home-screen bookmarks. Automatically syncs to <link rel='icon'>."
              value={branding.favicon}
              onChange={(val) => updateBranding({ favicon: val })}
            />
          </div>
        </section>

        {/* Section 4: Dimensions & Display Settings */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-3">
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Logo Dimensions & Sizing</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Adjust the exact rendered pixel width for desktop, mobile header, and footer logos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-5 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Desktop Header Width</label>
                <span className="text-xs font-mono text-cinema-red font-bold">{branding.logoWidth || 140}px</span>
              </div>
              <input
                type="range"
                min={40}
                max={300}
                step={5}
                value={branding.logoWidth || 140}
                onChange={(e) => updateBranding({ logoWidth: parseInt(e.target.value) })}
                className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded appearance-none cursor-pointer"
              />
            </div>

            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-5 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Mobile Header Width</label>
                <span className="text-xs font-mono text-cinema-red font-bold">{branding.mobileLogoWidth || 80}px</span>
              </div>
              <input
                type="range"
                min={30}
                max={180}
                step={5}
                value={branding.mobileLogoWidth || 80}
                onChange={(e) => updateBranding({ mobileLogoWidth: parseInt(e.target.value) })}
                className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded appearance-none cursor-pointer"
              />
            </div>

            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-5 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Footer Logo Width</label>
                <span className="text-xs font-mono text-cinema-red font-bold">{branding.footerLogoWidth || 100}px</span>
              </div>
              <input
                type="range"
                min={30}
                max={200}
                step={5}
                value={branding.footerLogoWidth || 100}
                onChange={(e) => updateBranding({ footerLogoWidth: parseInt(e.target.value) })}
                className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded appearance-none cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Section 5: Brand Colors */}
        <section className="space-y-4">
          <div className="border-b border-gray-800 pb-3">
            <h2 className="text-lg font-serif text-white tracking-wider uppercase">Brand Accent Colors</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Customize the cinematic red accent colors applied to buttons, active navigation, and highlights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Primary Accent</label>
                <span className="text-[11px] text-gray-500 font-mono">{branding.brandAccentColor || '#8a0303'}</span>
              </div>
              <input
                type="color"
                value={branding.brandAccentColor || '#8a0303'}
                onChange={(e) => updateBranding({ brandAccentColor: e.target.value })}
                className="w-10 h-10 rounded border border-gray-700 bg-transparent cursor-pointer"
              />
            </div>

            <div className="bg-gray-950/60 border border-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">Accent Highlight</label>
                <span className="text-[11px] text-gray-500 font-mono">{branding.brandAccentLight || '#c20606'}</span>
              </div>
              <input
                type="color"
                value={branding.brandAccentLight || '#c20606'}
                onChange={(e) => updateBranding({ brandAccentLight: e.target.value })}
                className="w-10 h-10 rounded border border-gray-700 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
