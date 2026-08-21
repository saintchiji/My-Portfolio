import { useProjects } from '../../context/ProjectContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, GripVertical, CheckCircle2, Circle, Star } from 'lucide-react';
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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Projects</h1>
        <Link 
          to="/admin/projects/new"
          className="btn-primary px-6 py-2 uppercase tracking-widest text-xs font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="bg-cinema-black border border-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50">
          <div className="col-span-1"></div>
          <div className="col-span-4">Project</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sortedProjects.length === 0 ? (
                  <div className="p-12 text-center text-gray-500 text-sm">
                    No projects found.
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
                        <div className="col-span-1 flex items-center text-gray-600" {...provided.dragHandleProps}>
                          <GripVertical className="w-5 h-5 cursor-grab" />
                        </div>
                        
                        <div className="col-span-4 flex items-center gap-4">
                          <div className="w-16 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0 border border-gray-700">
                            {project.imageUrl && (
                              <img src={project.imageUrl.startsWith('idb://') ? '#' : project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium truncate">{project.title}</p>
                            {project.featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-cinema-red mt-1">
                                <Star className="w-3 h-3 fill-current" /> Featured
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2 text-sm text-gray-400 truncate">
                          {project.category || '-'}
                        </div>

                        <div className="col-span-1 text-sm text-gray-400">
                          {project.year}
                        </div>

                        <div className="col-span-2">
                          <button
                            onClick={() => updateProject(project.id, { published: !project.published })}
                            className="flex items-center gap-2 group"
                          >
                            {project.published ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                            )}
                            <span className={`text-xs uppercase tracking-wider ${project.published ? 'text-green-500' : 'text-gray-500 group-hover:text-gray-400'}`}>
                              {project.published ? 'Published' : 'Draft'}
                            </span>
                          </button>
                        </div>

                        <div className="col-span-2 flex items-center justify-end gap-4 text-xs font-bold uppercase tracking-wider">
                          <Link to={`/admin/projects/${project.id}`} className="text-white hover:text-cinema-red transition-colors">
                            Edit
                          </Link>
                          <button 
                            onClick={() => duplicateProject(project.id)}
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            Duplicate
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this project?')) {
                                deleteProject(project.id);
                              }
                            }}
                            className="text-gray-500 hover:text-cinema-red transition-colors"
                          >
                            Delete
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
