import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '../types';
import { projects as initialData } from '../data';

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
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('cinematic-portfolio-projects-v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('cinematic-portfolio-projects-v2', JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id' | 'order'>) => {
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      order: projects.length,
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
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
    setProjects(prev => [...prev, newProject]);
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setProjects(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      // Update order property
      return result.map((p, index) => ({ ...p, order: index }));
    });
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
