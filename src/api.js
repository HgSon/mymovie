import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: "2867ad43a6f4955f1b44469f1dc053be", language: "en-US" },
});
export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, { params: { append_to_response: "videos" } }),
  search: (term) =>
    api.get(`search/movie`, { params: { query: encodeURIComponent(term) } }),
  movieGenres: () => api.get("genre/movie/list"),
  movieCollection: (id) => api.get(`collection/${id}`),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: (id) =>
    api.get(`tv/${id}`, { params: { append_to_response: "videos" } }),
  search: (term) => api.get("search/tv", { params: { query: term } }),
  showGenres: () => api.get("genre/tv/list"),
};
