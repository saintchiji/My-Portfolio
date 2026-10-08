import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ClientInquiry } from '../types';
import { useDatabase } from './DatabaseContext';

interface UserContextType {
  currentUser: UserProfile;
  users: UserProfile[];
  inquiries: ClientInquiry[];
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  toggleSavedProject: (projectId: string) => void;
  isProjectSaved: (projectId: string) => boolean;
  submitInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'userId' | 'userEmail' | 'userName' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (inquiryId: string, status: ClientInquiry['status'], notes?: string) => void;
  addUser: (user: Omit<UserProfile, 'id' | 'createdAt' | 'lastActive'>) => void;
  deleteUser: (userId: string) => void;
}

const defaultUser: UserProfile = {
  id: 'usr-client-1',
  name: 'Alex Vance',
  email: 'alex.vance@apexfilms.com',
  company: 'Apex Media Group',
  phone: '+1 (555) 234-5678',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  role: 'client',
  savedProjects: ['proj-1', 'proj-3'], // default saved items
  createdAt: '2026-01-15T10:00:00Z',
  lastActive: 'Just now',
  notificationsEnabled: true,
  status: 'active'
};

const defaultUsersList: UserProfile[] = [
  defaultUser,
  {
    id: 'usr-client-2',
    name: 'Sophia Chen',
    email: 'sophia@novacreative.io',
    company: 'Nova Creative',
    phone: '+44 20 7946 0912',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    role: 'client',
    savedProjects: ['proj-2'],
    createdAt: '2026-02-10T14:30:00Z',
    lastActive: '2 days ago',
    notificationsEnabled: true,
    status: 'active'
  },
  {
    id: 'usr-client-3',
    name: 'Marcus Brody',
    email: 'marcus@brodyfilms.com',
    company: 'Brody Cinematic Productions',
    phone: '+1 (555) 876-5432',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'collaborator',
    savedProjects: [],
    createdAt: '2026-03-01T09:15:00Z',
    lastActive: '1 week ago',
    notificationsEnabled: false,
    status: 'active'
  }
];

const defaultInquiries: ClientInquiry[] = [
  {
    id: 'inq-101',
    userId: 'usr-client-1',
    userEmail: 'alex.vance@apexfilms.com',
    userName: 'Alex Vance',
    projectType: 'Commercial Campaign',
    budget: '$25,000 - $50,000',
    deadline: 'Q4 2026',
    description: 'Looking for a cinematic director and full-service production for our new European launch.',
    status: 'proposal_sent',
    createdAt: '2026-03-28T11:20:00Z',
    notes: 'Proposal sent with director treatment and lighting breakdown.'
  },
  {
    id: 'inq-102',
    userId: 'usr-client-1',
    userEmail: 'alex.vance@apexfilms.com',
    userName: 'Alex Vance',
    projectType: 'Documentary Feature',
    budget: '$15,000 - $30,000',
    deadline: 'Q1 2027',
    description: 'Post-production and color grading on a 45-minute architectural documentary.',
    status: 'in_review',
    createdAt: '2026-04-02T16:45:00Z',
    notes: 'Reviewing footage samples and timeline feasibility.'
  },
  {
    id: 'inq-103',
    userId: 'usr-client-2',
    userEmail: 'sophia@novacreative.io',
    userName: 'Sophia Chen',
    projectType: 'Fashion Brand Film',
    budget: '$10,000 - $20,000',
    deadline: 'Next Month',
    description: 'High-concept fashion film shot on 35mm anamorphic.',
    status: 'in_production',
    createdAt: '2026-03-15T08:30:00Z',
    notes: 'Principal photography completed. In editorial.'
  }
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { activeConfig, updateDraft } = useDatabase();

  const users = activeConfig?.users && activeConfig.users.length > 0
    ? activeConfig.users
    : defaultUsersList;

  const inquiries = activeConfig?.inquiries && activeConfig.inquiries.length > 0
    ? activeConfig.inquiries
    : defaultInquiries;

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('vxn_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return defaultUser;
  });

  useEffect(() => {
    localStorage.setItem('vxn_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates };
      // Also update in list
      const updatedUsers = users.map(u => u.id === prev.id ? updated : u);
      updateDraft('users', updatedUsers);
      return updated;
    });
  };

  const toggleSavedProject = (projectId: string) => {
    setCurrentUser(prev => {
      const isSaved = prev.savedProjects.includes(projectId);
      const nextSaved = isSaved
        ? prev.savedProjects.filter(id => id !== projectId)
        : [...prev.savedProjects, projectId];
      const updated = { ...prev, savedProjects: nextSaved };
      const updatedUsers = users.map(u => u.id === prev.id ? updated : u);
      updateDraft('users', updatedUsers);
      return updated;
    });
  };

  const isProjectSaved = (projectId: string) => {
    return currentUser.savedProjects.includes(projectId);
  };

  const submitInquiry = (data: Omit<ClientInquiry, 'id' | 'userId' | 'userEmail' | 'userName' | 'createdAt' | 'status'>) => {
    const newInquiry: ClientInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    updateDraft('inquiries', [newInquiry, ...inquiries]);
  };

  const updateInquiryStatus = (inquiryId: string, status: ClientInquiry['status'], notes?: string) => {
    const updated = inquiries.map(inq => inq.id === inquiryId ? { ...inq, status, ...(notes !== undefined ? { notes } : {}) } : inq);
    updateDraft('inquiries', updated);
  };

  const addUser = (userData: Omit<UserProfile, 'id' | 'createdAt' | 'lastActive'>) => {
    const newUser: UserProfile = {
      ...userData,
      id: `usr-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      lastActive: 'Just now'
    };
    updateDraft('users', [...users, newUser]);
  };

  const deleteUser = (userId: string) => {
    updateDraft('users', users.filter(u => u.id !== userId));
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        inquiries,
        updateCurrentUser,
        toggleSavedProject,
        isProjectSaved,
        submitInquiry,
        updateInquiryStatus,
        addUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
