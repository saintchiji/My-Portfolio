import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { ThemeConfig } from '../types';
import { useDatabase } from './DatabaseContext';

export const defaultTheme: ThemeConfig = {
  bgColor: '#0a0303',
  surfaceColor: '#030101',
  accentColor: '#8a0303',
  accentLightColor: '#c20606',
  textColor: '#e5e7eb',
  textMutedColor: '#9ca3af',
  borderColor: '#1f2937',
  borderRadius: '0.125rem', // sm
  buttonStyle: 'outline',
  sectionSpacing: 1,
  typographyScale: 1,
  headingFont: '"Playfair Display", serif',
  bodyFont: '"Plus Jakarta Sans", sans-serif',
  grainIntensity: 0.05,
  overlayIntensity: 0.9
};

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { activeConfig, updateDraft } = useDatabase();
  
  const theme = activeConfig?.theme ? { ...defaultTheme, ...activeConfig.theme } : defaultTheme;

  useEffect(() => {
    // Apply CSS Variables to :root
    const root = document.documentElement;
    root.style.setProperty('--bg-color', theme.bgColor);
    root.style.setProperty('--surface-color', theme.surfaceColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--accent-light-color', theme.accentLightColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--text-muted', theme.textMutedColor);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--radius-custom', theme.borderRadius);
    root.style.setProperty('--spacing-scale', theme.sectionSpacing.toString());
    root.style.setProperty('--typo-scale', theme.typographyScale.toString());
    root.style.setProperty('--font-heading', theme.headingFont);
    root.style.setProperty('--font-body', theme.bodyFont);
    root.style.setProperty('--grain-intensity', theme.grainIntensity.toString());
    root.style.setProperty('--overlay-intensity', theme.overlayIntensity.toString());

    // Apply button style as a data attribute to body
    document.body.setAttribute('data-button-style', theme.buttonStyle);
  }, [theme]);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    updateDraft('theme', { ...theme, ...updates });
  };

  const resetTheme = () => {
    updateDraft('theme', defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
