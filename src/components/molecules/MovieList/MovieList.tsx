import React, { useEffect, useRef } from 'react';
import { useTmdb } from '../../../hooks/useTmdb';
import { Category, MovieType, TVType } from '../../../context/TmdbContext';
import MovieCard from '../MovieCard/MovieCard';

export interface IMovie {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  overview?: string;
}

interface MovieListProps {
  category: Category;
  type: string;
  id?: number;
}

const MovieList: React.FC<MovieListProps> = ({ category, type, id }) => {
  const {
    movies,
    tvShows,
    similarMovies,
    getMoviesList,
    getTvList,
    getSimilarMovies,
  } = useTmdb();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchList = async () => {
      if (type !== 'similar') {
        if (category === Category.MOVIE) {
          await getMoviesList(type as MovieType, { page: 1 });
        } else {
          await getTvList(type as TVType, { page: 1 });
        }
      } else {
        if (id) {
          await getSimilarMovies(category, id);
        }
      }
    };
    fetchList();
  }, [category, type, id, getMoviesList, getTvList, getSimilarMovies]);

  let items: IMovie[] = [];
  if (type === 'similar') {
    items = similarMovies;
  } else if (category === Category.MOVIE) {
    items = movies;
  } else {
    items = tvShows;
  }

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="relative py-4">
      <button
        className="absolute top-1/2 -translate-y-1/2 left-0 bg-black/50 text-white text-2xl w-10 h-10 rounded-full cursor-pointer z-10"
        onClick={scrollLeft}
      >
        &#8249;
      </button>
      <div ref={containerRef} className="flex overflow-x-auto scroll-smooth gap-4 py-4">
        {items.map((item, i) => (
          <div key={i} className="flex-none w-[40%] sm:w-[40%] md:w-[30%] lg:w-[15%]">
            <MovieCard item={item} category={category} />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-0 bg-black/50 text-white text-2xl w-10 h-10 rounded-full cursor-pointer z-10"
        onClick={scrollRight}
      >
        &#8250;
      </button>
    </div>
  );
};

export default MovieList;
