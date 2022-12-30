const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: {
    title: "Trending",
    url: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchNetflixOriginals: {
    title: "Netflix Originals",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  },
  fetchTopRated: {
    title: "Top Rated",
    url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  fetchActionMovies: {
    title: "Action",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  },
  fetchComedyMovies: {
    title: "Comedy",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: "Horror",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: "Romance",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  },
  fetchDocumentaries: {
    title: "Documentaries",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  },
  fetchActionTVShows: {
    title: "Action & Adventure",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10759`,
  },
  fetchAnimationTVShows: {
    title: "Animated",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16`,
  },
  fetchComedyTVShows: {
    title: "Comedy",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  },
  fetchRealityTVShows: {
    title: "Reality",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10764`,
  },
  fetchDramaTVShows: {
    title: "Drama",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=18`,
  },
  fetchDocuSeries: {
    title: "DocuSeries",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
  },
  fetchKidsShows: {
    title: "Kids",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10762`,
  },
  fetchFantasyShows: {
    title: "Sci-Fi & Fantasy",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10765`,
  },
};
export default requests;
