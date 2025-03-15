import axiosClient from './axiosClient';

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

const tmdbApi = {
  getMoviesList: <T>(type: MovieType, params?: RequestParams): Promise<ApiResponse<T>> => {
    const url = `movie/${type}`;
    return axiosClient.get<ApiResponse<T>>(url, { params }).then((res) => res.data);
  },
  getTvList: <T>(type: TVType, params?: RequestParams): Promise<ApiResponse<T>> => {
    const url = `tv/${type}`;
    return axiosClient.get<ApiResponse<T>>(url, { params }).then((res) => res.data);
  },
  search: <T>(category: Category, params?: RequestParams): Promise<ApiResponse<T>> => {
    const url = `search/${category}`;
    return axiosClient.get<ApiResponse<T>>(url, { params }).then((res) => res.data);
  },
  detail: <T>(category: Category, id: string | number, params?: RequestParams): Promise<T> => {
    const url = `${category}/${id}`;
    return axiosClient.get<T>(url, { params }).then((res) => res.data);
  },
  getCredits: <T>(category: Category, id: string | number): Promise<ApiResponse<T>> => {
    const url = `${category}/${id}/credits`;
    return axiosClient.get<ApiResponse<T>>(url, { params: {} }).then((res) => res.data);
  },
  getVideos: <T>(category: Category, id: string | number): Promise<ApiResponse<T>> => {
    const url = `${category}/${id}/videos`;
    return axiosClient.get<ApiResponse<T>>(url, { params: {} }).then((res) => res.data);
  },
  getSimilarMovies: <T>(category: Category, id: string | number): Promise<ApiResponse<T>> => {
    const url = `${category}/${id}/similar`;
    return axiosClient.get<ApiResponse<T>>(url, { params: {} }).then((res) => res.data);
  },
};

export default tmdbApi;
