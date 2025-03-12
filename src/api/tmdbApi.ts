import axiosClient from "./axiosClient"

export enum Category {
  Movie = "movie",
  TV = "tv"
}

export enum MovieType {
  Upcoming = "upcoming",
  Popular = "popular",
  TopRated = "top_rated"
}

export enum TVType {
  Popular = "popular",
  TopRated = "top_rated",
  OnTheAir = "on_the_air"
}

interface RequestParams {
  [key: string]: string | number | boolean | undefined
}

const tmdbApi = {
  getMoviesList: (type: keyof typeof MovieType, params?: RequestParams) => {
    const url = `movie/${MovieType[type]}`
    return axiosClient.get(url, { params })
  },

  getTvList: (type: keyof typeof TVType, params?: RequestParams) => {
    const url = `tv/${TVType[type]}`
    return axiosClient.get(url, { params })
  },

  getVideos: (cate: keyof typeof Category, id: string | number) => {
    const url = `${Category[cate]}/${id}/videos`
    return axiosClient.get(url, { params: {} })
  },

  search: (cate: keyof typeof Category, params?: RequestParams) => {
    const url = `search/${Category[cate]}`
    return axiosClient.get(url, { params })
  },

  detail: (cate: keyof typeof Category, id: string | number, params?: RequestParams) => {
    const url = `${Category[cate]}/${id}`
    return axiosClient.get(url, { params })
  },

  credits: (cate: keyof typeof Category, id: string | number) => {
    const url = `${Category[cate]}/${id}/credits`
    return axiosClient.get(url, { params: {} })
  },

  similar: (cate: keyof typeof Category, id: string | number) => {
    const url = `${Category[cate]}/${id}/similar`
    return axiosClient.get(url, { params: {} })
  }
}

export default tmdbApi
