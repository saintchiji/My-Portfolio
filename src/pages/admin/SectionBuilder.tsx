import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSections } from '../../context/SectionContext';
import { PageSection } from '../../types';
import { GripVertical, Eye, EyeOff, Copy, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import MediaSelector from '../../components/admin/MediaSelector';
import { useContent } from '../../context/ContentContext';

export default function SectionBuilder() {
  const { sections, updateSection, deleteSection, duplicateSection, reorderSections } = useSections();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  const activeSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {activeSections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-cinema-black border border-gray-800 rounded-lg overflow-hidden ${
                        snapshot.isDragging ? 'shadow-2xl shadow-cinema-red/10 ring-1 ring-cinema-red' : ''
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 bg-gray-900/50 border-b border-gray-800">
                        <div className="flex items-center gap-4">
                          <div {...provided.dragHandleProps} className="p-2 text-gray-500 hover:text-white cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-cinema-red mr-3 bg-cinema-red/10 px-2 py-1 rounded">
                              {section.type.replace('-preview', '')}
                            </span>
                            <span className="text-white font-medium">{section.title || 'Untitled Section'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateSection(section.id, { isHidden: !section.isHidden })}
                            className={`p-2 rounded ${section.isHidden ? 'text-gray-500 hover:text-white' : 'text-cinema-red hover:text-white'}`}
                            title={section.isHidden ? "Show Section" : "Hide Section"}
                          >
                            {section.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => duplicateSection(section.id)}
                            className="p-2 text-gray-500 hover:text-white rounded"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteSection(section.id)}
                            className="p-2 text-gray-500 hover:text-red-500 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
                            className="p-2 text-gray-500 hover:text-white rounded ml-2 border-l border-gray-800"
                          >
                            {expandedId === section.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Editor Content */}
                      {expandedId === section.id && (
                        <div className="p-6 space-y-6 bg-cinema-black">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Title</label>
                              <input
                                type="text"
                                value={section.title}
                                onChange={e => updateSection(section.id, { title: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Subtitle</label>
                              <input
                                type="text"
                                value={section.subtitle || ''}
                                onChange={e => updateSection(section.id, { subtitle: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                              />
                            </div>
                          </div>
                          
                          {/* Description for non-Hero if needed, or all */}
                          <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
                            <textarea
                              rows={3}
                              value={section.description || ''}
                              onChange={e => updateSection(section.id, { description: e.target.value })}
                              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Button Text</label>
                              <input
                                type="text"
                                value={section.buttonText || ''}
                                onChange={e => updateSection(section.id, { buttonText: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Button Link</label>
                              <input
                                type="text"
                                value={section.buttonLink || ''}
                                onChange={e => updateSection(section.id, { buttonLink: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                              />
                            </div>
                          </div>

                          {section.type === 'hero' && (
                            <div className="pt-4 border-t border-gray-800">
                              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Hero Background Media</label>
                              <MediaSelector
                                type="any"
                                value={section.mediaUrl || ''}
                                onChange={(val, asset) => {
                                  const mediaType = asset?.type === 'video' || val.includes('mp4') || val.includes('youtube') || val.includes('vimeo') ? 'video' : 'image';
                                  updateSection(section.id, { mediaUrl: val, mediaType });
                                }}
                              />
                            </div>
                          )}

                          {section.type === 'portfolio' && (
                            <div className="pt-4 border-t border-gray-800 space-y-4">
                              <div>
                                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Portfolio Layout</label>
                                <select
                                  value={section.layout}
                                  onChange={e => updateSection(section.id, { layout: e.target.value as any })}
                                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                                >
                                  <option value="cinematic-grid">Cinematic Grid</option>
                                  <option value="masonry">Masonry</option>
                                  <option value="carousel">Carousel</option>
                                  <option value="two-column">Two Column</option>
                                  <option value="three-column">Three Column</option>
                                </select>
                              </div>
                              <CategoryVisibilityEditor section={section} updateSection={updateSection} />
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

function CategoryVisibilityEditor({ section, updateSection }: { section: PageSection, updateSection: any }) {
  const allCategories = ['Long-Form', 'Short-Form', 'Commercial', 'Wedding', 'Cinematography', 'Video Editing', 'Music Video', 'Documentary', 'Fashion'];
  // For Category Visibility, we could store it in projectSelection.
  // Actually projectSelection was { type: 'all', ids: [] }. We can use `ids` to store allowed categories if type='categories', or just add `allowedCategories` to PageSection.
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
