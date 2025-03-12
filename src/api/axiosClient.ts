import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import queryString from "query-string"
import apiConfig from "./apiConfig"

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json"
  },
  paramsSerializer: (params: Record<string, any>): string =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey })
})

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
