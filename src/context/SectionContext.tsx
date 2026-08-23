import React, { createContext, useContext, ReactNode } from 'react';
import { PageSection } from '../types';
import { useDatabase } from './DatabaseContext';

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
    description: 'We create visually stunning content for ambitious brands.',
    buttonText: 'View Work',
    buttonLink: '/work',
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
    description: 'We are a creative studio specializing in cinematic storytelling.',
    buttonText: 'Read About',
    buttonLink: '/about',
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
    description: 'From concept to final delivery, we offer full-service production.',
    buttonText: 'Our Services',
    buttonLink: '/services',
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
  const { activeConfig, updateDraft } = useDatabase();
  
  const sections = activeConfig?.sections || initialSections;

  const addSection = (sectionData: Omit<PageSection, 'id' | 'order'>) => {
    const newSection: PageSection = {
      ...sectionData,
      id: crypto.randomUUID(),
      order: sections.length,
    };
    updateDraft('sections', [...sections, newSection]);
  };

  const updateSection = (id: string, updates: Partial<PageSection>) => {
    updateDraft('sections', sections.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSection = (id: string) => {
    updateDraft('sections', sections.filter(s => s.id !== id));
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
    updateDraft('sections', [...sections, newSection]);
  };

  const reorderSections = (startIndex: number, endIndex: number) => {
    const result = Array.from(sections);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const updated = result.map((s, index) => ({ ...s, order: index }));
    updateDraft('sections', updated);
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
