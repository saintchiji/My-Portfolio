import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useBranding } from '../../context/BrandingContext';
import { useContent } from '../../context/ContentContext';
import { 
  LayoutDashboard, 
  Film, 
  Layers, 
  Tv,
  LogOut,
  X,
  Menu as MenuIcon, 
  MessageSquare, 
  Tags, 
  Briefcase, 
  Brush, 
  Palette, 
  Navigation as NavigationIcon, 
  Share2,
  Users
} from 'lucide-react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { branding } = useBranding();
  const { content } = useContent();

  const brandName = branding.logoMark || content.branding?.logoText || 'VXN';

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Hero Section', path: '/admin/hero', icon: Tv },
    { name: 'Website Branding', path: '/admin/branding', icon: Brush },
    { name: 'Projects', path: '/admin/projects', icon: Film },
    { name: 'Page Builder', path: '/admin/pages', icon: Layers },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Theme', path: '/admin/theme', icon: Palette },
    { name: 'Navigation', path: '/admin/navigation', icon: NavigationIcon },
    { name: 'Social Media', path: '/admin/social', icon: Share2 },
    { name: 'Contact & Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  const renderBrand = () => {
    if (brandName.length > 2) {
      return (
        <span className="font-serif text-xl text-white tracking-widest">
          {brandName.slice(0, 1)}
          <span className="text-cinema-red">{brandName.slice(1, 2)}</span>
          {brandName.slice(2)}
        </span>
      );
    }
    return <span className="font-serif text-xl text-white tracking-widest">{brandName}</span>;
  };

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-cinema-black border-b border-gray-800 z-50 flex items-center justify-between px-4">
        <div className="flex items-center">
          {renderBrand()}
          <span className="text-gray-500 text-[10px] ml-2 uppercase font-sans font-bold">Admin</span>
        </div>
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
          <div className="flex items-center">
            {renderBrand()}
            <span className="text-gray-500 text-[10px] ml-2 uppercase font-sans font-bold">Admin</span>
          </div>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto mt-16 md:mt-0">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive 
                    ? 'bg-cinema-red/10 text-cinema-red-light border-l-2 border-cinema-red' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 bg-cinema-black space-y-2">
          <NavLink 
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Admin</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
