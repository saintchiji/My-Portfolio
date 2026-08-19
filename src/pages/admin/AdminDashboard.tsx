import { useProjects } from '../../context/ProjectContext';
import { Film, Eye, Star } from 'lucide-react';

export default function AdminDashboard() {
  const { projects } = useProjects();
  
  const publishedCount = projects.filter(p => p.published).length;
  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div>
      <h1 className="text-3xl font-serif text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Projects</h3>
            <Film className="w-5 h-5 text-cinema-red" />
          </div>
          <p className="text-4xl font-light text-white">{projects.length}</p>
        </div>
        
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Published</h3>
            <Eye className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-4xl font-light text-white">{publishedCount}</p>
        </div>
        
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Featured</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-4xl font-light text-white">{featuredCount}</p>
        </div>
      </div>
      
      <div className="bg-cinema-black border border-gray-800 rounded-lg p-6">
        <h3 className="text-xl text-white mb-6">Recent Projects</h3>
        <div className="space-y-4">
          {projects.slice(0, 5).map(project => (
            <div key={project.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-gray-800 rounded overflow-hidden">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{project.title}</h4>
                  <p className="text-xs text-gray-500">{project.category}</p>
                </div>
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${project.published ? 'bg-green-500/10 text-green-500' : 'bg-gray-800 text-gray-400'}`}>
                  {project.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
