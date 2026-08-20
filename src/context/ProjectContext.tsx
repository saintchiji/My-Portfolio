import React, { createContext, useContext, ReactNode } from 'react';
import { Project } from '../types';
import { projects as initialData } from '../data';
import { useDatabase } from './DatabaseContext';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'order'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { activeConfig, updateDraft } = useDatabase();
  
  // Use config from DB, or fallback to initial if waiting
  const projects = activeConfig?.projects || initialData;

  const addProject = (projectData: Omit<Project, 'id' | 'order'>) => {
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      order: projects.length,
    };
    updateDraft('projects', [...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateDraft('projects', projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    updateDraft('projects', projects.filter(p => p.id !== id));
  };

  const duplicateProject = (id: string) => {
    const projectToCopy = projects.find(p => p.id === id);
    if (!projectToCopy) return;
    const newProject: Project = {
      ...projectToCopy,
      id: crypto.randomUUID(),
      title: `${projectToCopy.title} (Copy)`,
      order: projects.length,
    };
    updateDraft('projects', [...projects, newProject]);
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    const result = Array.from(projects);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const updated = result.map((p, index) => ({ ...p, order: index }));
    updateDraft('projects', updated);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      duplicateProject,
      reorderProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
