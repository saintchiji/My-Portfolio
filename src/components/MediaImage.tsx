import { useState, useEffect } from 'react';
import { useMedia } from '../context/MediaContext';
import { Image as ImageIcon } from 'lucide-react';

interface MediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackText?: string;
}

export default function MediaImage({ src, fallbackText = "Media Unavailable", className = "", style, ...props }: MediaImageProps) {
  const { resolveMediaUrl } = useMedia();
  const [resolvedSrc, setResolvedSrc] = useState(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    setError(false);
    
    if (!src) {
      setError(true);
      return;
    }

    if (src.startsWith('idb://')) {
      resolveMediaUrl(src)
        .then(url => {
          if (mounted) {
            if (url) {
              setResolvedSrc(url);
            } else {
              setError(true);
            }
          }
        })
        .catch(() => {
          if (mounted) setError(true);
        });
    } else {
      setResolvedSrc(src);
    }
    return () => { mounted = false; };
  }, [src, resolveMediaUrl]);

  if (error || !resolvedSrc) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gray-900 border border-gray-800 text-gray-500 overflow-hidden ${className}`}
        style={style}
      >
        <ImageIcon className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-30" />
        <span className="text-[10px] uppercase tracking-widest text-center px-2">{fallbackText}</span>
      </div>
    );
  }

  return (
    <img 
      src={resolvedSrc} 
      className={className} 
      style={style} 
      onError={() => setError(true)} 
      {...props} 
    />
  );
}
