import ReactPlayer from 'react-player';
import { Play } from 'lucide-react';
import { VideoInfo } from '../types';

const Player = ReactPlayer as any;

interface VideoPlayerProps {
  video: VideoInfo;
  poster?: string;
  autoPlay?: boolean;
  className?: string;
}

export default function VideoPlayer({ video, poster, autoPlay = false, className = '' }: VideoPlayerProps) {
  // Empty state handling
  if (!video || !video.url) {
    return (
      <div className={`relative w-full aspect-[16/9] bg-cinema-black overflow-hidden flex items-center justify-center border border-gray-800 ${className}`}>
        <div className="text-center text-gray-500">
          <Play className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs uppercase tracking-widest">No Video Provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[16/9] bg-cinema-black overflow-hidden group ${className}`}>
      <Player
        url={video.url}
        width="100%"
        height="100%"
        playing={autoPlay}
        controls={true}
        light={poster || true} // Lazy loads using the poster image
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
