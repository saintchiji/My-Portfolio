import React, { useState } from 'react';
import { PageSection, SectionButton, SectionItem } from '../../types';
import { useSections } from '../../context/SectionContext';
import { Plus, Trash2, GripVertical, Settings2, Image as ImageIcon, Video, Eye, EyeOff } from 'lucide-react';
import MediaSelector from './MediaSelector';

export function SectionEditor({ section }: { section: PageSection }) {
  switch (section.type) {
    case 'hero': return <HeroEditor section={section} />;
    case 'portfolio': return <PortfolioEditor section={section} />;
    case 'about-preview': return <AboutEditor section={section} />;
    case 'services-preview': return <ServicesEditor section={section} />;
    case 'contact': return <ContactEditor section={section} />;
    case 'footer': return <FooterEditor section={section} />;
    default: return <div className="p-4 text-white">No editor defined for {section.type}</div>;
  }
}

function HeroEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateSection(section.id, { [e.target.name]: e.target.value });
  };
  
  const buttons = section.buttons || [];
  
  const addButton = () => {
    const newBtn: SectionButton = { id: crypto.randomUUID(), text: 'New Button', url: '#', isVisible: true };
    updateSection(section.id, { buttons: [...buttons, newBtn] });
  };
  
  const updateButton = (id: string, updates: Partial<SectionButton>) => {
    updateSection(section.id, { buttons: buttons.map(b => b.id === id ? { ...b, ...updates } : b) });
  };
  
  const deleteButton = (id: string) => {
    updateSection(section.id, { buttons: buttons.filter(b => b.id !== id) });
  };

  return (
    <div className="p-6 space-y-6 bg-cinema-black border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Eyebrow / Subtitle</label>
          <input type="text" name="subtitle" value={section.subtitle || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Title</label>
          <input type="text" name="title" value={section.title || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
        <textarea name="description" rows={3} value={section.description || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Background Media</label>
          <MediaSelector type="any" value={section.mediaUrl || ''} onChange={(url, asset) => {
             updateSection(section.id, { 
               mediaUrl: url, 
               mediaType: asset ? (asset.type === 'video' ? 'video' : 'image') : (url.match(/\.(mp4|webm)/i) ? 'video' : 'image') 
             });
          }} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Overlay / Background Style</label>
          <select name="background" value={section.background} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none">
            <option value="transparent">Transparent (Full Media visibility)</option>
            <option value="cinema-black">Solid Black</option>
            <option value="cinema-dark">Dark Gradient</option>
            <option value="cinema-red-burn">Red Accent Burn</option>
          </select>
        </div>
        <div className="col-span-1 md:col-span-2">
           <CategoryVisibilityEditor section={section} />
        </div>
      </div>
      
      {/* Buttons */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500">CTA Buttons</label>
          <button onClick={addButton} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-2"><Plus className="w-3 h-3" /> Add Button</button>
        </div>
        <div className="space-y-3">
          {buttons.map((btn, index) => (
             <div key={btn.id} className="flex items-center gap-3 bg-gray-900 p-3 rounded border border-gray-800">
               <GripVertical className="w-4 h-4 text-gray-600 cursor-move" />
               <input type="text" placeholder="Text" value={btn.text} onChange={e => updateButton(btn.id, { text: e.target.value })} className="flex-1 bg-black border border-gray-700 rounded px-3 py-1 text-sm text-white" />
               <input type="text" placeholder="URL" value={btn.url} onChange={e => updateButton(btn.id, { url: e.target.value })} className="flex-1 bg-black border border-gray-700 rounded px-3 py-1 text-sm text-white" />
               <button onClick={() => updateButton(btn.id, { isVisible: !btn.isVisible })} className={`p-1.5 rounded ${btn.isVisible ? 'text-green-500 hover:bg-green-500/10' : 'text-gray-500 hover:bg-gray-800'}`}>
                 {btn.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
               </button>
               <button onClick={() => deleteButton(btn.id)} className="p-1.5 text-gray-500 hover:text-cinema-red hover:bg-cinema-red/10 rounded">
                 <Trash2 className="w-4 h-4" />
               </button>
             </div>
          ))}
          {buttons.length === 0 && <p className="text-xs text-gray-600 italic">No buttons added.</p>}
        </div>
      </div>
    </div>
  );
}

function PortfolioEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateSection(section.id, { [e.target.name]: e.target.value });
  };
  return (
    <div className="p-6 space-y-6 bg-cinema-black border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Title</label>
          <input type="text" name="title" value={section.title || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Subtitle</label>
          <input type="text" name="subtitle" value={section.subtitle || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
        <textarea name="description" rows={3} value={section.description || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Layout</label>
          <select name="layout" value={section.layout} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none">
            <option value="cinematic-grid">Cinematic Grid</option>
            <option value="masonry">Masonry</option>
            <option value="carousel">Carousel</option>
            <option value="full-width">Full Width</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Number of Projects (0 for all)</label>
          <input type="number" name="limit" value={section.limit || 0} onChange={e => updateSection(section.id, { limit: parseInt(e.target.value) || 0 })} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
      </div>
    </div>
  );
}

function AboutEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateSection(section.id, { [e.target.name]: e.target.value });
  };
  return (
    <div className="p-6 space-y-6 bg-cinema-black border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Title</label>
          <input type="text" name="title" value={section.title || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Subtitle</label>
          <input type="text" name="subtitle" value={section.subtitle || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Biography / Description</label>
        <textarea name="description" rows={5} value={section.description || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Media (Image/Video)</label>
          <MediaSelector type="any" value={section.mediaUrl || ''} onChange={(url, asset) => {
             updateSection(section.id, { 
               mediaUrl: url, 
               mediaType: asset ? (asset.type === 'video' ? 'video' : 'image') : (url.match(/\.(mp4|webm)/i) ? 'video' : 'image') 
             });
          }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Button Text</label>
            <input type="text" name="buttonText" value={section.buttonText || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Button Link</label>
            <input type="text" name="buttonLink" value={section.buttonLink || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateSection(section.id, { [e.target.name]: e.target.value });
  };
  const items = section.items || [];
  
  const addItem = () => {
    const newItem: SectionItem = { id: crypto.randomUUID(), title: 'New Service', description: '', isVisible: true, order: items.length };
    updateSection(section.id, { items: [...items, newItem] });
  };
  
  const updateItem = (id: string, updates: Partial<SectionItem>) => {
    updateSection(section.id, { items: items.map(b => b.id === id ? { ...b, ...updates } : b) });
  };
  
  const deleteItem = (id: string) => {
    updateSection(section.id, { items: items.filter(b => b.id !== id) });
  };

  return (
    <div className="p-6 space-y-6 bg-cinema-black border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Title</label>
          <input type="text" name="title" value={section.title || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Subtitle</label>
          <input type="text" name="subtitle" value={section.subtitle || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
        <textarea name="description" rows={2} value={section.description || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none" />
      </div>
      
      {/* Services Items */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500">Service Items</label>
          <button onClick={addItem} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-2"><Plus className="w-3 h-3" /> Add Service</button>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
             <div key={item.id} className="bg-gray-900 p-4 rounded border border-gray-800 flex flex-col gap-3">
               <div className="flex items-center gap-3 justify-between">
                 <div className="flex items-center gap-3 flex-1">
                   <GripVertical className="w-4 h-4 text-gray-600 cursor-move" />
                   <input type="text" placeholder="Title" value={item.title} onChange={e => updateItem(item.id, { title: e.target.value })} className="flex-1 bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white font-bold" />
                 </div>
                 <div className="flex items-center gap-2">
                   <button onClick={() => updateItem(item.id, { isVisible: !item.isVisible })} className={`p-1.5 rounded ${item.isVisible ? 'text-green-500 hover:bg-green-500/10' : 'text-gray-500 hover:bg-gray-800'}`}>
                     {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                   </button>
                   <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-500 hover:text-cinema-red hover:bg-cinema-red/10 rounded">
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </div>
               </div>
               <div className="pl-7">
                 <textarea placeholder="Description" rows={2} value={item.description} onChange={e => updateItem(item.id, { description: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white resize-none" />
               </div>
               <div className="pl-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select value={item.iconName || ''} onChange={e => updateItem(item.id, { iconName: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:border-cinema-red outline-none">
                     <option value="">Default Icon</option>
                     <option value="Film">Film</option>
                     <option value="Scissors">Scissors</option>
                     <option value="PlaySquare">PlaySquare</option>
                     <option value="MonitorPlay">MonitorPlay</option>
                     <option value="Clapperboard">Clapperboard</option>
                  </select>
                  <input type="text" placeholder="Button Text (optional)" value={item.buttonText || ''} onChange={e => updateItem(item.id, { buttonText: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
                  <input type="text" placeholder="Button URL (optional)" value={item.buttonUrl || ''} onChange={e => updateItem(item.id, { buttonUrl: e.target.value })} className="w-full bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
               </div>
             </div>
          ))}
          {items.length === 0 && <p className="text-xs text-gray-600 italic">No services added.</p>}
        </div>
      </div>
    </div>
  );
}

function ContactEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateSection(section.id, { [e.target.name]: e.target.value });
  };
  return (
    <div className="p-6 space-y-6 bg-cinema-black border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Title</label>
          <input type="text" name="title" value={section.title || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Subtitle</label>
          <input type="text" name="subtitle" value={section.subtitle || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
        <textarea name="description" rows={3} value={section.description || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none" />
      </div>
      {/* Contact also has buttons, same logic as Hero */}
    </div>
  );
}

function FooterEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateSection(section.id, { [e.target.name]: e.target.value });
  };
  
  const items = section.items || [];
  
  const addItem = () => {
    const newItem: SectionItem = { id: crypto.randomUUID(), title: 'New Link', description: '', buttonUrl: '#', isVisible: true, order: items.length };
    updateSection(section.id, { items: [...items, newItem] });
  };
  
  const updateItem = (id: string, updates: Partial<SectionItem>) => {
    updateSection(section.id, { items: items.map(b => b.id === id ? { ...b, ...updates } : b) });
  };
  
  const deleteItem = (id: string) => {
    updateSection(section.id, { items: items.filter(b => b.id !== id) });
  };

  return (
    <div className="p-6 space-y-6 bg-cinema-black border-t border-gray-800">
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Footer Description</label>
        <textarea name="footerText" rows={3} value={section.footerText || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Copyright Text</label>
        <input type="text" name="copyright" value={section.copyright || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500">Footer Links & Social</label>
          <button onClick={addItem} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-2"><Plus className="w-3 h-3" /> Add Link</button>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
             <div key={item.id} className="flex items-center gap-3 bg-gray-900 p-3 rounded border border-gray-800">
               <GripVertical className="w-4 h-4 text-gray-600 cursor-move" />
               <input type="text" placeholder="Label" value={item.title} onChange={e => updateItem(item.id, { title: e.target.value })} className="flex-1 bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
               <input type="text" placeholder="URL" value={item.buttonUrl || ''} onChange={e => updateItem(item.id, { buttonUrl: e.target.value })} className="flex-1 bg-black border border-gray-700 rounded px-3 py-1.5 text-sm text-white" />
               <button onClick={() => updateItem(item.id, { isVisible: !item.isVisible })} className={`p-1.5 rounded ${item.isVisible ? 'text-green-500 hover:bg-green-500/10' : 'text-gray-500 hover:bg-gray-800'}`}>
                 {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
               </button>
               <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-500 hover:text-cinema-red hover:bg-cinema-red/10 rounded">
                 <Trash2 className="w-4 h-4" />
               </button>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function CategoryVisibilityEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const allCategories = ['Long-Form', 'Short-Form', 'Commercial', 'Wedding', 'Cinematography', 'Video Editing', 'Music Video', 'Documentary', 'Fashion'];
  
  const isAll = section.projectSelection?.type === 'all';
  const allowed = section.projectSelection?.ids || [];

  const toggleCat = (cat: string) => {
    let newAllowed = [...allowed];
    if (isAll) {
      newAllowed = allCategories.filter(c => c !== cat);
    } else {
      if (newAllowed.includes(cat)) {
        newAllowed = newAllowed.filter(c => c !== cat);
      } else {
        newAllowed.push(cat);
      }
    }
    updateSection(section.id, { projectSelection: { type: 'categories', ids: newAllowed } });
  };

  const isChecked = (cat: string) => {
    if (isAll) return true;
    return allowed.includes(cat);
  };

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Category Visibility</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {allCategories.map(cat => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer p-2 bg-gray-900 rounded border border-gray-800 hover:border-gray-700">
            <input 
              type="checkbox"
              checked={isChecked(cat)}
              onChange={() => toggleCat(cat)}
              className="accent-cinema-red"
            />
            <span className="text-sm text-gray-300">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
