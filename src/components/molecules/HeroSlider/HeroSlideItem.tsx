import React from "react";
import { useNavigate } from "react-router-dom";
import WatchTrailerButton from "./WatchTrailerButton";
import { Category } from "../../../context/TmdbContext";
import apiConfig from "../../../api/apiConfig";

interface HeroSlideItemProps {
  item: {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
  };
  isActive: boolean;
  getVideos: (cate: Category, id: number) => Promise<void>;
}

const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ item, isActive, getVideos }) => {
  const navigate = useNavigate();
  const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

  return (
    <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <img src={background} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-white text-4xl font-bold">{item.title}</h2>
        <p className="text-white text-lg mt-4 max-w-2xl">{item.overview}</p>
        <div className="flex mt-6 space-x-4">
          <button
            onClick={() => navigate(`/movie/${item.id}`)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Watch Now
          </button>
          <WatchTrailerButton movieId={item.id} getVideos={getVideos} />
        </div>
      </div>
    </div>
  );
};

export default HeroSlideItem;
