import { useContent } from '../../context/ContentContext';
import { Plus, X, GripVertical } from 'lucide-react';
import { useState } from 'react';

export default function SocialMedia() {
  const { content, updateContent } = useContent();

  const handleUpdate = (id: string, field: string, value: any) => {
    const updatedLinks = content.socialLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    updateContent({ socialLinks: updatedLinks });
  };

  const handleRemove = (id: string) => {
    updateContent({ socialLinks: content.socialLinks.filter(l => l.id !== id) });
  };

  const handleAdd = () => {
    const newId = `soc-${Date.now()}`;
    updateContent({ 
      socialLinks: [
        ...content.socialLinks, 
        { id: newId, platform: 'Instagram', url: 'https://', isVisible: true }
      ] 
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...content.socialLinks];
    const temp = items[index - 1];
    items[index - 1] = items[index];
    items[index] = temp;
    updateContent({ socialLinks: items });
  };

  const moveDown = (index: number) => {
    if (index === content.socialLinks.length - 1) return;
    const items = [...content.socialLinks];
    const temp = items[index + 1];
    items[index + 1] = items[index];
    items[index] = temp;
    updateContent({ socialLinks: items });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif text-white tracking-widest uppercase mb-8">Social Media</h1>
      
      <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg max-w-4xl">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
          <h2 className="text-xl font-serif text-white">Social Platforms</h2>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded text-sm uppercase tracking-wider font-bold transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Platform
          </button>
        </div>
        
        <div className="space-y-4">
          {content.socialLinks.map((link, idx) => (
            <div key={link.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
              
              <div className="flex items-center gap-2 self-stretch md:self-auto">
                <button onClick={() => moveUp(idx)} disabled={idx === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">↑</button>
                <button onClick={() => moveDown(idx)} disabled={idx === content.socialLinks.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">↓</button>
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Platform</label>
                <select
                  value={link.platform}
                  onChange={(e) => handleUpdate(link.id, 'platform', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-cinema-red outline-none"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Youtube">YouTube</option>
                  <option value="Vimeo">Vimeo</option>
                  <option value="Twitter">X / Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                </select>
              </div>

              <div className="flex-[2] w-full space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">URL</label>
                <input 
                  type="text"
                  value={link.url}
                  onChange={(e) => handleUpdate(link.id, 'url', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-cinema-red outline-none"
                />
              </div>

              <div className="flex items-center gap-4 self-end md:self-center mt-2 md:mt-0">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={link.isVisible}
                    onChange={(e) => handleUpdate(link.id, 'isVisible', e.target.checked)}
                    className="accent-cinema-red"
                  />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Visible</span>
                </label>

                <button 
                  onClick={() => handleRemove(link.id)}
                  className="p-2 text-gray-500 hover:text-red-500 bg-gray-900 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {content.socialLinks.length === 0 && (
            <p className="text-gray-500 text-sm py-4">No social links configured.</p>
          )}
        </div>
      </div>
    </div>
  );
}
