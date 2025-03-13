import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params: Record<string, any>): string =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

const generateCacheKey = (config: InternalAxiosRequestConfig): string => {
  const { url, params } = config;
  return `${url}?${queryString.stringify(params ?? {})}`;
};

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.method === 'get') {
      const cacheKey = generateCacheKey(config);
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        console.log(`🟢 Cache hit: ${cacheKey}`);
        return Promise.reject({ fromCache: true, data: JSON.parse(cachedData) });
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.method === 'get') {
      const cacheKey = generateCacheKey(response.config);
      sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      console.log(`🟡 Cache saved: ${cacheKey}`);
    }
    return response;
  },
  (error) => {
    if (error.fromCache) {
      return Promise.resolve({ data: error.data });
    }

    console.error('🔴 Axios Error:', error.response || error.message);
    return Promise.reject(error);
  },
);

export default axiosClient;
