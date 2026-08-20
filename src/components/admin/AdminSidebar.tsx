import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Film, 
  Tags, 
  Layers, 
  Image as ImageIcon, 
  Palette, 
  Menu as MenuIcon, 
  Settings,
  LogOut,
  X,
  FileText,
  UploadCloud
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { publish, isPublishing } = useDatabase();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Film },
    { name: 'Sections', path: '/admin/sections', icon: Layers },
    { name: 'Site Content', path: '/admin/content', icon: FileText },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Branding', path: '/admin/branding', icon: Palette },
    { name: 'Theme', path: '/admin/theme', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-cinema-black border-b border-gray-800 z-50 flex items-center justify-between px-4">
        <h2 className="font-serif text-xl text-white tracking-widest">
          V<span className="text-cinema-red">X</span>N <span className="text-gray-500 text-xs ml-2 uppercase font-sans">Admin</span>
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-cinema-black border-r border-gray-800 
        flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-800 hidden md:block">
          <h2 className="font-serif text-xl text-white tracking-widest">
            V<span className="text-cinema-red">X</span>N <span className="text-gray-500 text-xs ml-2 uppercase font-sans">Admin</span>
          </h2>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto mt-16 md:mt-0">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-cinema-red/10 text-cinema-red-light' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 bg-cinema-black space-y-2">
          <button
            onClick={publish}
            disabled={isPublishing}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-bold text-white bg-cinema-red hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <UploadCloud className="w-5 h-5" />
            {isPublishing ? 'PUBLISHING...' : 'PUBLISH CHANGES'}
          </button>
          <NavLink 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Exit Admin
          </NavLink>
        </div>
      </aside>
    </>
  );
}
