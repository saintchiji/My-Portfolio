import { useTheme, defaultTheme } from '../../context/ThemeContext';
import { RefreshCcw } from 'lucide-react';
import { ThemeConfig } from '../../types';

export default function ThemeEditor() {
  const { theme, updateTheme, resetTheme } = useTheme();

  const handleChange = (field: keyof ThemeConfig, value: string | number) => {
    updateTheme({ [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-white">Visual Theme Editor</h1>
        <button
          onClick={() => {
            if (window.confirm('Reset all theme settings to the default Cinematic Dark theme?')) {
              resetTheme();
            }
          }}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-600 rounded transition-colors flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" /> Reset to Default
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Colors */}
        <section className="bg-cinema-black border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl text-white font-medium mb-6 pb-4 border-b border-gray-800">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <ColorField 
              label="Background Color" 
              value={theme.bgColor} 
              onChange={(v) => handleChange('bgColor', v)} 
            />
            <ColorField 
              label="Surface Color" 
              value={theme.surfaceColor} 
              onChange={(v) => handleChange('surfaceColor', v)} 
            />
            <ColorField 
              label="Accent Color" 
              value={theme.accentColor} 
              onChange={(v) => handleChange('accentColor', v)} 
            />
            <ColorField 
              label="Accent Light" 
              value={theme.accentLightColor} 
              onChange={(v) => handleChange('accentLightColor', v)} 
            />
            <ColorField 
              label="Primary Text" 
              value={theme.textColor} 
              onChange={(v) => handleChange('textColor', v)} 
            />
            <ColorField 
              label="Muted Text" 
              value={theme.textMutedColor} 
              onChange={(v) => handleChange('textMutedColor', v)} 
            />
            <ColorField 
              label="Border Color" 
              value={theme.borderColor} 
              onChange={(v) => handleChange('borderColor', v)} 
            />
            
          </div>
        </section>

        {/* UI Elements */}
        <section className="bg-cinema-black border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl text-white font-medium mb-6 pb-4 border-b border-gray-800">UI Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Button Style</label>
              <select 
                value={theme.buttonStyle} 
                onChange={(e) => handleChange('buttonStyle', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              >
                <option value="solid">Solid Fill</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost (No Border)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Border Radius Base</label>
              <select 
                value={theme.borderRadius} 
                onChange={(e) => handleChange('borderRadius', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              >
                <option value="0px">Sharp (0px)</option>
                <option value="0.125rem">Small (2px)</option>
                <option value="0.25rem">Medium (4px)</option>
                <option value="0.5rem">Large (8px)</option>
                <option value="1rem">Extra Large (16px)</option>
                <option value="9999px">Pill / Circular</option>
              </select>
            </div>

          </div>
        </section>

        {/* Typography */}
        <section className="bg-cinema-black border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl text-white font-medium mb-6 pb-4 border-b border-gray-800">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Heading Font (Serif/Display)</label>
              <select 
                value={theme.headingFont} 
                onChange={(e) => handleChange('headingFont', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              >
                <option value="'Playfair Display', serif">Playfair Display (Serif)</option>
                <option value="'Cinzel', serif">Cinzel (Display Serif)</option>
                <option value="'Cormorant Garamond', serif">Cormorant Garamond (Serif)</option>
                <option value="'Fraunces', serif">Fraunces (Vintage Serif)</option>
                <option value="'Oswald', sans-serif">Oswald (Tall Sans)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Body Font (Sans)</label>
              <select 
                value={theme.bodyFont} 
                onChange={(e) => handleChange('bodyFont', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
              >
                <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Modern)</option>
                <option value="'Montserrat', sans-serif">Montserrat (Geometric)</option>
                <option value="'Inter', sans-serif">Inter (Clean UI)</option>
                <option value="'Space Grotesk', sans-serif">Space Grotesk (Tech)</option>
              </select>
            </div>

          </div>
        </section>

        {/* Scales & Intensities */}
        <section className="bg-cinema-black border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl text-white font-medium mb-6 pb-4 border-b border-gray-800">Scales & Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <SliderField
              label="Section Spacing Scale"
              value={theme.sectionSpacing}
              min={0.5} max={2.0} step={0.1}
              onChange={(v) => handleChange('sectionSpacing', v)}
              format={(v) => `${v.toFixed(1)}x`}
            />

            <SliderField
              label="Typography Base Scale"
              value={theme.typographyScale}
              min={0.8} max={1.5} step={0.05}
              onChange={(v) => handleChange('typographyScale', v)}
              format={(v) => `${v.toFixed(2)}x`}
            />

            <SliderField
              label="Grain Intensity"
              value={theme.grainIntensity}
              min={0} max={0.3} step={0.01}
              onChange={(v) => handleChange('grainIntensity', v)}
              format={(v) => `${(v * 100).toFixed(0)}%`}
            />

            <SliderField
              label="Image Overlay Intensity"
              value={theme.overlayIntensity}
              min={0} max={1} step={0.05}
              onChange={(v) => handleChange('overlayIntensity', v)}
              format={(v) => `${(v * 100).toFixed(0)}%`}
            />

          </div>
        </section>

      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded overflow-hidden border border-gray-700 shrink-0">
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="absolute -inset-2 w-14 h-14 cursor-pointer" 
          />
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-cinema-red outline-none uppercase"
        />
      </div>
    </div>
  );
}

function SliderField({ label, value, min, max, step, onChange, format }: { label: string, value: number, min: number, max: number, step: number, onChange: (val: number) => void, format: (val: number) => string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
        <span className="text-xs text-cinema-red-light font-mono">{format(value)}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-cinema-red h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
