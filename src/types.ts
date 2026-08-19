export type VideoProvider = 'youtube' | 'vimeo' | 'direct';

export interface VideoInfo {
  url: string;
  provider: VideoProvider;
  previewUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  roles: string[];
  format: 'Long-form' | 'Short-form';
  imageUrl: string;
  video: VideoInfo;
  featured?: boolean;
  year: string;
  description: string;
  client?: string;
  published: boolean;
  tags: string[];
  order: number;
}

export type SectionType = 'hero' | 'portfolio' | 'about-preview' | 'services-preview';
export type PortfolioLayout = 'cinematic-grid' | 'masonry' | 'carousel' | 'full-width' | 'two-column' | 'three-column' | 'editorial' | 'featured-supporting';
export type SectionBackground = 'transparent' | 'cinema-black' | 'cinema-dark' | 'cinema-red-burn';
export type SectionSpacing = 'tight' | 'normal' | 'loose';

export interface ProjectSelection {
  type: 'all' | 'manual';
  ids: string[];
}

export interface ThemeConfig {
  bgColor: string;
  surfaceColor: string;
  accentColor: string;
  accentLightColor: string;
  textColor: string;
  textMutedColor: string;
  borderColor: string;
  borderRadius: string;
  buttonStyle: 'solid' | 'outline' | 'ghost';
  sectionSpacing: number;
  typographyScale: number;
  headingFont: string;
  bodyFont: string;
  grainIntensity: number;
  overlayIntensity: number;
}

export interface PageSection {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  layout: PortfolioLayout | 'hero';
  columns?: 1 | 2 | 3 | 4;
  background: SectionBackground;
  spacing: SectionSpacing;
  isHidden: boolean;
  projectSelection: ProjectSelection;
  order: number;
}
