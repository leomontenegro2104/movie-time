import React, { useRef, useEffect } from 'react';
import { useTmdb } from '../../../hooks/useTmdb';

const VideoList: React.FC = () => {
  const { movieVideos } = useTmdb();

  return (
    <div className="grid gap-6">
      {movieVideos &&
        movieVideos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
    </div>
  );
};

interface VideoProps {
  video: {
    key: string;
    name: string;
  };
}

const Video: React.FC<VideoProps> = ({ video }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
      iframeRef.current.setAttribute('height', height);
    }
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{video.name}</h2>
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${video.key}`}
        width="100%"
        title={video.name}
        className="border-0 rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default VideoList;
