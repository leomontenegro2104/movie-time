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

export type MovieResponse = TmdbResponse<Movie>;

interface TmdbContextType {
  moviesByCategory: Record<Category, Record<string, Movie[]>>;
  moviesTotalPages: Record<Category, Record<string, number>>;
  movieDetail: Movie | null;
  credits: { name: string; job: string }[];
  videos: { key: string }[];
  searchResults: Movie[];
  searchTotalPages: number;
  getMoviesList: (type: MovieType, params?: RequestParams, append?: boolean) => Promise<void>;
  getTvList: (type: TVType, params?: RequestParams, append?: boolean) => Promise<void>;
  search: (category: Category, params?: RequestParams, append?: boolean) => Promise<void>;
  detail: (category: Category, id: string | number, params?: RequestParams) => Promise<void>;
  getCredits: (category: Category, id: string | number) => Promise<void>;
  getVideos: (category: Category, id: string | number) => Promise<{ key: string }[]>;
  getSimilarMovies: (category: Category, id: string | number) => Promise<void>;
}

export const TmdbContext = createContext<TmdbContextType | undefined>(undefined);

export const TmdbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moviesByCategory, setMoviesByCategory] = useState<Record<Category, Record<string, Movie[]>>>({
    [Category.MOVIE]: {},
    [Category.TV]: {},
  });

  const [moviesTotalPages, setMoviesTotalPages] = useState<Record<Category, Record<string, number>>>({
    [Category.MOVIE]: {},
    [Category.TV]: {},
  });

  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<{ name: string; job: string }[]>([]);
  const [videos, setVideos] = useState<{ key: string }[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchTotalPages, setSearchTotalPages] = useState<number>(0);

  const fetchData = useCallback(async <T,>(url: string, params?: RequestParams): Promise<TmdbResponse<T>> => {
    try {
      const response = await axiosClient.get<TmdbResponse<T>>(url, { params });
      if (!response || !response.data.results) {
        throw new Error("Invalid API response: Missing 'results' field.");
      }
      return response.data;
    } catch (error) {
      console.error("TMDB API Error:", error);
      return { page: 0, results: [], total_pages: 0, total_results: 0 };
    }
  }, []);

  const getMoviesList = useCallback(async (type: MovieType, params?: RequestParams, append: boolean = false) => {
    const data = await fetchData<Movie>(`movie/${type}`, params);
    setMoviesByCategory((prev) => ({
      ...prev,
      [Category.MOVIE]: {
        ...prev[Category.MOVIE],
        [type]: append ? [...(prev[Category.MOVIE][type] || []), ...data.results] : data.results,
      },
    }));
    setMoviesTotalPages((prev) => ({
      ...prev,
      [Category.MOVIE]: { ...prev[Category.MOVIE], [type]: data.total_pages },
    }));
  }, [fetchData]);

  const getTvList = useCallback(async (type: TVType, params?: RequestParams, append: boolean = false) => {
    const data = await fetchData<Movie>(`tv/${type}`, params);
    setMoviesByCategory((prev) => ({
      ...prev,
      [Category.TV]: {
        ...prev[Category.TV],
        [type]: append ? [...(prev[Category.TV][type] || []), ...data.results] : data.results,
      },
    }));
    setMoviesTotalPages((prev) => ({
      ...prev,
      [Category.TV]: { ...prev[Category.TV], [type]: data.total_pages },
    }));
  }, [fetchData]);

  const search = useCallback(async (category: Category, params?: RequestParams, append: boolean = false) => {
    const data = await fetchData<Movie>(`search/${category}`, params);
    setSearchResults((prev) => (append ? [...prev, ...data.results] : data.results));
    setSearchTotalPages(data.total_pages);
  }, [fetchData]);

  const detail = useCallback(async (category: Category, id: string | number, params?: RequestParams) => {
    try {
      const response = await axiosClient.get<Movie>(`${category}/${id}`, { params });
      setMovieDetail(response.data);
    } catch (error) {
      console.error("TMDB API Detail Error:", error);
    }
  }, []);

  const getCredits = useCallback(async (category: Category, id: string | number) => {
    const data = await fetchData<{ name: string; job: string }>(`${category}/${id}/credits`);
    setCredits(data.results);
  }, [fetchData]);

  const getVideos = useCallback(async (category: Category, id: string | number): Promise<{ key: string }[]> => {
    const data = await fetchData<{ key: string }>(`${category}/${id}/videos`);
    setVideos(data.results);
    return data.results;
  }, [fetchData]);

  const getSimilarMovies = useCallback(async (category: Category, id: string | number) => {
    const data = await fetchData<Movie>(`${category}/${id}/similar`);
    setMoviesByCategory((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        similar: data.results,
      },
    }));
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
      moviesByCategory,
      moviesTotalPages,
      movieDetail,
      credits,
      videos,
      searchResults,
      searchTotalPages,
      getMoviesList,
      getTvList,
      search,
      detail,
      getCredits,
      getVideos,
      getSimilarMovies,
    }),
    [moviesByCategory, moviesTotalPages, movieDetail, credits, videos, searchResults, searchTotalPages, getMoviesList, getTvList, search, detail, getCredits, getVideos, getSimilarMovies]
  );

  return <TmdbContext.Provider value={contextValue}>{children}</TmdbContext.Provider>;
};
