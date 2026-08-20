import React, { createContext, useContext, ReactNode } from 'react';
import { BrandingConfig } from '../types';
import { useDatabase } from './DatabaseContext';

interface BrandingContextType {
  branding: BrandingConfig;
  updateBranding: (updates: Partial<BrandingConfig>) => void;
}

const defaultBranding: BrandingConfig = {
  logoMode: 'text',
  logoWidth: 150,
  mobileLogoWidth: 120,
  footerLogoWidth: 120,
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: { children: ReactNode }) {
  const { activeConfig, updateDraft } = useDatabase();
  
  const branding = activeConfig?.branding ? { ...defaultBranding, ...activeConfig.branding } : defaultBranding;

  const updateBranding = (updates: Partial<BrandingConfig>) => {
    updateDraft('branding', { ...branding, ...updates });
  };

  return (
    <BrandingContext.Provider value={{ branding, updateBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export const useBranding = () => {
  const ctx = useContext(BrandingContext);
  if (!ctx) throw new Error('useBranding must be used within BrandingProvider');
  return ctx;
};
