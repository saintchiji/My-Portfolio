import { useContent } from '../../context/ContentContext';
import { Plus, X } from 'lucide-react';

export default function Services() {
  const { content, updateContent, updateNestedContent } = useContent();
  const services = content.services || [];

  const handleUpdate = (id: string, field: string, value: any) => {
    const updated = services.map(srv => 
      srv.id === id ? { ...srv, [field]: value } : srv
    );
    updateContent({ services: updated });
  };

  const handleRemove = (id: string) => {
    updateContent({ services: services.filter(s => s.id !== id) });
  };

  const handleAdd = () => {
    const newId = `srv-${Date.now()}`;
    updateContent({ 
      services: [
        ...services, 
        { 
          id: newId, 
          title: 'New Service', 
          description: '', 
          iconName: 'Play', 
          capabilities: [], 
          isVisible: true, 
          order: services.length 
        }
      ] 
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...services];
    const temp = items[index - 1];
    items[index - 1] = items[index];
    items[index] = temp;
    items.forEach((item, idx) => item.order = idx);
    updateContent({ services: items });
  };

  const moveDown = (index: number) => {
    if (index === services.length - 1) return;
    const items = [...services];
    const temp = items[index + 1];
    items[index + 1] = items[index];
    items[index] = temp;
    items.forEach((item, idx) => item.order = idx);
    updateContent({ services: items });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif text-white tracking-widest uppercase mb-8">Services</h1>
      
      <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg max-w-4xl space-y-8">
        <div>
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Services Page Header</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Headline</label>
              <input 
                type="text" 
                value={content.servicesPage.headline}
                onChange={e => updateNestedContent('servicesPage', 'headline', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Description</label>
              <textarea 
                rows={3}
                value={content.servicesPage.description}
                onChange={e => updateNestedContent('servicesPage', 'description', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-serif text-white">Service Offerings</h2>
            <button 
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded text-sm uppercase tracking-wider font-bold transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          </div>
          
          <div className="space-y-6">
            {services.map((srv, idx) => (
              <div key={srv.id} className="flex flex-col gap-4 bg-gray-900/50 border border-gray-800 p-6 rounded-lg relative group">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button onClick={() => moveUp(idx)} disabled={idx === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">↑</button>
                  <button onClick={() => moveDown(idx)} disabled={idx === services.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">↓</button>
                  <button 
                    onClick={() => handleRemove(srv.id)}
                    className="p-1 text-gray-500 hover:text-red-500 rounded transition-colors ml-4"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pr-24">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                    <input 
                      type="text"
                      value={srv.title}
                      onChange={(e) => handleUpdate(srv.id, 'title', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-cinema-red outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Icon (Lucide Name)</label>
                    <input 
                      type="text"
                      value={srv.iconName}
                      onChange={(e) => handleUpdate(srv.id, 'iconName', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-cinema-red outline-none"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                    <textarea 
                      rows={2}
                      value={srv.description}
                      onChange={(e) => handleUpdate(srv.id, 'description', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-cinema-red outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Capabilities (comma separated)</label>
                    <textarea 
                      rows={2}
                      value={srv.capabilities.join(', ')}
                      onChange={(e) => {
                        const caps = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                        handleUpdate(srv.id, 'capabilities', caps);
                      }}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-cinema-red outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={srv.isVisible}
                      onChange={(e) => handleUpdate(srv.id, 'isVisible', e.target.checked)}
                      className="accent-cinema-red"
                    />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Visible on Site</span>
                  </label>
                </div>
              </div>
            ))}

            {services.length === 0 && (
              <p className="text-gray-500 text-sm py-4 text-center">No services found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
