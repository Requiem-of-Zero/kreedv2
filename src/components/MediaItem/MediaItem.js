import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalAtomState, movieAtomState } from "../../../atoms/modalAtom";

const MediaItem = ({ movie }) => {
  const [showModal, setShowModal] = useRecoilState(modalAtomState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieAtomState);

  return (
    <li
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          (movie && movie.backdrop_path) || movie.poster_path
        }`}
        alt="movie thumbnail"
        className="rounded-sm object-cover no-drag md:rounded"
        placeholder="blur"
        fill={true}
        loading="lazy"
        object-fit="cover"
        draggable='false'
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        blurDataURL={`https://image.tmdb.org/t/p/w500${
          (movie && movie.backdrop_path) || movie.poster_path
        }`}
      />
    </li>
  );
};

export default MediaItem;
