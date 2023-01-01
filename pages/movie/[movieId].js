import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalAtomState } from "../../atoms/modalAtom";
import Header from "../../src/components/Header/Header";
import Modal from "../../src/components/Modal/Modal";
import { fetchMovie, getMovieSpecificFromTMDB } from "../../utils/movies";

export const getServerSideProps = async (context) => {
  const movieId = context.query.movieId;
 
  const [movie] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    ).then((res) => res.json()),
  ]);

  return {
    props: {
      movie: movie
    },
  };
};

const MovieShow = ({ movie }) => {
  const router = useRouter();
  const { movieId } = router.query;
  const [showModal, setShowModal] = useRecoilState(modalAtomState);

  console.log(movie);
  return (
    <div>
      <Head>
        <title>Kreed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main></main>
      {showModal && <Modal />}
    </div>
  );
};

export default MovieShow;
