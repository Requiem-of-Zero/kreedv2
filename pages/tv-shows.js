import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import useAuth from "../hooks/useAuth";
import Banner from "../src/components/Banner";
import Header from "../src/components/Header";
import MediaRows from "../src/components/MediaRow";
import Modal from "../src/components/Modal";
import { Movie } from "../typings";
import requests from "../utils/requests";

export const getServerSideProps = async () => {
  const [
    actionShows,
    animationShows,
    comedyShows,
    realityShows,
    dramaShows,
    documentaryShows,
    kidsShows,
    fantansyShows,
  ] = await Promise.all([
    fetch(requests.fetchActionTVShows.url).then((res) => res.json()),
    fetch(requests.fetchAnimationTVShows.url).then((res) => res.json()),
    fetch(requests.fetchComedyTVShows.url).then((res) => res.json()),
    fetch(requests.fetchRealityTVShows.url).then((res) => res.json()),
    fetch(requests.fetchDramaTVShows.url).then((res) => res.json()),
    fetch(requests.fetchDocuSeries.url).then((res) => res.json()),
    fetch(requests.fetchKidsShows.url).then((res) => res.json()),
    fetch(requests.fetchFantasyShows.url).then((res) => res.json()),
  ]);

  return {
    props: {
      actionShows: actionShows.results,
      animationShows: animationShows.results,
      comedyShows: comedyShows.results,
      realityShows: realityShows.results,
      dramaShows: dramaShows.results,
      documentaryShows: documentaryShows.results,
      kidsShows: kidsShows.results,
      fantansyShows: fantansyShows.results,
    },
  };
};

interface Props {
  actionShows: Movie[];
  animationShows: Movie[];
  comedyShows: Movie[];
  realityShows: Movie[];
  dramaShows: Movie[];
  documentaryShows: Movie[];
  kidsShows: Movie[];
  fantansyShows: Movie[];
}

const TVShows = ({
  actionShows,
  animationShows,
  comedyShows,
  realityShows,
  dramaShows,
  documentaryShows,
  kidsShows,
  fantansyShows,
}: Props) => {
  const { logout, loading } = useAuth();
  const [showModal, setShowModal] = useRecoilState(modalState);
  if (loading) return null;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Kreed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Banner netflixOriginals={actionShows} />
        <section className="absolute md:space-y-24 md:pt-40">
          <MediaRows title="Animation" movies={animationShows} />
          <MediaRows title="Comedy" movies={comedyShows} />
          <MediaRows title="Action & Adventure" movies={actionShows} />
          {/* My Watchlist Component */}
          <MediaRows title="Reality" movies={realityShows} />
          <MediaRows title="Drama" movies={dramaShows} />
          <MediaRows title="Documentaries" movies={documentaryShows} />
          <MediaRows title="Sci-Fi & Fantasy" movies={fantansyShows} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default TVShows;
