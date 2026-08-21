import { useState } from 'react';
import BrandingEditor from './BrandingEditor';
import ThemeEditor from './ThemeEditor';
import { useContent } from '../../context/ContentContext';
import { useDatabase } from '../../context/DatabaseContext';
import { Save, UploadCloud } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'theme' | 'navigation' | 'publishing'>('general');
  const { content, updateContent, updateNestedContent } = useContent();
  const { publish, isPublishing } = useDatabase();

  return (
    <div className="pb-24 max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Settings</h1>
      </div>

      <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto hide-scrollbar">
        {[
          { id: 'general', label: 'General Info' },
          { id: 'branding', label: 'Branding' },
          { id: 'theme', label: 'Theme' },
          { id: 'navigation', label: 'Navigation & Footer' },
          { id: 'publishing', label: 'Publishing' }
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
        {activeTab === 'general' && (
          <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-6 max-w-xl">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Headline (Contact)</label>
              <input 
                type="text" 
                value={content.contact.headline}
                onChange={e => updateNestedContent('contact', 'headline', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description (Contact)</label>
              <textarea 
                rows={3}
                value={content.contact.description}
                onChange={e => updateNestedContent('contact', 'description', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Email</label>
              <input 
                type="email" 
                value={content.contact.email}
                onChange={e => updateNestedContent('contact', 'email', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Location</label>
              <input 
                type="text" 
                value={content.contact.location}
                onChange={e => updateNestedContent('contact', 'location', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
          </div>
        )}
        
        {activeTab === 'branding' && (
          <div className="-m-8">
             <BrandingEditor />
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="-m-8">
             <ThemeEditor />
          </div>
        )}

        {activeTab === 'navigation' && (
          <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Main Navigation</h3>
              <p className="text-sm text-gray-500 mb-6">Control which links appear in the header.</p>
              
              <div className="space-y-3">
                {content.navigation.map((link, idx) => (
                  <label key={link.id} className="flex items-center gap-3 p-4 border border-gray-800 rounded bg-gray-900/50 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={link.isVisible}
                      onChange={(e) => {
                        const newNav = [...content.navigation];
                        newNav[idx] = { ...newNav[idx], isVisible: e.target.checked };
                        updateContent({ navigation: newNav });
                      }}
                      className="accent-cinema-red w-4 h-4"
                    />
                    <span className="text-sm text-white font-medium">{link.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-800">
              <h3 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Footer Text</h3>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Footer Description</label>
                <textarea 
                  rows={3}
                  value={content.footer.text}
                  onChange={e => updateNestedContent('footer', 'text', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'publishing' && (
          <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-6 max-w-xl">
            <h2 className="text-xl font-serif text-white mb-2">Publish Changes</h2>
            <p className="text-gray-400 text-sm mb-6">
              All changes in the Admin Dashboard are saved as drafts automatically. Click below to publish your changes to the live website.
            </p>
            <button
              onClick={publish}
              disabled={isPublishing}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-md text-sm font-bold text-white bg-cinema-red hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <UploadCloud className="w-5 h-5" />
              {isPublishing ? 'PUBLISHING...' : 'PUBLISH TO LIVE SITE'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
