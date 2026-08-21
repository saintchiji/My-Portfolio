import ReactPlayer from 'react-player';
import { Play, VideoOff } from 'lucide-react';
import { VideoInfo } from '../types';
import { useMedia } from '../context/MediaContext';
import { useState, useEffect } from 'react';

const Player = ReactPlayer as any;

interface VideoPlayerProps {
  video: VideoInfo;
  poster?: string;
  autoPlay?: boolean;
  className?: string;
}

export default function VideoPlayer({ video, poster, autoPlay = false, className = '' }: VideoPlayerProps) {
  const { resolveMediaUrl } = useMedia();
  const [resolvedUrl, setResolvedUrl] = useState(video?.url);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    setError(false);
    
    if (video?.url?.startsWith('idb://')) {
      resolveMediaUrl(video.url)
        .then(url => {
          if (mounted) {
            if (url) {
              setResolvedUrl(url);
            } else {
              setError(true);
            }
          }
        })
        .catch(() => {
          if (mounted) setError(true);
        });
    } else {
      setResolvedUrl(video?.url);
    }
    return () => { mounted = false; };
  }, [video?.url, resolveMediaUrl]);

  // Empty state handling
  if (!video || (!video.url && !video.googleDriveFileId)) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-cinema-black overflow-hidden flex items-center justify-center border border-gray-800 ${className}`}>
        <div className="text-center text-gray-500">
          <Play className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs uppercase tracking-widest">No Video Provided</p>
        </div>
      </div>
    );
  }
  
  if (error || !resolvedUrl) {
    if (video.provider !== 'google_drive') {
      return (
        <div className={`relative w-full aspect-[16/9] bg-gray-900 overflow-hidden flex items-center justify-center border border-gray-800 ${className}`}>
          <div className="text-center text-gray-500">
            <VideoOff className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-[10px] uppercase tracking-widest">Video Unavailable</p>
          </div>
        </div>
      );
    }
  }

  if (video.provider === 'google_drive' && video.googleDriveFileId) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-cinema-black overflow-hidden group ${className}`}>
        <iframe 
          src={`https://drive.google.com/file/d/${video.googleDriveFileId}/preview`} 
          className="w-full h-full border-0"
          allow="autoplay; fullscreen"
          title="Google Drive Video"
          onError={() => setError(true)}
        />
        {/* We can't easily catch iframe 403s directly via React onError due to cross-origin, 
            but if we have a poster, we could show it as a fallback, or just rely on Google's own error screen inside the iframe. */}
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[16/9] bg-cinema-black overflow-hidden group ${className}`}>
      <Player
        url={resolvedUrl}
        width="100%"
        height="100%"
        playing={autoPlay}
        controls={true}
        light={poster || true} // Lazy loads using the poster image
        onError={() => setError(true)}
        playIcon={
          <div className="absolute inset-0 flex items-center justify-center bg-cinema-dark/40 group-hover:bg-cinema-dark/20 transition-colors duration-500">
            <button className="w-20 h-20 rounded-full bg-cinema-red/90 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(138,3,3,0.5)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cinema-red-light">
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          </div>
        }
        config={{
          youtube: {
            playerVars: { showinfo: 1, modestbranding: 1 } as any
          } as any,
          vimeo: {
            playerOptions: { byline: false, portrait: false, title: false } as any
          } as any
        }}
      />
    </div>
  );
}
