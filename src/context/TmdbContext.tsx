import { createContext, useState, useCallback, useMemo } from "react";
import axiosClient from "../api/axiosClient";

export enum Category {
  MOVIE = "movie",
  TV = "tv",
}

export enum MovieType {
  UPCOMING = "upcoming",
  POPULAR = "popular",
  TOP_RATED = "top_rated",
}

export enum TVType {
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  ON_THE_AIR = "on_the_air",
}

export interface RequestParams {
  [key: string]: string | number | boolean | undefined;
}

export interface TmdbResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

interface TmdbContextType {
  movies: Movie[];
  tvShows: Movie[];
  videos: { key: string }[];
  searchResults: Movie[];
  movieDetail: Movie | null;
  credits: { name: string; job: string }[];
  similarMovies: Movie[];

  getMoviesList: (type: MovieType, params?: RequestParams) => Promise<void>;
  getTvList: (type: TVType, params?: RequestParams) => Promise<void>;
  getVideos: (cate: Category, id: string | number) => Promise<{ key: string }[]>;
  search: (cate: Category, params?: RequestParams) => Promise<void>;
  detail: (cate: Category, id: string | number, params?: RequestParams) => Promise<void>;
  getCredits: (cate: Category, id: string | number) => Promise<void>;
  getSimilarMovies: (cate: Category, id: string | number) => Promise<void>;
}

export const TmdbContext = createContext<TmdbContextType | undefined>(undefined);

export const TmdbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<Movie[]>([]);
  const [videos, setVideos] = useState<{ key: string }[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<{ name: string; job: string }[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  const fetchData = useCallback(async <T,>(url: string, params?: RequestParams): Promise<T[]> => {
    try {
      const response = await axiosClient.get<TmdbResponse<T>>(url, { params });

      if (!response || !response.data.results) {
        throw new Error("Invalid API response: Missing 'results' field.");
      }

      return response.data.results;
    } catch (error) {
      console.error("TMDB API Error:", error);
      return [];
    }
  }, []);

  const getMoviesList = useCallback(async (type: MovieType, params?: RequestParams) => {
    const data = await fetchData<Movie>(`movie/${type}`, params);
    setMovies(data);
  }, [fetchData]);

  const getTvList = useCallback(async (type: TVType, params?: RequestParams) => {
    const data = await fetchData<Movie>(`tv/${type}`, params);
    setTvShows(data);
  }, [fetchData]);

  const getVideos = useCallback(async (cate: Category, id: string | number): Promise<{ key: string }[]> => {
    const data = await fetchData<{ key: string }>(`${cate}/${id}/videos`);
    setVideos(data);
    return data;
  }, [fetchData]);


  const search = useCallback(async (cate: Category, params?: RequestParams) => {
    const data = await fetchData<Movie>(`search/${cate}`, params);
    setSearchResults(data);
  }, [fetchData]);

  const detail = useCallback(async (cate: Category, id: string | number, params?: RequestParams) => {
    try {
      const response = await axiosClient.get<Movie>(`${cate}/${id}`, { params });
      setMovieDetail(response.data);
    } catch (error) {
      console.error("TMDB API Detail Error:", error);
    }
  }, []);

  const getCredits = useCallback(async (cate: Category, id: string | number) => {
    const data = await fetchData<{ name: string; job: string }>(`${cate}/${id}/credits`);
    setCredits(data);
  }, [fetchData]);

  const getSimilarMovies = useCallback(async (cate: Category, id: string | number) => {
    const data = await fetchData<Movie>(`${cate}/${id}/similar`);
    setSimilarMovies(data);
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
      movies,
      tvShows,
      videos,
      searchResults,
      movieDetail,
      credits,
      similarMovies,
      getMoviesList,
      getTvList,
      getVideos,
      search,
      detail,
      getCredits,
      getSimilarMovies
    }),
    [movies, tvShows, videos, searchResults, movieDetail, credits, similarMovies, getMoviesList, getTvList, getVideos, search, detail, getCredits, getSimilarMovies]
  );

  return <TmdbContext.Provider value={contextValue}>{children}</TmdbContext.Provider>;
};
