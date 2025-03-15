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

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
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
}

export const TmdbContext = createContext<TmdbContextType>({} as TmdbContextType);

export const TmdbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movieList, setMovieList] = useState<MovieList>({
    movie: { upcoming: [], popular: [], top_rated: [] },
    tv: { popular: [], top_rated: [], on_the_air: [] },
  });

  async function refreshMovieList() {
    try {
      const movieTypes: MovieType[] = [MovieType.UPCOMING, MovieType.POPULAR, MovieType.TOP_RATED];
      const tvTypes: TVType[] = [TVType.POPULAR, TVType.TOP_RATED, TVType.ON_THE_AIR];

      const moviePromises = movieTypes.map((type) =>
        axiosClient.get<ApiResponse<Movie>>(`movie/${type}`, { params: { page: 1 } })
      );
      const tvPromises = tvTypes.map((type) =>
        axiosClient.get<ApiResponse<Movie>>(`tv/${type}`, { params: { page: 1 } })
      );

      console.log('moviePromises:', moviePromises);

      const movieResults = await Promise.all(moviePromises);
      const tvResults = await Promise.all(tvPromises);

      console.log('movieResults:', movieResults);

      const newMovieList: MovieList = {
        movie: {
          upcoming: movieResults[0].results,
          popular: movieResults[1].results,
          top_rated: movieResults[2].results,
        },
        tv: {
          popular: tvResults[0].results,
          top_rated: tvResults[1].results,
          on_the_air: tvResults[2].results,
        },
      };
      console.log('newMovieList:', newMovieList);

      setMovieList(newMovieList);
    } catch (error) {
      console.error('Error fetching movie list:', error);
    }
  }

  useEffect(() => {
    refreshMovieList();
  }, []);

  return (
    <TmdbContext.Provider value={{ movieList, refreshMovieList }}>
      {children}
    </TmdbContext.Provider>
  );
};
