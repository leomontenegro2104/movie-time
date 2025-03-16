interface ApiConfigType {
  baseUrl: string;
  apiKey: string;
  originalImage: (imgPath: string) => string;
  w500Image: (imgPath: string) => string;
}

const apiConfig: ApiConfigType = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
