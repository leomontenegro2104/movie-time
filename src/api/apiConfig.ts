const apiConfig = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  originalImage: (imgPath: string): string =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string): string =>
    `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig
