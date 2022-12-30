const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
// https://api.themoviedb.org/3/genre/movie/list?api_key=d12daebcca9553d839743717b41fa0d2&language=en-US
const requests = {
  // Index page requests
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
  //  TV Show Page Requests
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
  // Movie Page Requests
  fetchHistoryMovies: {
    title: 'History',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36`
  },
  fetchMusicMovies: {
    title: 'Music',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10402`
  },
  fetchFantasyMovies: {
    title: 'Fantasy',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=14`
  },
  fetchMysteryMovies: {
    title: 'Mystery',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=9648`
  },
  fetchWarMovies: {
    title: 'War',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10752`
  },
  fetchTVMovies: {
    title: 'TV Movies',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10770`
  },
  fetchWesternMovies: {
    title: 'Western',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=37`
  },
  fetchFamilyMovies: {
    title: 'Family',
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10751`
  }
};
export default requests;
