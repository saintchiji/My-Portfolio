import { useState, useRef } from 'react';
import { useMedia } from '../../context/MediaContext';
import { MediaAsset } from '../../types';
import { Upload, Trash2, Copy, Search, Film, Image as ImageIcon, Link as LinkIcon, CheckCircle, AlertCircle } from 'lucide-react';

export default function MediaLibrary() {
  const { media, addMedia, removeMedia, uploadDirectMedia } = useMedia();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'logo'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const filteredMedia = media.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || m.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const type = file.type.startsWith('video/') ? 'video' : (file.type.includes('svg') || file.name.toLowerCase().includes('logo') ? 'logo' : 'image');

    try {
      await uploadDirectMedia(file, type, (p) => setProgress(p));
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyRef = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    alert('Media URL copied to clipboard!');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Media Library</h1>
          <p className="text-gray-400 mt-2 text-sm">Manage centralized media assets, direct uploads, and Google Drive files.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
            className="hidden" 
            accept="image/*,video/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                {progress}%
              </span>
            ) : (
              <><Upload className="w-4 h-4" /> Upload Media</>
            )}
          </button>
        </div>
      </div>

      <div className="bg-cinema-black border border-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded pl-10 pr-4 py-2 text-white focus:border-cinema-red outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'image', 'video', 'logo'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  filter === f ? 'bg-cinema-red text-white' : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map(asset => (
            <div key={asset.id} className="group bg-gray-900 border border-gray-800 rounded overflow-hidden">
              <div className="aspect-video bg-cinema-dark relative flex items-center justify-center overflow-hidden">
                {asset.type === 'image' || asset.type === 'logo' ? (
                  <img src={asset.url.startsWith('idb://') ? '#' : asset.url} alt={asset.name} className="w-full h-full object-cover opacity-50" />
                ) : (
                  <Film className="w-12 h-12 text-gray-700" />
                )}
                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white uppercase tracking-widest backdrop-blur-sm">
                  {asset.source}
                </div>
              </div>
              <div className="p-4">
                <p className="text-white font-medium truncate mb-1" title={asset.name}>{asset.name}</p>
                <p className="text-xs text-gray-500 mb-4">{new Date(asset.dateUploaded).toLocaleDateString()}</p>
                
                <div className="flex items-center justify-between border-t border-gray-800 pt-3 mt-3">
                  <button 
                    onClick={() => copyRef(asset)}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Delete this media?')) removeMedia(asset.id);
                    }}
                    className="text-gray-400 hover:text-cinema-red transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredMedia.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No media found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
