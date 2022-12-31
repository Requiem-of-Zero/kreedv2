import {
  HandThumbUpIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import MuiModal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../../atoms/modalAtom";
import { IMAGE_BASE_URL } from "../../../constants/media";
import useAuth from "../../../hooks/useAuth";
import MovieComments from '../MovieComments/MovieComments';

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [featuredMovie, setFeaturedMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState([]);
  const [muted, setMuted] = useState(false);
  const { user } = useAuth();
    const [comment, setComment] = useState({
      id: 0,
      authorName: user.email,
      authorId: user.uid,
      movieId: featuredMovie.id,
      content: "",
    });
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!featuredMovie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          featuredMovie.media_type === "tv" ? "tv" : "movie"
        }/${featuredMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json());

      if (data.videos) {
        const vidIdx = data.videos.results.findIndex(
          (element) => element.type === "Trailer"
        );
        setTrailer(data.videos.results[vidIdx].key);
      }
      if (data.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie()
    return() => {
      
    }
  }, [featuredMovie]);
  
  async function fetchComments() {
    const data = await fetch(`http://localhost:3000/api/movie/${featuredMovie.id}`).then((res) => res.json());
    setComments(data)
  }

  async function createComment(data) {
    try {
      fetch("http://localhost:3000/api/createComment", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        if (data.id) {
          setComment({
            authorName: user?.email,
            authorId: user?.uid,
            movieId: featuredMovie?.id,
            content: "",
            createdAt: new Date(),
            id: 0,
          });
          refreshData();
          fetchComments();
        } else {
          setComment({
            authorName: user?.email,
            authorId: user?.uid,
            movieId: featuredMovie?.id,
            content: "",
            createdAt: new Date(),
            id: 0,
          });
          refreshData();
          fetchComments();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data) => {
    try {
      createComment(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Refreshes the data by using router to push the same path to the client
  const refreshData = () => {
    router.replace(router.asPath);
  };
  // Sets the modal state to false to close the modal
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    // Material UI Modal Container
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        {/* Close Modal Button */}
        <button
          onClick={handleClose}
          className="modalBtn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]/60"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        {/* React Player Container */}
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={
              `https://www.youtube.com/watch?v=${trailer}` ||
              `https://www.youtube.com/watch?v=p2dKdvLXksQ`
            }
            light={`${IMAGE_BASE_URL}/${
              featuredMovie.backdrop_path || featuredMovie.poster_path
            }`}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              backgroundColor: "black",
            }}
            playing
            muted={muted}
          />
          {/* Modal Player Toggle Options */}
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white text-black px-8 text-xl font-bold transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" /> Play
              </button>

              <button className="modalBtn">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalBtn">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalBtn" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Modal Left Side Media Description and Info */}
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.floor(featuredMovie.vote_average * 10)}% Match
              </p>
              <p className="font-light">
                {featuredMovie.release_date || featuredMovie.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            {/* Modal Right Side Media Description and Info */}
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{featuredMovie.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {featuredMovie.original_language.toUpperCase()}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {featuredMovie.vote_count}
                </div>
              </div>
            </div>
            <div className="comments_section">
              <MovieComments comments={comments}/>
              {/* Comment Form for Media */}
              <form className="comments_form flex justify-center">
                <textarea
                  name="content"
                  value={comment.content}
                  placeholder="Add to the discussion"
                  onChange={(e) => {
                    setComment({ ...comment, content: e.target.value });
                  }}
                  className="text-black text-sm w-[60%] px-2 py-2 rounded-l-md"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(comment);
                  }}
                  className="text-sm bg-red-700 rounded-r-md py-2 px-4 transition duration-300 hover:bg-blue-700 hover:text-black"
                >
                  Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
