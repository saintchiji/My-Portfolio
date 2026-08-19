import { useState } from 'react';
import { useSections } from '../../context/SectionContext';
import { useProjects } from '../../context/ProjectContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  GripVertical, Plus, Trash2, Copy, Eye, EyeOff, ChevronDown, ChevronUp 
} from 'lucide-react';
import { PageSection, SectionType, PortfolioLayout, SectionSpacing, SectionBackground } from '../../types';

export default function SectionBuilder() {
  const { sections, addSection, updateSection, deleteSection, duplicateSection, reorderSections } = useSections();
  const { projects } = useProjects();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  const handleCreateNew = (type: SectionType) => {
    let title = 'New Section';
    if (type === 'hero') title = 'New Hero';
    if (type === 'portfolio') title = 'New Portfolio Section';
    if (type === 'about-preview') title = 'WHO WE ARE';
    if (type === 'services-preview') title = 'WHAT WE DO';

    addSection({
      type,
      title,
      layout: type === 'portfolio' ? 'cinematic-grid' : 'hero',
      background: 'transparent',
      spacing: 'normal',
      isHidden: false,
      projectSelection: { type: 'all', ids: [] }
    });
  };

  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-serif text-white">Visual Page Builder</h1>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => handleCreateNew('hero')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium border border-gray-700"
          >
            <Plus className="w-4 h-4" /> Hero
          </button>
          <button 
            onClick={() => handleCreateNew('portfolio')}
            className="bg-cinema-red hover:bg-cinema-red-light text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Portfolio
          </button>
          <button 
            onClick={() => handleCreateNew('about-preview')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium border border-gray-700"
          >
            <Plus className="w-4 h-4" /> About Preview
          </button>
          <button 
            onClick={() => handleCreateNew('services-preview')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium border border-gray-700"
          >
            <Plus className="w-4 h-4" /> Services Preview
          </button>
        </div>
      </div>

      <div className="bg-cinema-black border border-gray-800 rounded-lg p-4">
        {sortedSections.length === 0 ? (
          <div className="p-12 text-center text-gray-400 border border-dashed border-gray-800 rounded-lg">
            <p className="mb-4 text-sm uppercase tracking-widest font-bold">No Sections Configured</p>
            <p className="mb-6 font-light">Your homepage is currently empty. Add a section to begin building your layout.</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => handleCreateNew('hero')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium border border-gray-700"
              >
                <Plus className="w-4 h-4" /> Add Hero
              </button>
              <button 
                onClick={() => handleCreateNew('portfolio')}
                className="bg-cinema-red hover:bg-cinema-red-light text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Portfolio Block
              </button>
            </div>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {sortedSections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border rounded-lg overflow-hidden transition-colors ${
                          snapshot.isDragging ? 'border-cinema-red shadow-2xl bg-gray-900' : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                        } ${section.isHidden ? 'opacity-60' : ''}`}
                      >
                        {/* Header Handle */}
                        <div className="p-4 flex items-center gap-4 bg-gray-900/80">
                          <div {...provided.dragHandleProps} className="text-gray-500 hover:text-white cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-white font-medium flex items-center gap-3">
                              {section.title || 'Untitled Section'}
                              <span className="text-[10px] uppercase tracking-wider text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                                {section.type === 'portfolio' ? section.layout : section.type}
                              </span>
                            </h3>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateSection(section.id, { isHidden: !section.isHidden })}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                              title={section.isHidden ? "Show Section" : "Hide Section"}
                            >
                              {section.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => duplicateSection(section.id)}
                              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
                              title="Duplicate"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if(window.confirm('Delete this section?')) deleteSection(section.id);
                              }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors ml-2 border border-gray-700"
                            >
                              {expandedId === section.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Editor Body */}
                        {expandedId === section.id && (
                          <div className="p-6 bg-cinema-black border-t border-gray-800 space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Title</label>
                                {section.type === 'hero' ? (
                                  <textarea 
                                    rows={2}
                                    value={section.title} 
                                    onChange={e => updateSection(section.id, { title: e.target.value })} 
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none resize-none"
                                  />
                                ) : (
                                  <input 
                                    type="text" 
                                    value={section.title} 
                                    onChange={e => updateSection(section.id, { title: e.target.value })} 
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" 
                                  />
                                )}
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subtitle / Kicker</label>
                                <input 
                                  type="text" 
                                  value={section.subtitle || ''} 
                                  onChange={e => updateSection(section.id, { subtitle: e.target.value })} 
                                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none" 
                                />
                              </div>
                            </div>

                            {section.type === 'portfolio' && (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Layout Preset</label>
                                  <select 
                                    value={section.layout} 
                                    onChange={e => updateSection(section.id, { layout: e.target.value as PortfolioLayout })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                                  >
                                    <option value="cinematic-grid">Cinematic Grid</option>
                                    <option value="masonry">Masonry</option>
                                    <option value="carousel">Horizontal Carousel</option>
                                    <option value="editorial">Editorial (Staggered)</option>
                                    <option value="featured-supporting">Featured + Supporting</option>
                                    <option value="full-width">Full Width (1 Column)</option>
                                    <option value="two-column">Two Column Grid</option>
                                    <option value="three-column">Three Column Grid</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Columns Override</label>
                                  <select 
                                    value={section.columns || ''} 
                                    onChange={e => updateSection(section.id, { columns: e.target.value ? Number(e.target.value) as any : undefined })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                                  >
                                    <option value="">Use Preset Default</option>
                                    <option value="1">1 Column</option>
                                    <option value="2">2 Columns</option>
                                    <option value="3">3 Columns</option>
                                    <option value="4">4 Columns</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Selection</label>
                                  <select 
                                    value={section.projectSelection.type} 
                                    onChange={e => updateSection(section.id, { 
                                      projectSelection: { ...section.projectSelection, type: e.target.value as 'all' | 'manual' } 
                                    })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                                  >
                                    <option value="all">All Published Projects</option>
                                    <option value="manual">Manual Selection</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Spacing / Padding</label>
                                <select 
                                  value={section.spacing} 
                                  onChange={e => updateSection(section.id, { spacing: e.target.value as SectionSpacing })}
                                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                                >
                                  <option value="tight">Tight</option>
                                  <option value="normal">Normal</option>
                                  <option value="loose">Loose</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Background Style</label>
                                <select 
                                  value={section.background} 
                                  onChange={e => updateSection(section.id, { background: e.target.value as SectionBackground })}
                                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none"
                                >
                                  <option value="transparent">Transparent (Base Theme)</option>
                                  <option value="cinema-black">Pure Black (#030101)</option>
                                  <option value="cinema-dark">Off Black (#0a0303)</option>
                                  <option value="cinema-red-burn">Red Glow Burn</option>
                                </select>
                              </div>
                            </div>

                            {/* Manual Project Selection UI */}
                            {section.type === 'portfolio' && section.projectSelection.type === 'manual' && (
                              <div className="space-y-3 pt-4 border-t border-gray-800">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Projects</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {projects.map(p => {
                                    const isSelected = section.projectSelection.ids.includes(p.id);
                                    return (
                                      <label key={p.id} className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${isSelected ? 'border-cinema-red bg-cinema-red/10' : 'border-gray-800 bg-gray-900 hover:border-gray-700'}`}>
                                        <input 
                                          type="checkbox" 
                                          checked={isSelected}
                                          onChange={(e) => {
                                            const newIds = e.target.checked 
                                              ? [...section.projectSelection.ids, p.id]
                                              : section.projectSelection.ids.filter(id => id !== p.id);
                                            updateSection(section.id, {
                                              projectSelection: { ...section.projectSelection, ids: newIds }
                                            });
                                          }}
                                          className="accent-cinema-red"
                                        />
                                        <span className="text-sm text-gray-300 truncate">{p.title}</span>
                                      </label>
                                    );
                                  })}
                                </div>
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
        )}
      </div>
    </div>
  );
}
