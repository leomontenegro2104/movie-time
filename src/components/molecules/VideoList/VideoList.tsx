import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTmdb } from '../../../hooks/useTmdb';
import './video-list.scss';
import { Category } from '../../../context/TmdbContext';

interface VideoItem {
  key: string;
  name?: string;
}

interface VideoListProps {
  id: number;
}

interface Params {
  category: Category;
  [key: string]: string | undefined;
}

const VideoList: React.FC<VideoListProps> = ({ id }) => {
  const { category } = useParams<Params>();
  const { videos, getVideos } = useTmdb();

  useEffect(() => {
    if (category && id) {
      getVideos(category, id);
    }
  }, [category, id, getVideos]);

  const videoItems: VideoItem[] = videos.slice(0, 5);

  return (
    <>
      {videoItems.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

interface VideoProps {
  item: VideoItem;
}

const Video: React.FC<VideoProps> = ({ item }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
      iframeRef.current.setAttribute('height', height);
    }
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name ? item.name : 'Trailer'}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
