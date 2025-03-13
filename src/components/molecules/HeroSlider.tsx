import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTmdb } from "../../hooks/useTmdb";
import { MovieType, Category } from "../../context/TmdbContext";
import apiConfig from "../../api/apiConfig";
import { Modal, ModalContent } from "../atoms/Modal";

const HeroSlider: React.FC = () => {
  const { movies, getMoviesList, videos, getVideos } = useTmdb();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getMoviesList(MovieType.POPULAR, { page: 1 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {movies.slice(0, 3).map((item, index) => (
        <HeroSlideItem key={item.id} item={item} isActive={index === activeIndex} getVideos={getVideos} />
      ))}
      <button
        onClick={() => setActiveIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1))}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-70 hover:opacity-100"
      >
        ❮
      </button>
      <button
        onClick={() => setActiveIndex((prev) => (prev + 1) % movies.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-70 hover:opacity-100"
      >
        ❯
      </button>
      {movies.slice(0, 3).map((item) => (
        <TrailerModal key={item.id} item={item} videos={videos} />
      ))}
    </div>
  );
};

interface HeroSlideItemProps {
  item: {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
  };
  isActive: boolean;
  getVideos: (cate: Category, id: number) => Promise<void>;
}

const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ item, isActive, getVideos }) => {
  const navigate = useNavigate();
  const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

  return (
    <BackgroundContainer background={background}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-white text-4xl font-bold">{item.title}</h2>
        <p className="text-white text-lg mt-4 max-w-2xl">{item.overview}</p>
        <div className="flex mt-6 space-x-4">
          <button
            onClick={() => navigate(`/movie/${item.id}`)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Watch Now
          </button>
          <WatchTrailerButton movieId={item.id} getVideos={getVideos} />
        </div>
      </div>
    </BackgroundContainer>
  );
};

const BackgroundContainer: React.FC<{ background: string; children: React.ReactNode }> = ({
  background,
  children,
}) => (
  <div
    className="absolute inset-0 transition-opacity duration-700 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${background})` }}
  >
    {children}
  </div>
);

interface WatchTrailerButtonProps {
  movieId: number;
  getVideos: (cate: Category, id: number) => Promise<void>;
}

const WatchTrailerButton: React.FC<WatchTrailerButtonProps> = ({ movieId, getVideos }) => {
  const setModalActive = async () => {
    await getVideos(Category.MOVIE, movieId);
    const modal = document.querySelector(`#modal_${movieId}`) as HTMLElement;
    modal.classList.add("opacity-100", "visible");
  };

  return (
    <button
      onClick={setModalActive}
      className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-red-600 transition"
    >
      Watch Trailer
    </button>
  );
};

interface TrailerModalProps {
  item: { id: number };
  videos: { key: string }[];
}

const TrailerModal: React.FC<TrailerModalProps> = ({ item, videos }) => {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (videos.length > 0 && iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videos[0].key}`;
    }
  }, [videos]);

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlider;
