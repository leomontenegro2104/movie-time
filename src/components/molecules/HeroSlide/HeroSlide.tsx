import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../../../api/apiConfig';
import Button, { OutlineButton } from '../../atoms/Button/Button';
import Modal, { ModalContent } from '../../atoms/Modal/Modal';
import { useTmdb } from '../../../hooks/useTmdb';
import { Category, MovieType } from '../../../context/TmdbContext';

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface HeroSlideItemProps {
  item: IMovie;
  className?: string;
}

interface TrailerModalProps {
  item: IMovie;
}

const HeroSlide: React.FC = () => {
  const { movies, getMoviesList } = useTmdb();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    getMoviesList(MovieType.POPULAR, { page: 1 });
  }, [getMoviesList]);

  const movieItems = movies.slice(16, 20);

  useEffect(() => {
    if (movieItems.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % movieItems.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [movieItems]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % movieItems.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + movieItems.length) % movieItems.length);
  };

  return (
    <div className="relative mb-12">
      {movieItems.length > 0 && (
        <HeroSlideItem item={movieItems[activeSlide]} className="active" />
      )}

      <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2 z-10">
        <button
          className="bg-black/50 text-white p-4 text-2xl transition hover:bg-black/80"
          onClick={prevSlide}
        >
          &#8249;
        </button>
        <button
          className="bg-black/50 text-white p-4 text-2xl transition hover:bg-black/80"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      </div>

      {movieItems.map((item) => (
        <TrailerModal key={item.id} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ item, className }) => {
  const navigate = useNavigate();
  const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);
  const { getVideos } = useTmdb();

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    if (modal) {
      try {
        const videosData = await getVideos(Category.MOVIE, item.id);
        if (videosData.length > 0) {
          const videoSrc = `https://www.youtube.com/embed/${videosData[0].key}`;
          const iframe = modal.querySelector('iframe') as HTMLIFrameElement | null;
          iframe?.setAttribute('src', videoSrc);
        } else {
          const modalContent = modal.querySelector('.modal__content') as HTMLElement | null;
          if (modalContent) {
            modalContent.innerHTML = 'No trailer available';
          }
        }
        modal.classList.toggle('active');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      className={`relative w-full h-[85vh] bg-cover bg-center flex items-center justify-center ${className || ''}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className='flex items-center justify-center'>
        <div className="relative text-white px-6">
          <h2 className="text-5xl font-bold mb-4">{item.title}</h2>
          <p className="max-w-xl mx-auto mb-6">{item.overview}</p>
          <div className="flex space-x-4">
            <Button onClick={() => navigate('/movie/' + item.id)}>Watch now</Button>
            <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-start relative">
          <img
            src={apiConfig.w500Image(item.poster_path || '')}
            alt={item.title}
            className="w-[15rem] h-[20rem] rounded-[30px]"
          />
        </div>

      </div>
    </div>
  );
};

const TrailerModal: React.FC<TrailerModalProps> = ({ item }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const onClose = () => {
    iframeRef.current?.setAttribute('src', '');
  };

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
