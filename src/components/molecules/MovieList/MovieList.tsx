import React, { useRef, useState } from 'react';
import { useTmdb } from '../../../hooks/useTmdb';
import MovieCard from '../MovieCard/MovieCard';
import { Category, MovieType, TVType } from '../../../context/TmdbContext';
import { Movie } from '../../../context/TmdbContext';

interface MovieListProps {
  category: Category;
  type: MovieType | TVType;
}

const MovieList: React.FC<MovieListProps> = ({ category, type }) => {
  const { movieList } = useTmdb();
  const items: Movie[] =
    category === Category.MOVIE
      ? (movieList[Category.MOVIE]?.[type as MovieType] ?? [])
      : (movieList[Category.TV]?.[type as TVType] ?? []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollAmount = 300;

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scrollAmount;
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <div className="relative py-4 overflow-hidden">
      <button
        className={`absolute w-14 left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 text-2xl transition hover:bg-black/80 rounded-full z-10 hidden md:block ${scrollPosition <= 0 ? 'opacity-0' : 'opacity-100'
          }`}
        onClick={handlePrev}
      >
        &#8249;
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 py-4 hide-scrollbar scroll-smooth"
      >
        {items.map((item: Movie) => (
          <div key={item.id} className="flex-none w-[40%] sm:w-[40%] md:w-[30%] lg:w-[15%]">
            <MovieCard item={item} category={category} />
          </div>
        ))}
      </div>

      <button
        className="absolute w-14 right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 text-2xl transition hover:bg-black/80 rounded-full z-10  hidden md:block"
        onClick={handleNext}
      >
        &#8250;
      </button>
    </div>
  );
};

export default MovieList;
