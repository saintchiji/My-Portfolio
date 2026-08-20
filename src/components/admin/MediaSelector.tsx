import { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import { Image as ImageIcon, Film, X, Upload } from 'lucide-react';
import { MediaAsset } from '../../types';

interface MediaSelectorProps {
  type: 'image' | 'video' | 'any';
  value: string; // the URL
  onChange: (url: string, asset?: MediaAsset) => void;
}

export default function MediaSelector({ type, value, onChange }: MediaSelectorProps) {
  const { media, uploadDirectMedia } = useMedia();
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const filteredMedia = media.filter(m => type === 'any' ? true : m.type === type || (type === 'image' && m.type === 'logo'));

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    try {
      const asset = await uploadDirectMedia(file, mediaType, setProgress);
      onChange(asset.url, asset);
      setIsOpen(false);
    } catch (e) {
      alert('Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <input 
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://... or click Browse"
          className="flex-1 bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
        />
        <button 
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm uppercase tracking-wider font-bold transition-colors"
        >
          Browse Media
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-cinema-dark border border-gray-800 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-serif text-white uppercase tracking-widest">Select Media</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="mb-6 flex gap-4">
                <label className="btn-primary cursor-pointer flex items-center gap-2">
                  {uploading ? (
                    <><span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> {progress}%</>
                  ) : (
                    <><Upload className="w-4 h-4" /> Upload New File</>
                  )}
                  <input type="file" className="hidden" accept={type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : 'image/*,video/*'} onChange={handleFile} disabled={uploading} />
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredMedia.map(asset => (
                  <div 
                    key={asset.id} 
                    onClick={() => { onChange(asset.url, asset); setIsOpen(false); }}
                    className="cursor-pointer group bg-gray-900 border border-gray-800 hover:border-cinema-red rounded overflow-hidden transition-colors"
                  >
                    <div className="aspect-video bg-cinema-black relative flex items-center justify-center">
                      {(asset.type === 'image' || asset.type === 'logo') ? (
                        <img src={asset.url.startsWith('idb://') ? '#' : asset.url} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <Film className="w-8 h-8 text-gray-700 group-hover:text-cinema-red transition-colors" />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-white truncate" title={asset.name}>{asset.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              {filteredMedia.length === 0 && <p className="text-gray-500 text-center py-8">No media found in library.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
