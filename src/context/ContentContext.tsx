import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SocialLink {
  id: string;
  platform: 'Instagram' | 'Youtube' | 'Vimeo' | 'Twitter' | 'LinkedIn' | 'Facebook';
  url: string;
  isVisible: boolean;
}

export interface NavLink {
  id: string;
  label: string;
  path: string;
  isVisible: boolean;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  iconName: string;
  order: number;
  isVisible: boolean;
}

export interface SiteContent {
  branding: {
    logoText: string;
    logoImage: string;
  };
  contact: {
    email: string;
    location: string;
    headline: string;
    description: string;
  };
  socialLinks: SocialLink[];
  navigation: NavLink[];
  footer: {
    text: string;
  };
  about: {
    headline: string;
    biography1: string;
    biography2: string;
    philosophy: string;
    capabilities: { id: string; title: string; description: string }[];
    approach: { id: string; step: string; title: string; desc: string }[];
  };
  services: ServiceItem[];
  servicesPage: {
    headline: string;
    description: string;
  };
}

const initialContent: SiteContent = {
  branding: {
    logoText: 'VXN',
    logoImage: ''
  },
  contact: {
    email: 'hello@vxnstudio.com',
    location: 'Based in London, UK.',
    headline: 'CONTACT',
    description: 'Ready to build something worth watching? Let\'s discuss your next project. We are currently accepting new commissions for Q3 and Q4.'
  },
  socialLinks: [
    { id: '1', platform: 'Instagram', url: '#', isVisible: true },
    { id: '2', platform: 'Youtube', url: '#', isVisible: true },
    { id: '3', platform: 'Vimeo', url: '#', isVisible: true }
  ],
  navigation: [
    { id: 'nav-1', label: 'Work', path: '/work', isVisible: true, order: 0 },
    { id: 'nav-2', label: 'About', path: '/about', isVisible: true, order: 1 },
    { id: 'nav-3', label: 'Services', path: '/services', isVisible: true, order: 2 },
    { id: 'nav-4', label: 'Contact', path: '/contact', isVisible: true, order: 3 }
  ],
  footer: {
    text: 'A boutique creative studio specializing in visual storytelling and high-end cinematography.'
  },
  about: {
    headline: 'We build visual experiences built around stories worth watching.',
    biography1: 'We are a boutique creative studio specializing in high-end cinematography, editorial video editing, and complete commercial production. We don\'t just capture footage; we craft compelling narratives that resonate with audiences.',
    biography2: 'With years of experience spanning narrative film, documentary, and commercial campaigns, our approach marries technical precision with raw emotional resonance. Every project is an opportunity to elevate the visual standard and deliver something extraordinary.',
    philosophy: '"Every frame has a purpose."',
    capabilities: [
      { id: 'cap-1', title: 'Film Production', description: 'Complete narrative and documentary production from conception to final delivery.' },
      { id: 'cap-2', title: 'Cinematography', description: 'High-end visual capture utilizing cinema-grade equipment and specialized lighting.' },
      { id: 'cap-3', title: 'Video Editing', description: 'Precision editorial work focusing on pacing, story structure, and emotional beats.' },
      { id: 'cap-4', title: 'Commercial Production', description: 'Brand-focused storytelling designed to convert and captivate target audiences.' },
      { id: 'cap-5', title: 'Content Production', description: 'High-volume, high-quality digital content tailored for modern social platforms.' },
      { id: 'cap-6', title: 'Visual Storytelling', description: 'Strategic creative direction focusing on the core message and visual identity.' }
    ],
    approach: [
      { id: 'app-1', step: '01', title: 'Discover', desc: 'Understanding the story, brand, audience and objective.' },
      { id: 'app-2', step: '02', title: 'Develop', desc: 'Building the visual direction, concept and production strategy.' },
      { id: 'app-3', step: '03', title: 'Produce', desc: 'Cinematography, direction, production and visual capture.' },
      { id: 'app-4', step: '04', title: 'Edit', desc: 'Transforming raw footage into a cohesive visual story.' },
      { id: 'app-5', step: '05', title: 'Deliver', desc: 'Preparing the final work for the intended platform and audience.' }
    ]
  },
  servicesPage: {
    headline: 'SERVICES',
    description: 'Visual production, cinematography and editing built around stories worth watching.'
  },
  services: [
    {
      id: 'srv-1',
      iconName: 'Scissors',
      title: 'Video Editing',
      description: 'Precision editorial work focusing on pacing, story structure, and emotional beats.',
      capabilities: ['Long-form editing', 'YouTube editing', 'Documentary editing', 'Social media editing', 'Short-form editing', 'Commercial editing', 'Story-driven editing', 'Color grading', 'Sound design', 'Motion graphics'],
      order: 0,
      isVisible: true
    },
    {
      id: 'srv-2',
      iconName: 'Film',
      title: 'Cinematography',
      description: 'High-end visual capture utilizing cinema-grade equipment and specialized lighting to elevate the production value.',
      capabilities: ['Commercial cinematography', 'Event cinematography', 'Wedding films', 'Fashion films', 'Music videos', 'Narrative production', 'Corporate filmmaking', 'Creative visual production'],
      order: 1,
      isVisible: true
    },
    {
      id: 'srv-3',
      iconName: 'PlaySquare',
      title: 'Commercial Video',
      description: 'Brand-focused storytelling designed to convert and captivate target audiences across multiple platforms.',
      capabilities: ['Brand films', 'Product commercials', 'Social advertisements', 'Campaign videos', 'Promotional videos', 'Corporate films'],
      order: 2,
      isVisible: true
    },
    {
      id: 'srv-4',
      iconName: 'MonitorPlay',
      title: 'Content Production',
      description: 'High-volume, high-quality digital content tailored for modern social platforms and creators.',
      capabilities: ['Social media content', 'Short-form content', 'YouTube production', 'Content repurposing', 'Visual campaigns'],
      order: 3,
      isVisible: true
    },
    {
      id: 'srv-5',
      iconName: 'Clapperboard',
      title: 'Creative Direction',
      description: 'Strategic visual planning from the ground up, ensuring every frame aligns with the core narrative.',
      capabilities: ['Concept development', 'Visual direction', 'Storyboarding', 'Shot planning', 'Creative development', 'Production planning'],
      order: 4,
      isVisible: true
    }
  ]
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (updates: Partial<SiteContent>) => void;
  updateNestedContent: (key: keyof SiteContent, nestedKey: string, value: any) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('cinematic-portfolio-content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }
    return initialContent;
  });

  useEffect(() => {
    localStorage.setItem('cinematic-portfolio-content', JSON.stringify(content));
  }, [content]);

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...updates }));
  };

  const updateNestedContent = (key: keyof SiteContent, nestedKey: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] as any),
        [nestedKey]: value
      }
    }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, updateNestedContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
