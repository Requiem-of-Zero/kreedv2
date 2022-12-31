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
    historyMovies,
    musicalMovies,
    fantasyMovies,
    mysteryMovies,
    warMovies,
    televisionMovies,
    westernMovies,
    familyMovies,
  ] = await Promise.all([
    fetch(requests.fetchHistoryMovies.url).then((res) => res.json()),
    fetch(requests.fetchMusicMovies.url).then((res) => res.json()),
    fetch(requests.fetchFantasyMovies.url).then((res) => res.json()),
    fetch(requests.fetchMysteryMovies.url).then((res) => res.json()),
    fetch(requests.fetchWarMovies.url).then((res) => res.json()),
    fetch(requests.fetchTVMovies.url).then((res) => res.json()),
    fetch(requests.fetchWesternMovies.url).then((res) => res.json()),
    fetch(requests.fetchFamilyMovies.url).then((res) => res.json()),
  ]);

  return {
    props: {
      historyMovies: historyMovies.results,
      musicalMovies: musicalMovies.results,
      fantasyMovies: fantasyMovies.results,
      mysteryMovies: mysteryMovies.results,
      warMovies: warMovies.results,
      televisionMovies: televisionMovies.results,
      westernMovies: westernMovies.results,
      familyMovies: familyMovies.results,
    },
  };
};

const TVShows = ({
  historyMovies,
  musicalMovies,
  fantasyMovies,
  mysteryMovies,
  warMovies,
  televisionMovies,
  westernMovies,
  familyMovies,
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
        <Banner netflixOriginals={historyMovies} />
        <section className="absolute pb-20 md:space-y-24 md:pt-40">
          <MediaRows title="Musical" movies={musicalMovies} />
          <MediaRows title="Fantasy" movies={fantasyMovies} />
          <MediaRows title="Mystery" movies={mysteryMovies} />
          {/* My Watchlist Component */}
          <MediaRows title="War" movies={warMovies} />
          <MediaRows title="TV" movies={televisionMovies} />
          <MediaRows title="Western" movies={westernMovies} />
          <MediaRows title="Family" movies={familyMovies} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default TVShows;
