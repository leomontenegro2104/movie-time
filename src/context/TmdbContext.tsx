/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { createContext } from 'use-context-selector';
import axiosClient from '../api/axiosClient';

export enum Category {
  MOVIE = 'movie',
  TV = 'tv',
}

export enum MovieType {
  UPCOMING = 'upcoming',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
}

export enum TVType {
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  ON_THE_AIR = 'on_the_air',
}

export interface RequestParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ApiResponse<T> {
  results: T[];
  total_pages: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  genres: Genre[];
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  production_companies: ProductionCompany[];
  homepage: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path?: string;
  character: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieTypeGroup {
  upcoming: Movie[];
  popular: Movie[];
  top_rated: Movie[];
}

export interface TVTypeGroup {
  popular: Movie[];
  top_rated: Movie[];
  on_the_air: Movie[];
}

export interface MovieList {
  movie: MovieTypeGroup;
  tv: TVTypeGroup;
}

export interface TmdbContextType {
  movieList: MovieList;
  refreshMovieList: () => Promise<void>;
  loadMore: (category: Category) => Promise<void>;
  movieDetail: Movie | null;
  movieCasts: Cast[] | null;
  movieVideos: Video[] | null;
  setMovieId: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>
}

export const TmdbContext = createContext<TmdbContextType>({} as TmdbContextType);

export const TmdbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movieList, setMovieList] = useState<MovieList>({
    movie: { upcoming: [], popular: [], top_rated: [] },
    tv: { popular: [], top_rated: [], on_the_air: [] },
  });

  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [movieId, setMovieId] = useState<string>('');
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);
  const [movieCasts, setMoviesCast] = useState<Cast[] | null>(null);
  const [movieVideos, setMovieVideos] = useState<Video[] | null>(null);

  async function refreshMovieList() {
    try {
      const movieTypes: MovieType[] = [MovieType.UPCOMING, MovieType.POPULAR, MovieType.TOP_RATED];
      const tvTypes: TVType[] = [TVType.POPULAR, TVType.TOP_RATED, TVType.ON_THE_AIR];

      const moviePromises = movieTypes.map((type) =>
        axiosClient.get<ApiResponse<Movie>>(`movie/${type}`, { params: { page } })
      );
      const tvPromises = tvTypes.map((type) =>
        axiosClient.get<ApiResponse<Movie>>(`tv/${type}`, { params: { page } })
      );

      const movieResults = await Promise.all(moviePromises);
      const tvResults = await Promise.all(tvPromises);
      console.log('tvResults', tvResults);


      const newMovieList: MovieList = {
        movie: {
          upcoming: (movieResults[0] as any).results,
          popular: (movieResults[1] as any).results,
          top_rated: (movieResults[2] as any).results,
        },
        tv: {
          popular: (tvResults[0] as any).results,
          top_rated: (tvResults[1] as any).results,
          on_the_air: (tvResults[2] as any).results,
        },
      };

      setMovieList(newMovieList);
    } catch (error) {
      console.error('Error fetching movie list:', error);
    }
  }

  async function loadMore(category: Category) {
    try {
      const nextPage = page + 1;
      setPage(nextPage);

      if (category === Category.MOVIE) {
        const movieTypes: MovieType[] = [MovieType.UPCOMING, MovieType.POPULAR, MovieType.TOP_RATED];

        const moviePromises = movieTypes.map((type) =>
          axiosClient.get<ApiResponse<Movie>>(`movie/${type}`, { params: { page: nextPage } })
        );

        const movieResults = await Promise.all(moviePromises);

        setMovieList((prev) => ({
          ...prev,
          movie: {
            upcoming: [...prev.movie.upcoming, ...movieResults[0].data.results],
            popular: [...prev.movie.popular, ...movieResults[1].data.results],
            top_rated: [...prev.movie.top_rated, ...movieResults[2].data.results],
          },
        }));
      } else {
        const tvTypes: TVType[] = [TVType.POPULAR, TVType.TOP_RATED, TVType.ON_THE_AIR];

        const tvPromises = tvTypes.map((type) =>
          axiosClient.get<ApiResponse<Movie>>(`tv/${type}`, { params: { page: nextPage } })
        );

        const tvResults = await Promise.all(tvPromises);

        setMovieList((prev) => ({
          ...prev,
          tv: {
            popular: [...prev.tv.popular, ...tvResults[0].data.results],
            top_rated: [...prev.tv.top_rated, ...tvResults[1].data.results],
            on_the_air: [...prev.tv.on_the_air, ...tvResults[2].data.results],
          },
        }));
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    }
  }

  async function getMovieDetail(category: Category, id: string) {
    try {
      const response = await axiosClient.get<Movie>(`${category}/${id}`);

      setMovieDetail(response as any);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setMovieDetail(null);
    }
  }

  async function getCastList(category: Category, id: string) {
    try {
      const response = await axiosClient.get<{ cast: Cast[] }>(`${category}/${id}/credits`);
      setMoviesCast((response as any).cast.slice(0, 5));

    } catch (error) {
      console.error('Error fetching cast:', error);
      setMoviesCast([]);
    }
  }

  async function getVideos(category: Category, id: string) {
    try {
      const response = await axiosClient.get<{ results: Video[] }>(`${category}/${id}/videos`);
      setMovieVideos((response as any).results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching videos:', error);
      setMovieVideos([]);
    }
  }

  useEffect(() => {
    refreshMovieList();
  }, []);

  useEffect(() => {
    if (category && movieId) {
      getMovieDetail(category, movieId);
      getCastList(category, movieId);
      getVideos(category, movieId);
    }
  }, [category, movieId]);

  return (
    <TmdbContext.Provider value={
      {
        movieList,
        refreshMovieList,
        loadMore,
        movieDetail,
        movieCasts,
        movieVideos,
        setMovieId,
        setCategory
      }
    }>
      {children}
    </TmdbContext.Provider>
  );
};
