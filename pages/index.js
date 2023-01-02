import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalAtomState, movieAtomState } from "../atoms/modalAtom";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import Banner from "../src/components/Banner/Banner";
import Header from "../src/components/Header/Header";
import MediaRows from "../src/components/MediaRow/MediaRows";
import Modal from "../src/components/Modal/Modal";
import requests from "../utils/requests";

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals.url).then((res) => res.json()),
    fetch(requests.fetchTrending.url).then((res) => res.json()),
    fetch(requests.fetchTopRated.url).then((res) => res.json()),
    fetch(requests.fetchActionMovies.url).then((res) => res.json()),
    fetch(requests.fetchComedyMovies.url).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies.url).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies.url).then((res) => res.json()),
    fetch(requests.fetchDocumentaries.url).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) => {
  const { loading, user } = useAuth();
  const [showModal, setShowModal] = useRecoilState(modalAtomState);
  const featuredMovie = useRecoilState(movieAtomState)
  const list = user && useList(user.uid);

  if (loading) return null;
  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[100vh] ${
        showModal && "h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Kreed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="pb-2">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="absolute pb-20 md:space-y-24 md:pt-40">
          <MediaRows title="Trending Now" movies={trendingNow} />
          <MediaRows title="Top Rated" movies={topRated} />
          <MediaRows title="Action Thrillers" movies={actionMovies} />
          {/* My Watchlist Component */}
          {list && list.length > 0 && <MediaRows title='My Watchlist' movies={list} />}
          <MediaRows title="Comedies" movies={comedyMovies} />
          <MediaRows title="Horror Movies" movies={horrorMovies} />
          <MediaRows title="Romance Movies" movies={romanceMovies} />
          <MediaRows title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;
