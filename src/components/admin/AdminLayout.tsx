import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Lock, Save, Eye, UploadCloud, AlertCircle, RotateCcw } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { publish, isPublishing, draftConfig, publishedConfig, restorePublished, saveDraft, hasUnsavedChanges } = useDatabase();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === correctPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center p-4">
        <div className="bg-cinema-dark border border-gray-800 p-8 rounded-lg max-w-md w-full shadow-2xl text-center">
          <div className="w-12 h-12 bg-cinema-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-cinema-red" />
          </div>
          <h2 className="text-2xl font-serif text-white mb-2">Admin Access</h2>
          <p className="text-sm text-gray-400 mb-8">Please enter the administrative password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none transition-colors text-center"
                autoFocus
              />
              {error && <p className="text-cinema-red text-xs mt-2 text-left">Incorrect password. Please try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-3 uppercase tracking-widest text-xs font-semibold"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-dark flex">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all w-full overflow-x-hidden">
        
        {/* Top Action Bar */}
        <header className="sticky top-0 z-40 bg-cinema-black border-b border-gray-800 px-6 py-4 flex items-center justify-between md:flex-row flex-col gap-4 mt-16 md:mt-0">
          <div className="flex items-center gap-3">
            {hasUnsavedChanges ? (
              <span className="text-yellow-500 text-sm flex items-center gap-2 font-medium">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                UNSAVED CHANGES
              </span>
            ) : (
              <span className="text-gray-500 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Draft Saved
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {publishedConfig && hasUnsavedChanges && (
              <button 
                onClick={async () => {
                  if (confirm('Discard drafts and revert to the published live version?')) {
                    await restorePublished();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700 rounded text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
                title="Discard unsaved draft changes"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Revert
              </button>
            )}

            <button 
              onClick={saveDraft}
              disabled={!hasUnsavedChanges}
              className={`flex items-center gap-2 px-4 py-2 border rounded text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                hasUnsavedChanges ? 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600' : 'bg-gray-900 text-gray-500 border-gray-800 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              Save Now
            </button>
            <a 
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 rounded text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
            >
              <Eye className="w-4 h-4" />
              Preview Site
            </a>
            <button 
              onClick={publish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-4 py-2 bg-cinema-red hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <UploadCloud className="w-4 h-4" />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
