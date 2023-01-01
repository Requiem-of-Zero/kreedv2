import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalAtomState } from "../../atoms/modalAtom";
import Header from "../../src/components/Header/Header";
import Modal from "../../src/components/Modal/Modal";

const MovieShow = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useRecoilState(modalAtomState);
  const {movieId} = router.query

  return (
    <div>
      <Head>
        <title>Kreed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        
      </main>
      {showModal && <Modal />}
    </div>
  );
}

export default MovieShow