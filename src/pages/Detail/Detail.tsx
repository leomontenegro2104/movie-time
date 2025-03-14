import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';

import { Category, Movie } from '../../context/TmdbContext';
import { useTmdb } from '../../hooks/useTmdb';

import CastList from '../../components/molecules/CastList/CastList';
import VideoList from '../../components/molecules/VideoList/VideoList';
import MovieGrid from '../../components/molecules/MovieGrid/MovieGrid';

import './detail.scss';

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
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                movieDetail.backdrop_path || movieDetail.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    movieDetail.poster_path || movieDetail.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{movieDetail.title}</h1>
              <div className="genres">
                {((movieDetail as MovieWithGenres).genres)?.slice(0, 5).map((genre, i) => (
                  <span key={i} className="genres__item">
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="overview">{movieDetail.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={movieDetail.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={movieDetail.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
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
