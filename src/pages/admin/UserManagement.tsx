import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { UserProfile } from '../../types';
import { User, Mail, Building, Phone, Plus, Trash2, Search, CheckCircle2, Shield, Bookmark, MessageSquare, X } from 'lucide-react';

export default function UserManagement() {
  const { users, inquiries, addUser, deleteUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<'client' | 'admin' | 'collaborator'>('client');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.company && u.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    addUser({
      name: newName,
      email: newEmail,
      company: newCompany,
      phone: newPhone,
      role: newRole,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200`,
      savedProjects: [],
      notificationsEnabled: true,
      status: 'active'
    });

    setNewName('');
    setNewEmail('');
    setNewCompany('');
    setNewPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase">User Management</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage client accounts, collaborator permissions, moodboards, and commission communications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-cinema-black border border-gray-800 p-5 rounded-lg">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Total Accounts</p>
          <p className="text-3xl font-serif text-white mt-1">{users.length}</p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-5 rounded-lg">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Verified Clients</p>
          <p className="text-3xl font-serif text-white mt-1">
            {users.filter(u => u.role === 'client').length}
          </p>
        </div>
        <div className="bg-cinema-black border border-gray-800 p-5 rounded-lg">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Total Inquiries Submitted</p>
          <p className="text-3xl font-serif text-cinema-red mt-1">{inquiries.length}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search clients by name, email, or company..."
          className="w-full bg-cinema-black border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
        />
      </div>

      {/* Users Table / List */}
      <div className="bg-cinema-black border border-gray-800 rounded-xl overflow-hidden">
        <div className="divide-y divide-gray-800">
          {filteredUsers.map(user => {
            const userInquiryCount = inquiries.filter(i => i.userId === user.id).length;
            return (
              <div key={user.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-900/40 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-700 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">{user.name}</h3>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        user.role === 'admin'
                          ? 'bg-cinema-red/10 text-cinema-red border border-cinema-red/30'
                          : user.role === 'collaborator'
                            ? 'bg-blue-950/40 text-blue-400 border border-blue-800'
                            : 'bg-gray-900 text-gray-400 border border-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        {user.email}
                      </span>
                      {user.company && (
                        <span className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-gray-500" />
                          {user.company}
                        </span>
                      )}
                      {user.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-500" />
                          {user.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="text-center">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Inquiries</span>
                      <span className="font-bold text-white font-mono">{userInquiryCount}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Moodboard</span>
                      <span className="font-bold text-white font-mono">{user.savedProjects.length}</span>
                    </div>
                  </div>

                  {users.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete user ${user.name}?`)) {
                          deleteUser(user.id);
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-900 rounded transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-cinema-black border border-gray-800 rounded-xl max-w-lg w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <h3 className="text-lg font-serif text-white uppercase tracking-wider">Add Client Account</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="elena@company.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={e => setNewCompany(e.target.value)}
                    placeholder="Studio / Brand"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="+1 ..."
                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                  Role
                </label>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs text-white focus:border-cinema-red outline-none"
                >
                  <option value="client">Client</option>
                  <option value="collaborator">Collaborator</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-900 text-gray-400 hover:text-white rounded text-xs uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 text-xs uppercase font-bold"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
