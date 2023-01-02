import Head from "next/head";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalAtomState } from "../../atoms/modalAtom";
import { IMAGE_BASE_URL } from "../../constants/media";
import Header from "../../src/components/Header/Header";
import Modal from "../../src/components/Modal/Modal";
import findSeasonFromMonth from "../../utils/findSeasonFromMonth";
import formatMonths from "../../utils/formatMonth";
import { getAllGenres } from "../../utils/movies";

export const getServerSideProps = async (context) => {
  const movieId = context.query.movieId;

  const [movie] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    ).then((res) => res.json()),
  ]);

  return {
    props: {
      movie: movie,
    },
  };
};

const MovieShow = ({ movie }) => {
  console.log("🚀 ~ file: [movieId].js:25 ~ MovieShow ~ movie", movie);
  const [showModal, setShowModal] = useRecoilState(modalAtomState);
  const {
    overview,
    original_title,
    title,
    tagline,
    genres,
    status,
    release_date,
    runtime,
    original_language,
    vote_count,
  } = movie;
  const [year, month, day] = release_date.split("-");
  const season = findSeasonFromMonth(month);
  const genresStr = getAllGenres(genres);
  return (
    <div>
      <Head>
        <title>Kreed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="mt-[100px] px-12 flex gap-10">
        <div className="left">
          <Image
            src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
            width={800}
            height={1000}
          />
        </div>
        <div className="right flex flex-col gap-20">
          <div className="top">
            <div className="movie-info w-[50%] space-y-4">
              <h1>{title || original_title}</h1>
              {tagline && <h2>{tagline}</h2>}
              <p>{overview}</p>
            </div>
          </div>
          <div className="bottom flex gap-20">
            <div className="left">
              <p>
                <span>Type: </span>Movie
              </p>
              <p>
                <span>Release Date: </span>
                {`${formatMonths[month]} ${day}, ${year}`}
              </p>
              <p>
                <span>Status: </span>
                {status}
              </p>
              <p>
                <span>Genres: </span>
                {genresStr}
              </p>
            </div>
            <div className="right">
              <p>
                <span>Language: </span>
                {original_language.toUpperCase()}
              </p>
              <p>
                <span>Total Votes: </span>
                {vote_count}
              </p>
              <p>
                <span>Premiered: </span>
                {`${season} ${year}`}
              </p>
              <p>
                <span>Duration: </span>
                {`${runtime} min`}
              </p>
            </div>
          </div>
        </div>
      </section>
      {showModal && <Modal />}
    </div>
  );
};

export default MovieShow;
