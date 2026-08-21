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
      provider: 'vimeo',
      previewUrl: ''
    },
    featured: false,
    year: new Date().getFullYear().toString(),
    client: '',
    description: '',
    published: false,
    tags: []
  });

  const [rolesInput, setRolesInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (!isNew && existingProject) {
      setFormData(existingProject);
      setRolesInput(existingProject.roles.join(', '));
      setTagsInput(existingProject.tags.join(', '));
    } else if (!isNew && !existingProject) {
      navigate('/admin/projects');
    }
  }, [id, isNew, existingProject, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('video.')) {
      const videoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        video: { ...prev.video, [videoField]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse comma-separated inputs
    const finalData = {
      ...formData,
      roles: rolesInput.split(',').map(s => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (isNew) {
      addProject(finalData);
    } else if (id) {
      updateProject(id, finalData);
    }
    
    navigate('/admin/projects');
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/projects" className="p-2 text-gray-400 hover:text-white bg-cinema-black hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif text-white">{isNew ? 'New Project' : 'Edit Project'}</h1>
        </div>
        <div className="flex items-center gap-3">
          {!isNew && (
            <button
              type="button"
              onClick={() => {
                if(window.confirm('Are you sure you want to delete this project?')) {
                  if (id) deleteProject(id);
                  navigate('/admin/projects');
                }
              }}
              className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded border border-red-500/20 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="bg-cinema-red hover:bg-cinema-red-light text-white px-6 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Details */}
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl text-white font-medium mb-4">Core Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client (Optional)</label>
              <input type="text" name="client" value={formData.client || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category (Optional)</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors">
                <option value="">Select Category</option>
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
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Year</label>
              <input required type="text" name="year" value={formData.year} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors resize-none" />
          </div>
        </div>

        {/* Media & URLs */}
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl text-white font-medium mb-4">Media</h2>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thumbnail Image URL</label>
            <MediaSelector 
              type="image" 
              value={formData.imageUrl} 
              onChange={val => setFormData(prev => ({ ...prev, imageUrl: val }))} 
            />
            {formData.imageUrl && (
              <div className="mt-2 w-32 h-20 rounded bg-gray-800 overflow-hidden border border-gray-700">
                <img src={formData.imageUrl.startsWith('idb://') ? '#' : formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Main Video Provider</label>
              <select name="video.provider" value={formData.video.provider} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors">
                <option value="vimeo">Vimeo</option>
                <option value="youtube">YouTube</option>
                <option value="google_drive">Google Drive</option>
                <option value="direct">Direct Upload / MP4 URL</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Main Video URL</label>
              <MediaSelector 
                type="video" 
                value={formData.video.url} 
                onChange={(val) => {
                  const isGoogleDrive = val.includes('drive.google.com') || val.includes('docs.google.com');
                  setFormData(prev => ({
                    ...prev,
                    video: {
                      ...prev.video,
                      url: val,
                      provider: isGoogleDrive ? 'google_drive' : prev.video.provider,
                      googleDriveFileId: isGoogleDrive ? parseGoogleDriveUrl(val) : prev.video.googleDriveFileId
                    }
                  }));
                }} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hover Preview MP4 URL (Optional)</label>
            <MediaSelector 
              type="video" 
              value={formData.video.previewUrl || ''} 
              onChange={val => setFormData(prev => ({ ...prev, video: { ...prev.video, previewUrl: val } }))} 
            />
            <p className="text-[10px] text-gray-500">A short, silent, looping MP4 file used when users hover over the project card.</p>
          </div>
        </div>

        {/* Metadata & Status */}
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl text-white font-medium mb-4">Metadata & Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Roles (Comma Separated)</label>
              <input type="text" value={rolesInput} onChange={(e) => setRolesInput(e.target.value)} placeholder="Cinematography, Direction..." className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tags (Comma Separated)</label>
              <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Neo-noir, Action..." className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cinema-red outline-none transition-colors" />
            </div>
          </div>

          <div className="flex gap-8 border-t border-gray-800 pt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="sr-only" />
                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.published ? 'bg-cinema-red' : 'bg-gray-700'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.published ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Display on Work Page</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="sr-only" />
                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.featured ? 'bg-cinema-red' : 'bg-gray-700'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.featured ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Featured Project</span>
            </label>
          </div>
        </div>

      </form>
    </div>
  );
}
