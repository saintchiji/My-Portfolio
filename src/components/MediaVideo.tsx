import { useState, useEffect, forwardRef } from 'react';
import { useMedia } from '../context/MediaContext';

interface MediaVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

const MediaVideo = forwardRef<HTMLVideoElement, MediaVideoProps>(({ src, ...props }, ref) => {
  const { resolveMediaUrl } = useMedia();
  const [resolvedSrc, setResolvedSrc] = useState(src);

  useEffect(() => {
    let mounted = true;
    if (src?.startsWith('idb://')) {
      resolveMediaUrl(src).then(url => {
        if (mounted) setResolvedSrc(url);
      });
    } else {
      setResolvedSrc(src);
    }
    return () => { mounted = false; };
  }, [src, resolveMediaUrl]);

  return <video ref={ref} src={resolvedSrc} {...props} />;
});

MediaVideo.displayName = 'MediaVideo';

export default MediaVideo;
