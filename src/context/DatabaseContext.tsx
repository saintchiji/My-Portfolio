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
  
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Listen to Draft
    const unsubscribeDraft = onSnapshot(doc(db, 'site', 'draft'), (docSnap) => {
      if (docSnap.exists()) {
        setDraftConfig(docSnap.data() as SiteConfiguration);
        setIsDraftLoaded(true);
      } else {
        // Initialize from local storage or defaults
        migrateInitialData().then(() => {
          // The next snapshot will trigger when this finishes and sets it to true
        });
      }
    }, (error) => {
      console.error("Error loading draft config:", error);
      setIsDraftLoaded(true); // Prevent infinite loading on error
    });

    // Listen to Published
    const unsubscribePublished = onSnapshot(doc(db, 'site', 'published'), (docSnap) => {
      if (docSnap.exists()) {
        setPublishedConfig(docSnap.data() as SiteConfiguration);
      }
      setIsPublishedLoaded(true);
    }, (error) => {
      console.error("Error loading published config:", error);
      setIsPublishedLoaded(true); // Prevent infinite loading on error
    });

    return () => {
      unsubscribeDraft();
      unsubscribePublished();
    };
  }, []);

  const migrateInitialData = async () => {
    try {
      const p = localStorage.getItem('cinematic-portfolio-projects-v2');
      const s = localStorage.getItem('cinematic-portfolio-sections-v2');
      const t = localStorage.getItem('cinematic-portfolio-theme');
      const c = localStorage.getItem('cinematic-portfolio-content');
      const b = localStorage.getItem('cinematic-branding');
      const m = localStorage.getItem('cinematic-media-library');

      const draft: Partial<SiteConfiguration> = {
        projects: p ? JSON.parse(p) : [],
        sections: s ? JSON.parse(s) : [],
        theme: t ? JSON.parse(t) : null,
        content: c ? JSON.parse(c) : null,
        branding: b ? JSON.parse(b) : null,
        media: m ? JSON.parse(m) : [],
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'site', 'draft'), draft);
      // We don't auto-publish. The admin must click publish.
    } catch (e) {
      console.error("Migration failed", e);
    }
  };

  const updateDraft = (key: keyof SiteConfiguration, data: any) => {
    if (!draftConfig) return;
    const newConfig = { ...draftConfig, [key]: data, updatedAt: new Date().toISOString() };
    setDraftConfig(newConfig); // Optimistic UI update
    
    // Save to Firestore draft immediately
    setDoc(doc(db, 'site', 'draft'), newConfig, { merge: true }).catch(err => {
      console.error('Failed to update draft', err);
    });
  };

  const publish = async () => {
    if (!draftConfig) return;
    setIsPublishing(true);
    try {
      const configToPublish = { ...draftConfig, updatedAt: new Date().toISOString() };
      await setDoc(doc(db, 'site', 'published'), configToPublish);
      alert('Successfully published site configuration!');
    } catch (err) {
      console.error('Failed to publish', err);
      alert('Failed to publish. Check console.');
    } finally {
      setIsPublishing(false);
    }
  };

  // If in admin mode, show the draft. Otherwise, show published.
  // Fallback to draft if published is empty (e.g. first time setup)
  const activeConfig = isAdmin ? draftConfig : (publishedConfig || draftConfig);

  const isLoaded = isAdmin ? isDraftLoaded : (isPublishedLoaded && isDraftLoaded);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-cinema-dark flex items-center justify-center z-50">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin opacity-50" />
      </div>
    );
  }

  return (
    <DatabaseContext.Provider value={{
      activeConfig,
      draftConfig,
      updateDraft,
      publish,
      isPublishing,
      isAdmin
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error('useDatabase must be used within DatabaseProvider');
  return ctx;
}
