import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PageSection } from '../types';

interface SectionContextType {
  sections: PageSection[];
  addSection: (section: Omit<PageSection, 'id' | 'order'>) => void;
  updateSection: (id: string, updates: Partial<PageSection>) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
}

const initialSections: PageSection[] = [
  {
    id: 'hero-1',
    type: 'hero',
    title: 'CINEMATIC \nVISIONS',
    subtitle: 'Director & Cinematographer',
    layout: 'hero',
    background: 'transparent',
    spacing: 'normal',
    isHidden: false,
    projectSelection: { type: 'all', ids: [] },
    order: 0
  },
  {
    id: 'portfolio-1',
    type: 'portfolio',
    title: 'SELECTED WORK',
    subtitle: 'Portfolio',
    layout: 'cinematic-grid',
    background: 'transparent',
    spacing: 'loose',
    isHidden: false,
    projectSelection: { type: 'all', ids: [] },
    order: 1
  },
  {
    id: 'about-1',
    type: 'about-preview',
    title: 'WHO WE ARE',
    subtitle: 'About Us',
    layout: 'hero', // Layout is ignored for this block
    background: 'cinema-black',
    spacing: 'normal',
    isHidden: false,
    projectSelection: { type: 'all', ids: [] },
    order: 2
  },
  {
    id: 'services-1',
    type: 'services-preview',
    title: 'WHAT WE DO',
    subtitle: 'Capabilities',
    layout: 'hero', // Layout is ignored for this block
    background: 'transparent',
    spacing: 'normal',
    isHidden: false,
    projectSelection: { type: 'all', ids: [] },
    order: 3
  }
];

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<PageSection[]>(() => {
    const saved = localStorage.getItem('cinematic-portfolio-sections-v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved sections', e);
      }
    }
    return initialSections;
  });

  useEffect(() => {
    localStorage.setItem('cinematic-portfolio-sections-v2', JSON.stringify(sections));
  }, [sections]);

  const addSection = (sectionData: Omit<PageSection, 'id' | 'order'>) => {
    const newSection: PageSection = {
      ...sectionData,
      id: crypto.randomUUID(),
      order: sections.length,
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (id: string, updates: Partial<PageSection>) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const duplicateSection = (id: string) => {
    const sectionToCopy = sections.find(s => s.id === id);
    if (!sectionToCopy) return;

    const newSection: PageSection = {
      ...sectionToCopy,
      id: crypto.randomUUID(),
      title: `${sectionToCopy.title} (Copy)`,
      order: sections.length,
    };
    setSections(prev => [...prev, newSection]);
  };

  const reorderSections = (startIndex: number, endIndex: number) => {
    setSections(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((s, index) => ({ ...s, order: index }));
    });
  };

  return (
    <SectionContext.Provider value={{
      sections,
      addSection,
      updateSection,
      deleteSection,
      duplicateSection,
      reorderSections
    }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSections() {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSections must be used within a SectionProvider');
  }
  return context;
}
