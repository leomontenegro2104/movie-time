import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import { Category, Movie } from '../context/TmdbContext';
import CastList from '../components/molecules/CastList/CastList';
import VideoList from '../components/molecules/VideoList/VideoList';
import MovieGrid from '../components/molecules/MovieGrid/MovieGrid';
import { useTmdb } from '../hooks/useTmdb';

interface MovieWithGenres extends Movie {
  genres?: { id: number; name: string }[];
}

const Detail: React.FC = () => {
  const { category = Category.MOVIE, id } = useParams<{ category: Category; id: string }>();
  const { movieDetail, detail } = useTmdb();

  useEffect(() => {
    if (id) {
      detail(category, id);
      window.scrollTo(0, 0);
    }
  }, [category, id, detail]);

  if (!movieDetail) return null;

  return (
    <>
      <div
        className="relative h-[50vh] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${apiConfig.originalImage(movieDetail.backdrop_path || movieDetail.poster_path)})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
      </div>

      <div className="container mx-auto px-8 -mt-[200px] relative mb-12 flex flex-col md:flex-row">
        <div className="hidden md:block flex-1">
          <div
            className="bg-center bg-cover bg-no-repeat rounded-[30px] pb-[165%]"
            style={{ backgroundImage: `url(${apiConfig.originalImage(movieDetail.poster_path || movieDetail.backdrop_path)})` }}
          ></div>
        </div>

        <div className="w-full md:w-[70%] md:pl-8 space-y-8 text-white">
          <h1 className="text-4xl font-bold">{movieDetail.title}</h1>
          <div className="flex space-x-2">
            {((movieDetail as MovieWithGenres).genres || []).slice(0, 5).map((genre, i) => (
              <span key={i} className="py-2 px-6 border-2 border-white rounded-[30px] text-xs font-semibold bg-[#0f0f0f]">
                {genre.name}
              </span>
            ))}
          </div>
          <p>{movieDetail.overview}</p>
          <div>
            <h2 className="text-2xl font-bold mb-4">Casts</h2>
            <CastList id={movieDetail.id} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8">
        <div className="mb-12">
          <VideoList id={movieDetail.id} />
        </div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Similar</h2>
          <MovieGrid category={category} type="similar" id={movieDetail.id} />
        </div>
      </div>
    </>
  );
};

export default Detail;
