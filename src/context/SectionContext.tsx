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

export const initialSections: PageSection[] = [
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
  },
  {
    id: 'contact-1',
    type: 'contact',
    title: 'GET IN TOUCH',
    subtitle: 'Contact',
    description: 'Ready to build something worth watching?',
    buttons: [{ id: 'b1', text: 'Email Us', url: 'mailto:hello@vxnstudio.com', isVisible: true }],
    layout: 'hero',
    background: 'cinema-dark',
    spacing: 'normal',
    isHidden: false,
    projectSelection: { type: 'all', ids: [] },
    order: 4
  },
  {
    id: 'footer-1',
    type: 'footer',
    title: 'Footer',
    footerText: 'A boutique creative studio specializing in visual storytelling and high-end cinematography.',
    copyright: '© 2026 VXN Studio.',
    layout: 'hero',
    background: 'cinema-black',
    spacing: 'normal',
    isHidden: false,
    projectSelection: { type: 'all', ids: [] },
    items: [
      { id: 'i1', title: 'Work', description: '', buttonUrl: '/work', isVisible: true, order: 0 },
      { id: 'i2', title: 'About', description: '', buttonUrl: '/about', isVisible: true, order: 1 },
      { id: 'i3', title: 'Services', description: '', buttonUrl: '/services', isVisible: true, order: 2 },
      { id: 'i4', title: 'Contact', description: '', buttonUrl: '/contact', isVisible: true, order: 3 },
      { id: 'i5', title: 'Instagram', description: '', buttonUrl: '#', iconName: 'Instagram', isVisible: true, order: 4 },
      { id: 'i6', title: 'Vimeo', description: '', buttonUrl: '#', iconName: 'Vimeo', isVisible: true, order: 5 }
    ],
    order: 5
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
