import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { User, Mail, Building, Phone, Bell, Save, Check } from 'lucide-react';

export default function UserProfile() {
  const { currentUser, updateCurrentUser } = useUser();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [company, setCompany] = useState(currentUser.company || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [notifications, setNotifications] = useState(currentUser.notificationsEnabled);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      company,
      phone,
      notificationsEnabled: notifications
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Client Profile & Preferences</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your contact credentials, company details, and project notifications.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-green-950/60 border border-green-800 rounded-lg text-green-300 text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Profile settings updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-cinema-black border border-gray-800 rounded-xl p-6 md:p-8 space-y-8">
        {/* Avatar & Role Header */}
        <div className="flex items-center gap-5 border-b border-gray-800 pb-6">
          <img
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-cinema-red/10 text-cinema-red border border-cinema-red/30 px-2 py-0.5 rounded">
                {currentUser.role}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                Member since {new Date(currentUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
              Company / Organization
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Apex Media Group"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="pt-6 border-t border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-cinema-red" />
            <span>Notification Preferences</span>
          </h3>

          <label className="flex items-center gap-3 p-3 bg-gray-950/60 rounded-lg border border-gray-800 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              className="accent-cinema-red h-4 w-4 rounded"
            />
            <div>
              <span className="text-xs font-bold text-white block">Email notifications for inquiry status changes</span>
              <span className="text-[11px] text-gray-500">Receive alerts when a proposal is updated, reviewed, or approved.</span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary px-7 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}
