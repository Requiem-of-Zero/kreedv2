import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalAtomState } from "../atoms/modalAtom";
import useAuth from "../hooks/useAuth";
import Banner from "../src/components/Banner/Banner";
import Header from "../src/components/Header/Header";
import MediaRows from "../src/components/MediaRow/MediaRows";
import Modal from "../src/components/Modal/Modal";
import requests from "../utils/requests";

export const getServerSideProps = async () => {
  const [
    actionShowsPromise,
    animationShowsPromise,
    comedyShowsPromise,
    realityShowsPromise,
    dramaShowsPromise,
    documentaryShowsPromise,
    kidsShowsPromise,
    fantansyShowsPromise,
  ] = [
    fetch(requests.fetchActionTVShows.url),
    fetch(requests.fetchAnimationTVShows.url),
    fetch(requests.fetchComedyTVShows.url),
    fetch(requests.fetchRealityTVShows.url),
    fetch(requests.fetchDramaTVShows.url),
    fetch(requests.fetchDocuSeries.url),
    fetch(requests.fetchKidsShows.url),
    fetch(requests.fetchFantasyShows.url),
  ];
  
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
    actionShowsPromise.then((res) => res.json()),
    animationShowsPromise.then((res) => res.json()),
    comedyShowsPromise.then((res) => res.json()),
    realityShowsPromise.then((res) => res.json()),
    dramaShowsPromise.then((res) => res.json()),
    documentaryShowsPromise.then((res) => res.json()),
    kidsShowsPromise.then((res) => res.json()),
    fantansyShowsPromise.then((res) => res.json()),
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


const TVShows = ({
  actionShows,
  animationShows,
  comedyShows,
  realityShows,
  dramaShows,
  documentaryShows,
  kidsShows,
  fantansyShows,
}) => {
  const { logout, loading } = useAuth();
  const [showModal, setShowModal] = useRecoilState(modalAtomState);

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
        <section className="absolute pb-20 md:space-y-24 md:pt-40">
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
