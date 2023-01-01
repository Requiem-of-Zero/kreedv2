import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalAtomState } from "../../atoms/modalAtom";
import Header from "../../src/components/Header/Header";
import Modal from "../../src/components/Modal/Modal";
import { fetchMovie } from "../../utils/movies";

const getServerSideProps = async () => {
  const router = useRouter();
  const movieId = router.query;
  const movie = fetch(`https://api.themoviedb.org/3/movie/${movieId}`).then(
    (res) => res.json()
  );
  props: {
    movie: movie;
  }
};

const MovieShow = ({movie}) => {
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
