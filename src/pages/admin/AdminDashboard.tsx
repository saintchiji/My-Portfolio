import { Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';
import { Plus, Settings, Layers, MessageSquare, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { projects } = useProjects();
  
  const totalProjects = projects.length;
  const publishedProjects = projects.filter(p => p.published).length;
  const draftProjects = projects.filter(p => !p.published).length;
  const featuredProjects = projects.filter(p => p.featured).length;
  // We'll mock inquiries count for now until the context is implemented
  const unreadInquiries = 0; 

  const recentProjects = [...projects]
    .sort((a, b) => b.year.localeCompare(a.year))
    .slice(0, 3);

  return (
    <div className="p-2 md:p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg flex flex-col justify-between h-32">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Total Projects</p>
          <p className="text-4xl font-serif text-white">{totalProjects}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg flex flex-col justify-between h-32">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Published</p>
          <p className="text-4xl font-serif text-white">{publishedProjects}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg flex flex-col justify-between h-32">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Drafts</p>
          <p className="text-4xl font-serif text-white">{draftProjects}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg flex flex-col justify-between h-32">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Featured</p>
          <p className="text-4xl font-serif text-white">{featuredProjects}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg flex flex-col justify-between h-32">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            Unread Inquiries
            {unreadInquiries > 0 && <span className="w-2 h-2 rounded-full bg-cinema-red animate-pulse"></span>}
          </p>
          <p className="text-4xl font-serif text-cinema-red">{unreadInquiries}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Recent Projects */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Projects</h2>
          <div className="bg-cinema-black border border-gray-800 rounded-lg overflow-hidden">
            {recentProjects.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {recentProjects.map(project => (
                  <div key={project.id} className="flex items-center gap-4 p-4 hover:bg-gray-900 transition-colors">
                    <div className="w-20 h-14 bg-gray-800 flex-shrink-0 rounded overflow-hidden">
                      {project.imageUrl && (
                        <img src={project.imageUrl.startsWith('idb://') ? '#' : project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{project.title}</h3>
                      <p className="text-xs text-gray-500 truncate">{project.category || 'Uncategorized'} • {project.year}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold ${project.published ? 'bg-green-900/30 text-green-500' : 'bg-gray-800 text-gray-400'}`}>
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                      <Link to={`/admin/projects/${project.id}`} className="text-xs font-bold text-cinema-red uppercase tracking-wider hover:text-white transition-colors">
                        Edit
                      </Link>
                    </div>
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

          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-8">Recent Activity</h2>
          <div className="bg-cinema-black border border-gray-800 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-800">
               <div className="flex items-center gap-4 p-4">
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">Admin dashboard initialized.</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Just now</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link to="/admin/projects/new" className="flex items-center gap-4 p-4 bg-cinema-black border border-gray-800 rounded-lg hover:border-cinema-red hover:bg-gray-900 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-gray-900 group-hover:bg-cinema-red/10 flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-cinema-red" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-wider">New Project</span>
            </Link>
            
            <Link to="/admin/pages" className="flex items-center gap-4 p-4 bg-cinema-black border border-gray-800 rounded-lg hover:border-cinema-red hover:bg-gray-900 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-gray-900 group-hover:bg-cinema-red/10 flex items-center justify-center transition-colors">
                <Layers className="w-5 h-5 text-gray-400 group-hover:text-cinema-red" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-wider">Edit Homepage</span>
            </Link>

            <Link to="/admin/inquiries" className="flex items-center gap-4 p-4 bg-cinema-black border border-gray-800 rounded-lg hover:border-cinema-red hover:bg-gray-900 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-gray-900 group-hover:bg-cinema-red/10 flex items-center justify-center transition-colors">
                <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-cinema-red" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-wider">View Inquiries</span>
            </Link>

            <Link to="/admin/settings" className="flex items-center gap-4 p-4 bg-cinema-black border border-gray-800 rounded-lg hover:border-cinema-red hover:bg-gray-900 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-gray-900 group-hover:bg-cinema-red/10 flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5 text-gray-400 group-hover:text-cinema-red" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-wider">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
