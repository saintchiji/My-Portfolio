import { useState } from 'react';
import SectionBuilder from './SectionBuilder';
import { useContent } from '../../context/ContentContext';
import MediaSelector from '../../components/admin/MediaSelector';

export default function PageBuilder() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services'>('home');
  const { content, updateContent, updateNestedContent } = useContent();

  return (
    <div className="pb-24 max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Page Builder</h1>
      </div>

      <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto hide-scrollbar">
        {[
          { id: 'home', label: 'Homepage' },
          { id: 'about', label: 'About Page' },
          { id: 'services', label: 'Services Page' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 px-2 uppercase tracking-widest text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'text-cinema-red border-b-2 border-cinema-red' 
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === 'home' && <SectionBuilder />}
        {activeTab === 'about' && (
           <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-8">
             <div className="space-y-6">
              <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2">Main Content</h3>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Hero Headline</label>
                <input 
                  type="text" 
                  value={content.about.headline}
                  onChange={e => updateNestedContent('about', 'headline', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Philosophy Quote</label>
                <input 
                  type="text" 
                  value={content.about.philosophy}
                  onChange={e => updateNestedContent('about', 'philosophy', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none text-center font-serif text-xl"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Biography Paragraph 1</label>
                  <textarea 
                    rows={6}
                    value={content.about.biography1}
                    onChange={e => updateNestedContent('about', 'biography1', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none leading-relaxed text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Biography Paragraph 2</label>
                  <textarea 
                    rows={6}
                    value={content.about.biography2}
                    onChange={e => updateNestedContent('about', 'biography2', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none leading-relaxed text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">About Page Media (Video or Image)</label>
                <MediaSelector 
                  type="any"
                  value={content.about.mediaUrl || ''}
                  onChange={(val, asset) => {
                    const mediaType = asset?.type === 'video' || val.includes('mp4') || val.includes('youtube') || val.includes('vimeo') ? 'video' : 'image';
                    updateNestedContent('about', 'mediaUrl', val);
                    updateNestedContent('about', 'mediaType', mediaType);
                  }}
                />
              </div>
            </div>
           </div>
        )}
        {activeTab === 'services' && (
           <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-8">
            <div className="space-y-6 max-w-xl">
              <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2">Services Header</h3>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Hero Headline</label>
                <input 
                  type="text" 
                  value={content.servicesPage.headline}
                  onChange={e => updateNestedContent('servicesPage', 'headline', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Hero Description</label>
                <textarea 
                  rows={3}
                  value={content.servicesPage.description}
                  onChange={e => updateNestedContent('servicesPage', 'description', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
                />
              </div>
            </div>

            <div className="space-y-6 mt-12">
              <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2">Service Offerings</h3>
              <p className="text-sm text-gray-500">Edit the detailed services offered by the studio.</p>
              
              <div className="space-y-4">
                {content.services.map((service, index) => (
                  <div key={service.id} className="border border-gray-800 bg-gray-900/50 p-6 rounded relative group">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Service Title</label>
                        <input 
                          type="text" 
                          value={service.title}
                          onChange={e => {
                            const newServices = [...content.services];
                            newServices[index] = { ...service, title: e.target.value };
                            updateContent({ services: newServices });
                          }}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Icon (Lucide Name)</label>
                        <input 
                          type="text" 
                          value={service.iconName}
                          onChange={e => {
                            const newServices = [...content.services];
                            newServices[index] = { ...service, iconName: e.target.value };
                            updateContent({ services: newServices });
                          }}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
                        <textarea 
                          rows={2}
                          value={service.description}
                          onChange={e => {
                            const newServices = [...content.services];
                            newServices[index] = { ...service, description: e.target.value };
                            updateContent({ services: newServices });
                          }}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Service Media (Optional)</label>
                        <MediaSelector 
                          type="any"
                          value={service.mediaUrl || ''}
                          onChange={(val, asset) => {
                            const newServices = [...content.services];
                            const mediaType = asset?.type === 'video' || val.includes('mp4') || val.includes('youtube') || val.includes('vimeo') ? 'video' : 'image';
                            newServices[index] = { ...service, mediaUrl: val, mediaType };
                            updateContent({ services: newServices });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
           </div>
        )}
      </div>
    </div>
  );
}
