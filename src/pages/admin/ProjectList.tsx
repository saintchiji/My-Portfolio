import { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Copy, Trash2, GripVertical, CheckCircle, XCircle, Star } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function ProjectList() {
  const { projects, deleteProject, duplicateProject, reorderProjects, updateProject } = useProjects();
  const navigate = useNavigate();

  // Sort by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderProjects(result.source.index, result.destination.index);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white">Projects</h1>
        <button 
          onClick={() => navigate('/admin/projects/new')}
          className="bg-cinema-red hover:bg-cinema-red-light text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="bg-cinema-black border border-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1"></div>
          <div className="col-span-5">Project</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Featured</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sortedProjects.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">
                    <p className="mb-4">No projects found in the portfolio.</p>
                    <button 
                      onClick={() => navigate('/admin/projects/new')}
                      className="inline-flex bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded items-center gap-2 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" /> Create Your First Project
                    </button>
                  </div>
                ) : (
                  sortedProjects.map((project, index) => (
                    <Draggable key={project.id} draggableId={project.id} index={index}>
                      {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-800 last:border-0 ${
                          snapshot.isDragging ? 'bg-gray-900 shadow-xl' : 'hover:bg-gray-900/50'
                        } transition-colors`}
                      >
                        <div className="col-span-1 text-gray-600" {...provided.dragHandleProps}>
                          <GripVertical className="w-5 h-5 cursor-grab" />
                        </div>
                        
                        <div className="col-span-5 flex items-center gap-4">
                          <div className="w-16 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{project.title}</p>
                            <p className="text-xs text-gray-500">{project.category} / {project.year}</p>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <button
                            onClick={() => updateProject(project.id, { published: !project.published })}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
                              project.published 
                                ? 'border-green-500/20 text-green-500 bg-green-500/10' 
                                : 'border-gray-700 text-gray-400 bg-gray-800'
                            }`}
                          >
                            {project.published ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {project.published ? 'Published' : 'Draft'}
                          </button>
                        </div>

                        <div className="col-span-2">
                          <button
                            onClick={() => updateProject(project.id, { featured: !project.featured })}
                            className={`p-1.5 rounded transition-colors ${
                              project.featured ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-600 hover:bg-gray-800 hover:text-gray-300'
                            }`}
                          >
                            <Star className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="col-span-2 flex justify-end gap-2">
                          <Link
                            to={`/admin/projects/${project.id}`}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => duplicateProject(project.id)}
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if(window.confirm('Are you sure you want to delete this project?')) {
                                deleteProject(project.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
