import { useContextSelector } from 'use-context-selector';
import { TmdbContext, TmdbContextType } from '../context/TmdbContext';

export const useTmdb = (): TmdbContextType => {
  const movieList = useContextSelector(TmdbContext, (tmdb) => tmdb.movieList);
  const refreshMovieList = useContextSelector(TmdbContext, (tmdb) => tmdb.refreshMovieList);

  return { movieList, refreshMovieList };
};
