import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, doc, setDoc, onSnapshot } from '../lib/firebase';
import { useLocation } from 'react-router-dom';
import { Project, PageSection, ThemeConfig, BrandingConfig, MediaAsset } from '../types';
import { Loader2 } from 'lucide-react';

export interface SiteConfiguration {
  projects: Project[];
  sections: PageSection[];
  theme: ThemeConfig | null;
  content: any | null;
  branding: BrandingConfig | null;
  media: MediaAsset[];
  updatedAt?: string;
}

interface DatabaseContextType {
  activeConfig: SiteConfiguration | null;
  draftConfig: SiteConfiguration | null;
  updateDraft: (key: keyof SiteConfiguration, data: any) => void;
  saveDraft: () => Promise<void>;
  hasUnsavedChanges: boolean;
  publish: () => Promise<void>;
  isPublishing: boolean;
  isAdmin: boolean;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [draftConfig, setDraftConfig] = useState<SiteConfiguration | null>(null);
  const [publishedConfig, setPublishedConfig] = useState<SiteConfiguration | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);
  const [isPublishedLoaded, setIsPublishedLoaded] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Listen to Draft
    const unsubscribeDraft = onSnapshot(doc(db, 'site', 'draft'), (docSnap) => {
      if (docSnap.exists()) {
        setDraftConfig(prev => {
          return prev && hasUnsavedChanges ? prev : docSnap.data() as SiteConfiguration;
        });
      } else {
        setDraftConfig(null);
      }
      setIsDraftLoaded(true);
    }, (error) => {
      console.error('Error fetching draft:', error);
      setIsDraftLoaded(true);
    });

    // Listen to Published
    const unsubscribePublished = onSnapshot(doc(db, 'site', 'published'), (docSnap) => {
      if (docSnap.exists()) {
        setPublishedConfig(docSnap.data() as SiteConfiguration);
      } else {
        setPublishedConfig(null);
      }
      setIsPublishedLoaded(true);
    }, (error) => {
      console.error('Error fetching published:', error);
      setIsPublishedLoaded(true);
    });

    return () => {
      unsubscribeDraft();
      unsubscribePublished();
    };
  }, [hasUnsavedChanges]);

  // For Admin, use draft. For visitors, use published.
  const activeConfig = isAdmin ? draftConfig : publishedConfig;

  // Initialize DB if empty
  useEffect(() => {
    if (!isAdmin) return;
    
    if (isDraftLoaded && !draftConfig) {
      console.log("Draft config not found, initialising with static data...");
      import('../data').then(async (module) => {
        const { projects, initialSections, initialTheme, initialContent, initialBranding, initialMedia } = module;
        const draft = {
          projects,
          sections: initialSections,
          theme: initialTheme,
          content: initialContent,
          branding: initialBranding,
          media: initialMedia || [],
          updatedAt: new Date().toISOString()
        };
        try {
          setDraftConfig(draft);
          await setDoc(doc(db, 'site', 'draft'), draft);
          // We don't auto-publish. The admin must click publish.
        } catch (e) {
          console.error("Migration failed", e);
        }
      });
    }
  }, [isDraftLoaded, draftConfig, isAdmin]);

  const updateDraft = (key: keyof SiteConfiguration, data: any) => {
    if (!draftConfig) return;
    const newConfig = { ...draftConfig, [key]: data, updatedAt: new Date().toISOString() };
    setDraftConfig(newConfig); // Optimistic UI update
    setHasUnsavedChanges(true);
  };

  const saveDraft = async () => {
    if (!draftConfig) return;
    try {
      await setDoc(doc(db, 'site', 'draft'), draftConfig, { merge: true });
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to save draft', err);
    }
  };

  const publish = async () => {
    if (!draftConfig) return;
    setIsPublishing(true);
    try {
      const configToPublish = { ...draftConfig, updatedAt: new Date().toISOString() };
      await saveDraft();
      await setDoc(doc(db, 'site', 'published'), configToPublish);
      alert('Successfully published site configuration!');
    } catch (err) {
      console.error('Failed to publish', err);
      alert('Failed to publish. Check console.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Do not render application until proper config is loaded
  if (isAdmin && !isDraftLoaded) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center">
         <Loader2 className="w-8 h-8 text-cinema-red animate-spin" />
      </div>
    );
  }

  if (!isAdmin && !isPublishedLoaded) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center">
         <Loader2 className="w-8 h-8 text-cinema-red animate-spin" />
      </div>
    );
  }

  return (
    <DatabaseContext.Provider value={{
      activeConfig,
      draftConfig,
      updateDraft,
      saveDraft,
      hasUnsavedChanges,
      publish,
      isPublishing,
      isAdmin
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
