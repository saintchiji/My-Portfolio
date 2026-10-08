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

function sanitizeSvg(content: string): string {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/href="javascript:[^"]*"/gi, 'href="#"');
}

  const uploadDirectMedia = async (file: File, type: 'video' | 'image' | 'logo', onProgress?: (p: number) => void): Promise<MediaAsset> => {
    // Validate file formats and size limits
    if (type === 'video') {
      const validVideo = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
      if (!validVideo.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|ogg)$/i)) {
        throw new Error('Unsupported video format. Please upload MP4 or WebM video.');
      }
      if (file.size > 250 * 1024 * 1024) {
        throw new Error('Video file size exceeds maximum limit of 250MB.');
      }
    } else {
      const validImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'];
      if (!validImage.includes(file.type) && !file.name.match(/\.(png|jpe?g|webp|svg|ico)$/i)) {
        throw new Error('Unsupported image format. Please upload PNG, SVG, JPG, or WebP format.');
      }
      if (file.size > 25 * 1024 * 1024) {
        throw new Error('Image file size exceeds maximum limit of 25MB.');
      }
    }

    let blobToSave: Blob = file;
    // Sanitize SVG content
    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
      try {
        const text = await file.text();
        const cleaned = sanitizeSvg(text);
        blobToSave = new Blob([cleaned], { type: 'image/svg+xml' });
      } catch (err) {
        console.warn('SVG sanitization error', err);
      }
    }

    if (onProgress) {
      for(let i = 0; i <= 100; i += 20) {
        onProgress(i);
        await new Promise(r => setTimeout(r, 60));
      }
    }

    const blobId = crypto.randomUUID();
    await saveMediaBlob(blobId, blobToSave);
    
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
