export async function fetchMovie(currentMovie, setTrailer, setGenres) {
  const data = await fetch(
    `https://api.themoviedb.org/3/${
      currentMovie.media_type === "tv" ? "tv" : "movie"
    }/${currentMovie.id}?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=en-US&append_to_response=videos`
  ).then((res) => res.json());

  if (data.videos) {
    const vidIdx = data.videos.results.findIndex(
      (element) => element.type === "Trailer"
    );
    setTrailer(data.videos.results[vidIdx] && data.videos.results[vidIdx].key);
  }
  if (data.genres) {
    setGenres(data.genres);
  }
}
