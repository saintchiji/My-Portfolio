import ReactPlayer from 'react-player';
import { Play, VideoOff, Loader2 } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);

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
  
  if (error || (!resolvedUrl && video.provider !== 'google_drive')) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-gray-900 overflow-hidden flex items-center justify-center border border-gray-800 ${className}`}>
        <div className="text-center text-gray-500">
          <VideoOff className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs uppercase tracking-widest">Video unavailable.</p>
        </div>
      </div>
    );
  }

  const renderPoster = () => (
    <div 
      className="absolute inset-0 cursor-pointer group"
      onClick={() => setIsPlaying(true)}
    >
      {poster ? (
        <img src={poster} alt="Video Thumbnail" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-cinema-black flex items-center justify-center border border-gray-800">
          <Play className="w-8 h-8 opacity-30" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <button className="w-20 h-20 rounded-full bg-cinema-red/90 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(138,3,3,0.5)]">
          <Play className="w-8 h-8 fill-current ml-1" />
        </button>
      </div>
    </div>
  );

  if (video.provider === 'google_drive' && video.googleDriveFileId) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-cinema-black overflow-hidden ${className}`}>
        {!isPlaying ? renderPoster() : (
          <iframe 
            src={`https://drive.google.com/file/d/${video.googleDriveFileId}/preview`} 
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            title="Google Drive Video"
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[16/9] bg-cinema-black overflow-hidden ${className}`}>
      {!isPlaying ? renderPoster() : (
        <Player
          url={resolvedUrl}
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          onReady={() => setIsLoading(false)}
          onError={() => setError(true)}
          config={{
            youtube: {
              playerVars: { showinfo: 1, modestbranding: 1 } as any
            } as any
          }}
        />
      )}
      {isPlaying && isLoading && video.provider !== 'google_drive' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 pointer-events-none">
          <Loader2 className="w-8 h-8 text-cinema-red animate-spin" />
        </div>
      )}
    </div>
  );
}
