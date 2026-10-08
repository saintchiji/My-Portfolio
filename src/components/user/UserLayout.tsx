import { Outlet, NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useBranding } from '../../context/BrandingContext';
import { useContent } from '../../context/ContentContext';
import { useUser } from '../../context/UserContext';
import MediaImage from '../MediaImage';
import { 
  Bookmark, 
  MessageSquare, 
  User, 
  ExternalLink, 
  LogOut, 
  Menu as MenuIcon, 
  X,
  Compass,
  Bell
} from 'lucide-react';

export default function UserLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { branding } = useBranding();
  const { content } = useContent();
  const { currentUser } = useUser();

  const brandName = branding.logoMark || content.branding?.logoText || 'VXN';
  const logoMode = branding.logoMode || 'text';

  const navItems = [
    { name: 'My Moodboard', path: '/dashboard', icon: Bookmark, exact: true },
    { name: 'My Inquiries & Quotes', path: '/dashboard/inquiries', icon: MessageSquare, exact: false },
    { name: 'Profile & Settings', path: '/dashboard/profile', icon: User, exact: false },
  ];

  return (
    <div className="min-h-screen bg-cinema-dark text-gray-200 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-cinema-black border-b border-gray-800 z-50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          {logoMode === 'image' && branding.primaryLogo ? (
            <MediaImage
              src={branding.primaryLogo}
              alt={brandName}
              style={{ width: `${Math.min(branding.mobileLogoWidth || 80, 100)}px` }}
              className="object-contain max-h-8"
            />
          ) : (
            <span className="font-serif text-lg tracking-widest text-white">
              {brandName}
            </span>
          )}
          <span className="text-[10px] uppercase font-sans tracking-widest bg-gray-900 border border-gray-800 text-gray-400 px-2 py-0.5 rounded">
            Client Portal
          </span>
        </Link>

        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/70 z-40" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-72 bg-cinema-black border-r border-gray-800 
        flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Area */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-3">
            {logoMode === 'image' && branding.primaryLogo ? (
              <MediaImage
                src={branding.primaryLogo}
                alt={brandName}
                style={{ width: `${Math.min(branding.logoWidth || 120, 140)}px` }}
                className="object-contain max-h-10"
              />
            ) : (
              <span className="font-serif text-2xl tracking-widest text-white">
                {brandName.length > 2 ? (
                  <>{brandName.slice(0, 1)}<span className="text-cinema-red">{brandName.slice(1, 2)}</span>{brandName.slice(2)}</>
                ) : (
                  brandName
                )}
              </span>
            )}
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
              Client & Creator Portal
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Connected" />
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="p-5 border-b border-gray-800/80 bg-gray-950/40">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-700"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-white truncate">{currentUser.name}</h3>
              <p className="text-xs text-gray-400 truncate">{currentUser.company || currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
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

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-800 bg-cinema-black space-y-2">
          <Link
            to="/work"
            className="flex items-center justify-between px-4 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white rounded text-xs uppercase tracking-wider font-bold transition-colors"
          >
            <span className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cinema-red" />
              <span>Explore Work</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen mt-16 md:mt-0">
        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
