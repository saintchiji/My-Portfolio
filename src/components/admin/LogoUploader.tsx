import { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import { X, Upload, Link as LinkIcon, Check, Image as ImageIcon } from 'lucide-react';
import MediaImage from '../MediaImage';

interface LogoUploaderProps {
  label: string;
  value: string | undefined;
  onChange: (url: string) => void;
  description?: string;
}

export default function LogoUploader({ label, value, onChange, description }: LogoUploaderProps) {
  const { uploadDirectMedia } = useMedia();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      const asset = await uploadDirectMedia(file, 'logo', setProgress);
      onChange(asset.url);
    } catch (e) {
      alert('Upload failed. Please try a different image file.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput('');
  };

  const hasLogo = Boolean(value && value.trim() !== '');

  return (
    <div className="space-y-3 bg-gray-950/60 border border-gray-800/80 rounded-lg p-5">
      <div className="flex justify-between items-start">
        <div>
          <label className="text-xs font-bold text-gray-200 uppercase tracking-wider block">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-1 bg-gray-900 p-0.5 rounded border border-gray-800 text-[11px]">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              inputMode === 'upload' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              inputMode === 'url' ? 'bg-cinema-red text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            URL
          </button>
        </div>
      </div>

      {/* Logo Preview Area */}
      {hasLogo ? (
        <div className="relative group bg-radial-pattern bg-gray-900 border border-gray-800 rounded-lg p-6 flex justify-center items-center overflow-hidden min-h-[90px]">
          <div className="max-h-24 max-w-full flex items-center justify-center">
            <MediaImage 
              src={value} 
              alt={label} 
              className="max-h-20 max-w-full object-contain" 
            />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-black/80 hover:bg-red-950 hover:text-red-400 text-gray-400 border border-gray-800 rounded-md transition-colors"
            title="Remove logo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="border border-dashed border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-900/30">
          <ImageIcon className="w-8 h-8 text-gray-600 mb-2" />
          <span className="text-xs text-gray-500">No logo uploaded yet</span>
        </div>
      )}

      {/* Action Controls */}
      {inputMode === 'upload' ? (
        <div className="flex flex-wrap gap-2 pt-1">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-white rounded text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer disabled:opacity-50">
            {uploading ? (
              <>
                <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" /> 
                <span>Uploading {progress}%</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-cinema-red" /> 
                <span>{hasLogo ? 'Replace File' : 'Choose Logo File'}</span>
              </>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept=".png,.svg,.jpg,.jpeg,.webp" 
              onChange={handleFile} 
              disabled={uploading} 
            />
          </label>

          {hasLogo && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-900/80 hover:bg-red-950/40 hover:text-red-400 text-gray-400 border border-gray-800 rounded text-xs uppercase tracking-wider font-bold transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2 pt-1">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://example.com/logo.png"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyUrl();
                }
              }}
              className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              disabled={!urlInput.trim()}
              className="px-3 py-2 bg-cinema-red hover:bg-red-700 disabled:opacity-40 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Apply
            </button>
          </div>
          {hasLogo && (
            <div className="flex justify-between items-center text-[11px] text-gray-400 font-mono truncate bg-gray-900/60 px-2.5 py-1.5 rounded border border-gray-800">
              <span className="truncate flex-1">{value}</span>
              <button 
                type="button" 
                onClick={() => onChange('')}
                className="text-gray-500 hover:text-red-400 ml-2"
                title="Clear logo URL"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
