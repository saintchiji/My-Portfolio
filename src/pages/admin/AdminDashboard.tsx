import { Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';
import { Plus, Settings, Layers } from 'lucide-react';

export default function AdminDashboard() {
  const { projects } = useProjects();
  
  const totalProjects = projects.length;
  const publishedProjects = projects.filter(p => p.published).length;
  const draftProjects = projects.filter(p => !p.published).length;
  const featuredProjects = projects.filter(p => p.featured).length;

  const recentProjects = [...projects]
    .sort((a, b) => b.year.localeCompare(a.year))
    .slice(0, 3);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-serif text-white tracking-widest uppercase mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2">Total Projects</p>
          <p className="text-4xl font-serif text-white">{totalProjects}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2">Published</p>
          <p className="text-4xl font-serif text-white">{publishedProjects}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2">Drafts</p>
          <p className="text-4xl font-serif text-white">{draftProjects}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2">Featured</p>
          <p className="text-4xl font-serif text-cinema-red">{featuredProjects}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2">Recent Projects</h2>
          <div className="bg-cinema-black border border-gray-800 rounded-lg overflow-hidden">
            {recentProjects.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {recentProjects.map(project => (
                  <div key={project.id} className="flex items-center gap-4 p-4 hover:bg-gray-900 transition-colors">
                    <div className="w-16 h-12 bg-gray-800 flex-shrink-0">
                      {project.imageUrl && (
                        <img src={project.imageUrl.startsWith('idb://') ? '#' : project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{project.title}</h3>
                      <p className="text-xs text-gray-500">{project.category || 'Uncategorized'} • {project.year}</p>
                    </div>
                    <Link to={`/admin/projects/${project.id}`} className="text-xs font-bold text-cinema-red uppercase tracking-wider hover:text-white transition-colors">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                No projects yet.
              </div>
            )}
            <Link to="/admin/projects" className="block w-full text-center p-4 text-xs font-bold text-gray-400 uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors bg-black/50 border-t border-gray-800">
              View All Projects
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/projects/new" className="flex items-center gap-3 p-4 bg-cinema-black border border-gray-800 rounded-lg hover:border-cinema-red transition-colors group">
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-cinema-red" />
              <span className="text-sm font-medium text-white uppercase tracking-wider">New Project</span>
            </Link>
            <Link to="/admin/pages" className="flex items-center gap-3 p-4 bg-cinema-black border border-gray-800 rounded-lg hover:border-cinema-red transition-colors group">
              <Layers className="w-5 h-5 text-gray-400 group-hover:text-cinema-red" />
              <span className="text-sm font-medium text-white uppercase tracking-wider">Edit Homepage</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 p-4 bg-cinema-black border border-gray-800 rounded-lg hover:border-cinema-red transition-colors group">
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-cinema-red" />
              <span className="text-sm font-medium text-white uppercase tracking-wider">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
