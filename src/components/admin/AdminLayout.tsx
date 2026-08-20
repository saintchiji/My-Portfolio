import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

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
      <main className="flex-1 md:ml-64 p-6 md:p-8 mt-16 md:mt-0 transition-all w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
