import { useState, useEffect, forwardRef } from 'react';
import { useMedia } from '../context/MediaContext';
import { Film } from 'lucide-react';

interface MediaVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src?: string;
  fallbackText?: string;
}

const MediaVideo = forwardRef<HTMLVideoElement, MediaVideoProps>(({ src, fallbackText = "Video Unavailable", className = "", style, ...props }, ref) => {
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
        <Film className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-30" />
        <span className="text-[10px] uppercase tracking-widest text-center px-2">{fallbackText}</span>
      </div>
    );
  }

  return (
    <video 
      ref={ref} 
      src={resolvedSrc} 
      className={className}
      style={style}
      onError={() => setError(true)} 
      {...props} 
    />
  );
});

MediaVideo.displayName = 'MediaVideo';

export default MediaVideo;
