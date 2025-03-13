import React from "react";
import { Category } from "../../../context/TmdbContext";

interface WatchTrailerButtonProps {
  movieId: number;
  getVideos: (cate: Category, id: number) => Promise<void>;
}

const WatchTrailerButton: React.FC<WatchTrailerButtonProps> = ({ movieId, getVideos }) => {
  const setModalActive = async () => {
    await getVideos(Category.MOVIE, movieId);
    const modal = document.querySelector(`#modal_${movieId}`) as HTMLElement;
    modal.classList.add("opacity-100", "visible");
  };

  return (
    <button
      onClick={setModalActive}
      className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-red-600 transition"
    >
      Watch Trailer
    </button>
  );
};

export default WatchTrailerButton;
