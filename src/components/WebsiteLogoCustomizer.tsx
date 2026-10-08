import { useState } from 'react';
import { useBranding } from '../context/BrandingContext';
import { useContent } from '../context/ContentContext';
import { useDatabase } from '../context/DatabaseContext';
import LogoUploader from './admin/LogoUploader';
import { Brush, X, UploadCloud, Save, ExternalLink, Check, Lock, Smartphone, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WebsiteLogoCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { branding, updateBranding } = useBranding();
  const { content, updateNestedContent } = useContent();
  const { publish, isPublishing, saveDraft, hasUnsavedChanges } = useDatabase();
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const brandName = branding.logoMark || content.branding?.logoText || 'VXN';
  const logoMode = branding.logoMode || 'text';

  const handleBrandNameChange = (val: string) => {
    updateBranding({ logoMark: val });
    updateNestedContent('branding', 'logoText', val);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (adminPassword === correctPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  return (
    <>
      {/* Floating Action Button on live site */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-cinema-black/95 hover:bg-black text-white border border-gray-700/80 hover:border-cinema-red rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          title="Change Website Logo & Branding"
          aria-label="Open Website Logo Options"
        >
          <div className="w-6 h-6 rounded-full bg-cinema-red/20 group-hover:bg-cinema-red flex items-center justify-center transition-colors">
            <Brush className="w-3.5 h-3.5 text-cinema-red group-hover:text-white transition-colors" />
          </div>
          <span className="text-xs uppercase tracking-wider font-bold pr-1">
            Change Logo
          </span>
          {hasUnsavedChanges && (
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" title="Unsaved changes" />
          )}
        </button>
      </div>

      {/* Quick Logo Customizer Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-lg bg-cinema-black border-l border-gray-800 h-full flex flex-col shadow-2xl overflow-hidden animate-slide-left"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cinema-red/10 border border-cinema-red/30 flex items-center justify-center">
                  <Brush className="w-4 h-4 text-cinema-red" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white tracking-wider uppercase">
                    Website Logo Options
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Modify header logo, brand name, and sizing in real time
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {!isAuthenticated ? (
                /* Quick Authentication Prompt */
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-cinema-red/10 text-cinema-red mx-auto flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif text-white">Admin Authentication</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Enter the administrative password to modify and publish the website logo. (Default: <code className="text-gray-300">admin123</code>)
                    </p>
                  </div>
                  <form onSubmit={handleUnlock} className="space-y-3 max-w-xs mx-auto">
                    <input
                      type="password"
                      placeholder="Password..."
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cinema-red outline-none text-center"
                      autoFocus
                    />
                    {authError && (
                      <p className="text-cinema-red text-xs">Incorrect password.</p>
                    )}
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-cinema-red hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Unlock Logo Editor
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Logo Options */
                <>
                  {/* Mode Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                      Logo Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => updateBranding({ logoMode: 'image' })}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          logoMode === 'image'
                            ? 'border-cinema-red bg-cinema-red/10 text-white font-bold'
                            : 'border-gray-800 bg-gray-900 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="text-xs block">Image</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateBranding({ logoMode: 'text' })}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          logoMode === 'text'
                            ? 'border-cinema-red bg-cinema-red/10 text-white font-bold'
                            : 'border-gray-800 bg-gray-900 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="text-xs block">Text Only</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateBranding({ logoMode: 'mark' })}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          logoMode === 'mark'
                            ? 'border-cinema-red bg-cinema-red/10 text-white font-bold'
                            : 'border-gray-800 bg-gray-900 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="text-xs block">Mark + Text</span>
                      </button>
                    </div>
                  </div>

                  {/* Brand Name Input */}
                  <div className="space-y-2 bg-gray-950/60 border border-gray-800/80 rounded-lg p-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                      Brand Name / Text Logo
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => handleBrandNameChange(e.target.value)}
                      placeholder="e.g. VXN"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cinema-red outline-none font-medium"
                    />
                    <span className="text-[11px] text-gray-500 block">
                      Updates the header logo text, page titles, and copyright name.
                    </span>
                  </div>

                  {/* Primary Logo Image (Upload or URL) */}
                  {(logoMode === 'image' || logoMode === 'mark') && (
                    <div className="space-y-4">
                      <LogoUploader
                        label="Header Logo Image"
                        description="Upload your logo file (PNG, SVG, JPG, WebP) or paste an image link."
                        value={branding.primaryLogo}
                        onChange={(val) => updateBranding({ primaryLogo: val })}
                      />

                      <LogoUploader
                        label="Mobile Logo (Optional)"
                        description="Special compact logo for mobile screens (defaults to Header Logo)."
                        value={branding.mobileLogo}
                        onChange={(val) => updateBranding({ mobileLogo: val })}
                      />
                    </div>
                  )}

                  {/* Sizing Sliders */}
                  <div className="space-y-4 bg-gray-950/60 border border-gray-800/80 rounded-lg p-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                      Logo Dimensions
                    </label>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Monitor className="w-3.5 h-3.5" /> Desktop Width
                        </span>
                        <span className="font-mono text-cinema-red font-bold">{branding.logoWidth || 140}px</span>
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

                    <div className="space-y-2 pt-2 border-t border-gray-800/60">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5" /> Mobile Width
                        </span>
                        <span className="font-mono text-cinema-red font-bold">{branding.mobileLogoWidth || 80}px</span>
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
                  </div>

                  {/* Link to Full Admin Studio */}
                  <div className="pt-2">
                    <Link
                      to="/admin/branding"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cinema-red" />
                      <span>Open Full Admin Studio</span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer with Save and Publish */}
            {isAuthenticated && (
              <div className="p-4 border-t border-gray-800 bg-gray-950 flex items-center gap-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={!hasUnsavedChanges}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    hasUnsavedChanges 
                      ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-900 text-gray-500 border-gray-800 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="button"
                  onClick={publish}
                  disabled={isPublishing}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-cinema-red hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{isPublishing ? 'Publishing...' : 'Publish Live'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
