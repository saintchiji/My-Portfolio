export type VideoProvider = 'youtube' | 'vimeo' | 'direct' | 'google_drive';

export interface VideoInfo {
  url: string;
  provider: VideoProvider;
  previewUrl?: string;
  googleDriveFileId?: string;
}

export type MediaSourceType = 'direct' | 'google_drive' | 'youtube' | 'vimeo' | 'external';
export type MediaType = 'video' | 'image' | 'logo';

export interface MediaAsset {
  id: string;
  name: string;
  type: MediaType;
  source: MediaSourceType;
  size?: number;
  dateUploaded: string;
  url: string; // Resolvable URL (or blob ID placeholder)
  googleDriveFileId?: string;
  originalUrl?: string;
}

export interface BrandingConfig {
  primaryLogo?: string;
  darkLogo?: string;
  lightLogo?: string;
  mobileLogo?: string;
  footerLogo?: string;
  logoMark?: string;
  favicon?: string;
  logoMode: 'image' | 'text' | 'mark' | 'none';
  logoWidth: number;
  mobileLogoWidth: number;
  footerLogoWidth: number;
  logoHeightDesktop?: number;
  logoHeightMobile?: number;
  brandAccentColor?: string;
  brandAccentLight?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  avatarUrl?: string;
  role: 'client' | 'admin' | 'collaborator';
  savedProjects: string[]; // project IDs
  createdAt: string;
  lastActive: string;
  notificationsEnabled: boolean;
  status: 'active' | 'pending' | 'archived';
}

export interface ClientInquiry {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  projectType: string;
  budget: string;
  deadline: string;
  description: string;
  status: 'new' | 'in_review' | 'proposal_sent' | 'in_production' | 'completed';
  createdAt: string;
  notes?: string;
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
  displayOnWork?: boolean;
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
  type: 'all' | 'manual' | 'categories';
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
  showreelUrl?: string;
  mediaUrl?: string; // Add support for background media in hero sections
  mediaType?: 'image' | 'video';
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  // Dedicated Hero Section management options:
  mobileMediaUrl?: string;
  mobileMediaType?: 'image' | 'video';
  videoFallbackImage?: string;
  overlayOpacity?: number; // 0 to 1
  overlayColor?: 'cinema-dark' | 'cinema-black' | 'cinema-red-burn';
  mediaPosition?: 'center' | 'top' | 'bottom';
  textAlign?: 'center' | 'left' | 'right';
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showSubtitle?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showScrollIndicator?: boolean;
  headingSize?: 'default' | 'compact' | 'massive';
}
