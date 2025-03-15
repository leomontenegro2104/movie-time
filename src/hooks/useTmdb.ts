import { useContext } from 'react';
import { TmdbContext } from '../context/TmdbContext';

export const useTmdb = () => {
  const context = useContext(TmdbContext);

  if (!context) {
    throw new Error('useTmdb must be used within a TmdbProvider');
  }

  return {
    moviesByCategory: context.moviesByCategory,
    getMoviesList: context.getMoviesList,
    getTvList: context.getTvList,
    search: context.search,
    detail: context.detail,
    getCredits: context.getCredits,
    getVideos: context.getVideos,
    getSimilarMovies: context.getSimilarMovies,
    movieDetail: context.movieDetail,
    credits: context.credits,
    videos: context.videos,
    searchResults: context.searchResults,
    searchTotalPages: context.searchTotalPages,
  };
};
