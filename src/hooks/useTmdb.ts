import { useContextSelector } from 'use-context-selector';
import { TmdbContext, TmdbContextType } from '../context/TmdbContext';

export const useTmdb = (): TmdbContextType => {
  const movieList = useContextSelector(TmdbContext, (tmdb) => tmdb.movieList);
  const refreshMovieList = useContextSelector(TmdbContext, (tmdb) => tmdb.refreshMovieList);
  const loadMore = useContextSelector(TmdbContext, (tmdb) => tmdb.loadMore);
  const movieDetail = useContextSelector(TmdbContext, (tmdb) => tmdb.movieDetail);
  const movieCasts = useContextSelector(TmdbContext, (tmdb) => tmdb.movieCasts);
  const movieVideos = useContextSelector(TmdbContext, (tmdb) => tmdb.movieVideos);
  const setMovieId = useContextSelector(TmdbContext, (tmdb) => tmdb.setMovieId);
  const setCategory = useContextSelector(TmdbContext, (tmdb) => tmdb.setCategory);

  return {
    movieList,
    refreshMovieList,
    loadMore,
    movieDetail,
    movieCasts,
    movieVideos,
    setMovieId,
    setCategory,
  };
};
