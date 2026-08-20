import { useState, useEffect } from 'react';
import { useMedia } from '../context/MediaContext';

interface MediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export default function MediaImage({ src, ...props }: MediaImageProps) {
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

  return <img src={resolvedSrc} {...props} />;
}
