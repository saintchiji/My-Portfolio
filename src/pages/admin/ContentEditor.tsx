import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { motion } from 'motion/react';
import { Save, CheckCircle } from 'lucide-react';
import MediaSelector from '../../components/admin/MediaSelector';

export default function ContentEditor() {
  const { content, updateContent, updateNestedContent } = useContent();
  const [activeTab, setActiveTab] = useState<'branding' | 'navigation' | 'contact' | 'footer' | 'about' | 'services'>('branding');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Context automatically saves to localStorage on change, but we show a nice UI indicator
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pb-24 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white">Site Content</h1>
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center gap-2 px-6 py-2 uppercase tracking-widest text-xs font-semibold"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto hide-scrollbar">
        {[
          { id: 'branding', label: 'Branding' },
          { id: 'navigation', label: 'Navigation' },
          { id: 'contact', label: 'Contact Info' },
          { id: 'footer', label: 'Footer' },
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

      <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg">
        {activeTab === 'branding' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Logo Text</label>
              <input 
                type="text" 
                value={content.branding.logoText}
                onChange={e => updateNestedContent('branding', 'logoText', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Logo Image URL (Optional)</label>
              <input 
                type="text" 
                value={content.branding.logoImage}
                onChange={e => updateNestedContent('branding', 'logoImage', e.target.value)}
                placeholder="Leave empty to use Logo Text"
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'navigation' && (
          <div className="space-y-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Main Navigation</h3>
              <p className="text-sm text-gray-500 mb-6">Control which links appear in the header and footer.</p>
              
              <div className="space-y-4">
                {[...content.navigation].sort((a, b) => a.order - b.order).map((navItem, index) => (
                  <div key={navItem.id} className="flex items-center gap-4 bg-gray-900 border border-gray-800 p-4 rounded">
                    <div className="text-gray-500 cursor-move">⋮⋮</div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        value={navItem.label}
                        onChange={e => {
                          const newNav = [...content.navigation];
                          const idx = newNav.findIndex(n => n.id === navItem.id);
                          if(idx !== -1) newNav[idx] = { ...navItem, label: e.target.value };
                          updateContent({ navigation: newNav });
                        }}
                        className="bg-cinema-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-cinema-red outline-none"
                        placeholder="Link Label"
                      />
                      <input 
                        type="text" 
                        value={navItem.path}
                        onChange={e => {
                          const newNav = [...content.navigation];
                          const idx = newNav.findIndex(n => n.id === navItem.id);
                          if(idx !== -1) newNav[idx] = { ...navItem, path: e.target.value };
                          updateContent({ navigation: newNav });
                        }}
                        className="bg-cinema-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-cinema-red outline-none font-mono"
                        placeholder="URL Path"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={navItem.isVisible}
                        onChange={e => {
                          const newNav = [...content.navigation];
                          const idx = newNav.findIndex(n => n.id === navItem.id);
                          if(idx !== -1) newNav[idx] = { ...navItem, isVisible: e.target.checked };
                          updateContent({ navigation: newNav });
                        }}
                        className="rounded border-gray-700 bg-cinema-black text-cinema-red focus:ring-cinema-red"
                      />
                      Visible
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800">
              <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Social Links</h3>
              <div className="space-y-4">
                {content.socialLinks.map((socialItem, index) => (
                  <div key={socialItem.id} className="flex items-center gap-4 bg-gray-900 border border-gray-800 p-4 rounded">
                    <div className="w-24 text-sm font-bold text-gray-300 uppercase tracking-widest">{socialItem.platform}</div>
                    <input 
                      type="text" 
                      value={socialItem.url}
                      onChange={e => {
                        const newSocial = [...content.socialLinks];
                        const idx = newSocial.findIndex(n => n.id === socialItem.id);
                        if(idx !== -1) newSocial[idx] = { ...socialItem, url: e.target.value };
                        updateContent({ socialLinks: newSocial });
                      }}
                      className="flex-1 bg-cinema-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-cinema-red outline-none"
                      placeholder={`${socialItem.platform} URL`}
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={socialItem.isVisible}
                        onChange={e => {
                          const newSocial = [...content.socialLinks];
                          const idx = newSocial.findIndex(n => n.id === socialItem.id);
                          if(idx !== -1) newSocial[idx] = { ...socialItem, isVisible: e.target.checked };
                          updateContent({ socialLinks: newSocial });
                        }}
                        className="rounded border-gray-700 bg-cinema-black text-cinema-red focus:ring-cinema-red"
                      />
                      Visible
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Headline</label>
              <input 
                type="text" 
                value={content.contact.headline}
                onChange={e => updateNestedContent('contact', 'headline', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
              <textarea 
                rows={4}
                value={content.contact.description}
                onChange={e => updateNestedContent('contact', 'description', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={content.contact.email}
                  onChange={e => updateNestedContent('contact', 'email', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Location Text</label>
                <input 
                  type="text" 
                  value={content.contact.location}
                  onChange={e => updateNestedContent('contact', 'location', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'footer' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Footer Description Text</label>
              <textarea 
                rows={3}
                value={content.footer.text}
                onChange={e => updateNestedContent('footer', 'text', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-8">
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
          <div className="space-y-8">
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
