import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSections } from '../../context/SectionContext';
import { PageSection } from '../../types';
import { GripVertical, Eye, EyeOff, Copy, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import MediaSelector from '../../components/admin/MediaSelector';
import { SectionEditor } from '../../components/admin/SectionEditors';
import { useContent } from '../../context/ContentContext';

export default function SectionBuilder() {
  const { sections, addSection, updateSection, deleteSection, duplicateSection, reorderSections } = useSections();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderSections(result.source.index, result.destination.index);
  };

  const activeSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <button onClick={() => addSection({ type: 'hero', title: 'New Hero', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, buttons: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Hero</button>
        <button onClick={() => addSection({ type: 'portfolio', title: 'Selected Work', subtitle: '', description: '', layout: 'cinematic-grid', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] } })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Portfolio</button>
        <button onClick={() => addSection({ type: 'about-preview', title: 'About Us', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] } })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add About</button>
        <button onClick={() => addSection({ type: 'services-preview', title: 'Services', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, items: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Services</button>
        <button onClick={() => addSection({ type: 'contact', title: 'Get In Touch', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, buttons: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Contact</button>
        <button onClick={() => addSection({ type: 'footer', title: 'Footer', subtitle: '', description: '', footerText: '', copyright: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, items: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Footer</button>
      </div>
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
                        <SectionEditor section={section} />
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

