import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MediaAsset } from '../types';
import { saveMediaBlob, deleteMediaBlob, getMediaBlobUrl } from '../lib/indexeddb';
import { useDatabase } from './DatabaseContext';

interface MediaContextType {
  media: MediaAsset[];
  addMedia: (asset: MediaAsset) => void;
  removeMedia: (id: string) => Promise<void>;
  updateMedia: (id: string, updates: Partial<MediaAsset>) => void;
  uploadDirectMedia: (file: File, type: 'video' | 'image' | 'logo', onProgress?: (p: number) => void) => Promise<MediaAsset>;
  resolveMediaUrl: (url: string) => Promise<string>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const { activeConfig, updateDraft } = useDatabase();
  
  const media = activeConfig?.media || [];

  // Keep a map of resolved blob URLs to avoid memory leaks and repeated object creation
  const [resolvedUrls, setResolvedUrls] = useState<Record<string, string>>({});

  const addMedia = (asset: MediaAsset) => updateDraft('media', [...media, asset]);
  
  const updateMedia = (id: string, updates: Partial<MediaAsset>) => {
    updateDraft('media', media.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const removeMedia = async (id: string) => {
    const asset = media.find(m => m.id === id);
    updateDraft('media', media.filter(m => m.id !== id));
    
    if (asset?.source === 'direct' && asset.url.startsWith('idb://')) {
      const blobId = asset.url.replace('idb://', '');
      await deleteMediaBlob(blobId);
      if (resolvedUrls[blobId]) {
        URL.revokeObjectURL(resolvedUrls[blobId]);
        setResolvedUrls(prev => {
          const next = { ...prev };
          delete next[blobId];
          return next;
        });
      }
    }
  };

  const uploadDirectMedia = async (file: File, type: 'video' | 'image' | 'logo', onProgress?: (p: number) => void): Promise<MediaAsset> => {
    if (onProgress) {
      for(let i = 0; i <= 100; i += 10) {
        onProgress(i);
        await new Promise(r => setTimeout(r, 100));
      }
    }

    const blobId = crypto.randomUUID();
    await saveMediaBlob(blobId, file);
    
    const asset: MediaAsset = {
      id: crypto.randomUUID(),
      name: file.name,
      type,
      source: 'direct',
      size: file.size,
      dateUploaded: new Date().toISOString(),
      url: `idb://${blobId}`,
    };
    
    addMedia(asset);
    return asset;
  };

  const resolveMediaUrl = async (url: string): Promise<string> => {
    if (url.startsWith('idb://')) {
      const blobId = url.replace('idb://', '');
      if (resolvedUrls[blobId]) return resolvedUrls[blobId];
      const blobUrl = await getMediaBlobUrl(blobId);
      if (blobUrl) {
        setResolvedUrls(prev => ({ ...prev, [blobId]: blobUrl }));
        return blobUrl;
      }
      return '';
    }
    return url;
  };

  return (
    <MediaContext.Provider value={{ media, addMedia, removeMedia, updateMedia, uploadDirectMedia, resolveMediaUrl }}>
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => {
  const ctx = useContext(MediaContext);
  if (!ctx) throw new Error('useMedia must be used within MediaProvider');
  return ctx;
};
