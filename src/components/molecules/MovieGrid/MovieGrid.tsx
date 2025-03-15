import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTmdb } from '../../../hooks/useTmdb';
import MovieCard from '../MovieCard/MovieCard';
import { OutlineButton } from '../../atoms/Button/Button';
import MovieSearch from './MovieSearch';
import { Category, MovieType, TVType } from '../../../api/tmdbApi';

interface MovieGridProps {
  category: Category;
  type?: string;
  id?: number;
}

const MovieGrid: React.FC<MovieGridProps> = ({ category, type, id }) => {
  const { keyword } = useParams<{ keyword?: string }>();
  const { moviesByCategory, getMoviesList, getTvList, search, getSimilarMovies } = useTmdb();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);

    if (type === 'similar' && id) {
      getSimilarMovies(category, id);
    } else if (!keyword) {
      if (category === Category.MOVIE) {
        getMoviesList(MovieType.UPCOMING, { page: 1 });
      } else {
        getTvList(TVType.POPULAR, { page: 1 });
      }
    } else {
      search(category, { page: 1, query: keyword });
    }
  }, [category, keyword, type, id, getMoviesList, getTvList, search, getSimilarMovies]);

  const items = moviesByCategory?.[category] ?? [];

  const loadMore = useCallback(() => {
    if (type === 'similar') return;

    setPage((prev) => prev + 1);

    if (category === Category.MOVIE) {
      getMoviesList(MovieType.UPCOMING, { page: page + 1 }, true);
    } else {
      getTvList(TVType.POPULAR, { page: page + 1 }, true);
    }
  }, [category, page, type, getMoviesList, getTvList]);

  return (
    <>
      <div className="mb-12">
        <MovieSearch category={category} keyword={keyword || ''} />
      </div>
      <div className="grid grid-cols-auto-fill-200 gap-5 mb-12">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => <MovieCard key={item.id} item={item} category={category} />)
        ) : (
          <p className="text-center text-white">No results found.</p>
        )}
      </div>
      {type !== 'similar' && (
        <div className="text-center">
          <OutlineButton onClick={loadMore}>Load more</OutlineButton>
        </div>
      )}
    </>
  );
};

export default MovieGrid;
