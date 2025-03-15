import React, { useEffect } from 'react';
import { useTmdb } from '../../../hooks/useTmdb';
import { Category, MovieType, TVType, Movie } from '../../../context/TmdbContext';
import MovieCard from '../MovieCard/MovieCard';

interface MovieListProps {
  category: Category;
  type: MovieType | TVType;
}

const MovieList: React.FC<MovieListProps> = ({ category, type }) => {
  const { moviesByCategory, getMoviesList, getTvList } = useTmdb();

  useEffect(() => {
    if (category === Category.MOVIE) {
      getMoviesList(type as MovieType, { page: 1 });
    } else {
      getTvList(type as TVType, { page: 1 });
    }
  }, [category, type, getMoviesList, getTvList]);

  const items: Movie[] =
    moviesByCategory[category]?.[type] ?? [];

  return (
    <div className="relative py-4 overflow-hidden">
      <div className="flex overflow-x-auto gap-4 py-4 hide-scrollbar">
        {items.map((item: Movie) => (
          <div key={item.id} className="flex-none w-[40%] sm:w-[40%] md:w-[30%] lg:w-[15%]">
            <MovieCard item={item} category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
