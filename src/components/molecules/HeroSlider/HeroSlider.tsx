import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import apiConfig from '../../../api/apiConfig';
import Button, { OutlineButton } from '../../atoms/Button/Button';
import Modal, { ModalContent } from '../../atoms/Modal/Modal';

import { useTmdb } from '../../../hooks/useTmdb';
import { Category, MovieType } from '../../../context/TmdbContext';
import './hero-slider.scss';

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

  const movieItems = movies.slice(1, 4);

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
    <div className="hero-slide">
      {movieItems.length > 0 && (
        <HeroSlideItem item={movieItems[activeSlide]} className="active" />
      )}

      <div className="hero-slide__nav">
        <button className="hero-slide__nav-btn prev" onClick={prevSlide}>
          {"<"}
        </button>
        <button className="hero-slide__nav-btn next" onClick={nextSlide}>
          {">"}
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
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const { getVideos } = useTmdb();

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    if (modal) {
      try {
        const videosData = await getVideos(Category.MOVIE, item.id);
        if (videosData && videosData.length > 0) {
          const videoSrc = 'https://www.youtube.com/embed/' + videosData[0].key;
          const iframe = modal.querySelector('.modal__content > iframe') as HTMLIFrameElement | null;
          if (iframe) {
            iframe.setAttribute('src', videoSrc);
          }
        } else {
          const modalContent = modal.querySelector('.modal__content') as HTMLElement | null;
          if (modalContent) {
            modalContent.innerHTML = 'No trailer';
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
      className={`hero-slide__item ${className || ''}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate('/movie/' + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path || '')} alt={item.title} />
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
