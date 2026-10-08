import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Plus, X } from 'lucide-react';

export default function Categories() {
  const { content, updateContent } = useContent();
  const categories = content.categories || [];

  const handleUpdate = (id: string, field: string, value: any) => {
    const updated = categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    updateContent({ categories: updated });
  };

  const handleRemove = (id: string) => {
    updateContent({ categories: categories.filter(c => c.id !== id) });
  };

  const handleAdd = () => {
    const newId = `cat-${Date.now()}`;
    updateContent({ 
      categories: [
        ...categories, 
        { id: newId, name: 'New Category', isVisible: true, order: categories.length }
      ] 
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...categories];
    const temp = items[index - 1];
    items[index - 1] = items[index];
    items[index] = temp;
    
    // update order numbers
    items.forEach((item, idx) => item.order = idx);
    updateContent({ categories: items });
  };

  const moveDown = (index: number) => {
    if (index === categories.length - 1) return;
    const items = [...categories];
    const temp = items[index + 1];
    items[index + 1] = items[index];
    items[index] = temp;
    
    // update order numbers
    items.forEach((item, idx) => item.order = idx);
    updateContent({ categories: items });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif text-white tracking-widest uppercase mb-8">Categories</h1>
      
      <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg max-w-3xl">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
          <h2 className="text-xl font-serif text-white">Project Categories</h2>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded text-sm uppercase tracking-wider font-bold transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
        
        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={cat.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 self-stretch md:self-auto">
                <button onClick={() => moveUp(idx)} disabled={idx === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">↑</button>
                <button onClick={() => moveDown(idx)} disabled={idx === categories.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">↓</button>
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category Name</label>
                <input 
                  type="text"
                  value={cat.name}
                  onChange={(e) => handleUpdate(cat.id, 'name', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-cinema-red outline-none"
                />
              </div>

              <div className="flex items-center gap-4 self-end md:self-center mt-2 md:mt-0">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={cat.isVisible}
                    onChange={(e) => handleUpdate(cat.id, 'isVisible', e.target.checked)}
                    className="accent-cinema-red"
                  />
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Visible</span>
                </label>

                <button 
                  onClick={() => handleRemove(cat.id)}
                  className="p-2 text-gray-500 hover:text-red-500 bg-gray-900 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <p className="text-gray-500 text-sm py-4 text-center">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
