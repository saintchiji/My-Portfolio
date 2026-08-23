import { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Project, VideoProvider } from '../../types';
import MediaSelector from '../../components/admin/MediaSelector';

function parseGoogleDriveUrl(url: string) {
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : undefined;
}

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  
  const isNew = id === 'new';
  const existingProject = projects.find(p => p.id === id);

  const [formData, setFormData] = useState<Omit<Project, 'id' | 'order'>>({
    title: '',
    category: 'Commercial',
    roles: [],
    format: 'Short-form',
    imageUrl: '',
    video: {
      url: '',
      provider: 'youtube',
      previewUrl: ''
    },
    featured: false,
    displayOnWork: true,
    year: new Date().getFullYear().toString(),
    client: '',
    description: '',
    published: false,
    tags: []
  });

  useEffect(() => {
    if (existingProject) {
      setFormData({
        title: existingProject.title || '',
        category: existingProject.category || 'Commercial',
        roles: existingProject.roles || [],
        format: existingProject.format || 'Short-form',
        imageUrl: existingProject.imageUrl || '',
        video: existingProject.video || { url: '', provider: 'youtube' },
        featured: existingProject.featured || false,
        displayOnWork: existingProject.displayOnWork ?? true,
        year: existingProject.year || new Date().getFullYear().toString(),
        client: existingProject.client || '',
        description: existingProject.description || '',
        published: existingProject.published || false,
        tags: existingProject.tags || []
      });
    }
  }, [existingProject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('video.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        video: { ...prev.video, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      addProject(formData);
    } else if (id) {
      updateProject(id, formData);
    }
    navigate('/admin/projects');
  };

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      navigate('/admin/projects');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/projects" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">
            {isNew ? 'New Project' : 'Edit Project'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="published" 
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4 accent-cinema-red"
            />
            <label htmlFor="published" className="text-xs uppercase tracking-widest font-bold text-gray-400 cursor-pointer">
              Published
            </label>
          </div>
          {!isNew && (
            <button 
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-cinema-red transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={handleSubmit}
            className="btn-primary px-6 py-2 uppercase tracking-widest text-xs font-semibold flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Information */}
        <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-6">
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Core Information</h2>
          
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Project Title *</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors"
              placeholder="e.g. Neon Nights"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors"
              >
                <option value="Long-Form">Long-Form</option>
                <option value="Short-Form">Short-Form</option>
                <option value="Commercial">Commercial</option>
                <option value="Wedding">Wedding</option>
                <option value="Cinematography">Cinematography</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Music Video">Music Video</option>
                <option value="Documentary">Documentary</option>
                <option value="Fashion">Fashion</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Year</label>
              <input 
                type="text" 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors"
                placeholder="e.g. 2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={4}
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors resize-none"
              placeholder="Brief description of the project..."
            />
          </div>
        </div>

        {/* Media */}
        <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-6">
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Media</h2>
          
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Project Thumbnail (Required)</label>
            <MediaSelector 
              type="image" 
              value={formData.imageUrl} 
              onChange={val => setFormData(prev => ({ ...prev, imageUrl: val }))} 
            />
          </div>

          <div className="grid grid-cols-1 gap-6 pt-6 border-t border-gray-800">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Main Video Provider</label>
              <select name="video.provider" value={formData.video.provider} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors">
                <option value="youtube">YouTube</option>
                <option value="google_drive">Google Drive</option>
                <option value="direct">Direct Upload / MP4 URL</option>
                <option value="vimeo">Vimeo</option>
              </select>
            </div>
            
            {formData.video.provider === 'youtube' || formData.video.provider === 'vimeo' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Video URL</label>
                <input 
                  type="text" 
                  value={formData.video.url}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      video: { ...prev.video, url: e.target.value }
                    }));
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors"
                />
              </div>
            ) : formData.video.provider === 'google_drive' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Google Drive URL</label>
                <input 
                  type="text" 
                  value={formData.video.url}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      video: {
                        ...prev.video,
                        url: val,
                        googleDriveFileId: parseGoogleDriveUrl(val)
                      }
                    }));
                  }}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors"
                />
                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-1">Google Drive video cannot be accessed unless you set the file to "Anyone with the link → Viewer".</p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Direct Video</label>
                <MediaSelector 
                  type="video" 
                  value={formData.video.url} 
                  onChange={(val) => {
                    setFormData(prev => ({
                      ...prev,
                      video: { ...prev.video, url: val }
                    }));
                  }} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Visibility Controls */}
        <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg space-y-6">
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Visibility Controls</h2>
          
          <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded">
            <div>
              <p className="text-white font-bold text-sm uppercase tracking-wider">Featured Project</p>
              <p className="text-xs text-gray-500">Display this project in the Featured section on the homepage.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="featured" 
                checked={formData.featured} 
                onChange={handleChange} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cinema-red"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded">
            <div>
              <p className="text-white font-bold text-sm uppercase tracking-wider">Display on Work Page</p>
              <p className="text-xs text-gray-500">Allow this project to appear in the public portfolio gallery.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="displayOnWork" 
                checked={formData.displayOnWork} 
                onChange={handleChange} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cinema-red"></div>
            </label>
          </div>
        </div>
        
      </form>
    </div>
  );
}
