import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../../../api/apiConfig';
import Button, { OutlineButton } from '../../atoms/Button/Button';
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

const HeroSlide: React.FC = () => {
  const { movieList } = useTmdb();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const movieItems = movieList[Category.MOVIE]?.[MovieType.POPULAR]?.slice(0, 3) || [];

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
    </div>
  );
};

const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ item, className }) => {
  const navigate = useNavigate();
  const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

  const handleNavigation = () => {
    navigate('/movie/' + item.id);
  };

  return (
    <div
      className={`relative w-full h-[85vh] bg-cover bg-center flex items-center justify-center ${className || ''}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="flex flex-col md:flex-row items-center justify-center space-x-8 pt-20 px-6">
        <div className="relative text-white">
          <h2
            className="text-5xl font-bold mb-4 break-words max-w-[90%] md:max-w-[70%] lg:max-w-[50%]"
            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
          >
            {item.title}
          </h2>
          <p className="max-w-xl mx-auto mb-6">{item.overview}</p>
          <div className="flex space-x-4">
            <Button onClick={handleNavigation}>Watch now</Button>
            <OutlineButton onClick={handleNavigation}>Watch trailer</OutlineButton>
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

export default HeroSlide;
