import React from 'react';
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

  const items: Movie[] = movieList[category]?.[type] ?? [];

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
