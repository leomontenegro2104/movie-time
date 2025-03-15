import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import { Category, Movie } from '../../context/TmdbContext';
import { useTmdb } from '../../hooks/useTmdb';
import CastList from '../../components/molecules/CastList/CastList';
import VideoList from '../../components/molecules/VideoList/VideoList';
import MovieGrid from '../../components/molecules/MovieGrid/MovieGrid';

interface Params {
  category: Category;
  id: string;
  [key: string]: string | undefined;
}

interface MovieWithGenres extends Movie {
  genres?: { id: number; name: string }[];
}

const Detail: React.FC = () => {
  const { category, id } = useParams<Params>();
  const { movieDetail, detail } = useTmdb();

  useEffect(() => {
    if (category && id) {
      detail(category, id, {});
      window.scrollTo(0, 0);
    }
  }, [category, id, detail]);

  return (
    <>
      {movieDetail && (
        <>
          <div
            className="banner relative h-[50vh] bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                movieDetail.backdrop_path || movieDetail.poster_path
              )})`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
            <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#0f0f0f] to-[rgba(0,0,0,0)]"></div>
          </div>
          <div className="movie-content container mx-auto px-8 -mt-[200px] relative mb-12 flex flex-col md:flex-row">
            <div className="movie-content__poster flex-1 hidden md:block">
              <div
                className="movie-content__poster__img bg-center bg-cover bg-no-repeat rounded-[30px] pb-[165%]"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    movieDetail.poster_path || movieDetail.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info w-full md:w-[70%] md:pl-8 relative space-y-8">
              <h1 className="title text-[4rem] leading-none text-white">
                {movieDetail.title}
              </h1>
              <div className="genres flex space-x-2">
                {((movieDetail as MovieWithGenres).genres)?.slice(0, 5).map((genre, i) => (
                  <span
                    key={i}
                    className="genres__item py-2 px-6 border-2 border-white rounded-[30px] text-xs font-semibold bg-[#0f0f0f] text-white"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="overview text-white">{movieDetail.overview}</p>
              <div className="cast">
                <div className="section__header mb-4 flex items-center justify-between">
                  <h2 className="text-2xl text-white font-bold">Casts</h2>
                </div>
                <CastList id={movieDetail.id} />
              </div>
            </div>
          </div>
          <div className="container mx-auto px-8">
            <div className="section mb-12">
              <VideoList id={movieDetail.id} />
            </div>
            <div className="section mb-12">
              <div className="section__header mb-4 flex items-center justify-between">
                <h2 className="text-2xl text-white font-bold">Similar</h2>
              </div>
              <MovieGrid category={category as Category} type="similar" id={movieDetail.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
