import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import MediaItem from "../../components/MediaItem/MediaItem";

const MediaRows = ({ title, movies }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "prev"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="w-[100vw]">
      <h2 className="w-60 pl-10 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 text-shadow-md hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="relative group md:-ml-2 w-[100vw] px-4">
        <ChevronLeftIcon
          onClick={() => handleClick("prev")}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && `hidden`
          }`}
        />
        <ul
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide"
        >
          {movies.map((movie, i) => {
            return <MediaItem movie={movie} key={`media_item-${i}`} className='select-none'/>;
          })}
        </ul>
        <ChevronRightIcon
          onClick={() => handleClick("next")}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default MediaRows;
