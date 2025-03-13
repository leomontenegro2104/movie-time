import React, { useEffect, useState } from "react";
import HeroSlideItem from "./HeroSlideItem";
import TrailerModal from "./TrailerModal";
import { MovieType } from "../../../context/TmdbContext";
import { useTmdb } from "../../../hooks/useTmdb";

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

  const displayedMovies = movies.slice(0, 10);
  const trailerMovies = displayedMovies.slice(0, 3);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {displayedMovies.map((item, index) => (
        <HeroSlideItem key={item.id} item={item} isActive={index === activeIndex} getVideos={getVideos} />
      ))}

      <button
        onClick={() => setActiveIndex((prev) => (prev === 0 ? displayedMovies.length - 1 : prev - 1))}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-70 hover:opacity-100"
      >
        ❮
      </button>

      <button
        onClick={() => setActiveIndex((prev) => (prev + 1) % displayedMovies.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full opacity-70 hover:opacity-100"
      >
        ❯
      </button>

      {trailerMovies.map((item) => (
        <TrailerModal key={item.id} item={item} videos={videos} />
      ))}
    </div>
  );
};

export default HeroSlider;
