import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../src/components/Header/Header";

const MovieShow = () => {
  const router = useRouter();

  const {movieId} = router.query

  return (
    <div>
      <Head>
        <title>Kreed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export default MovieShow