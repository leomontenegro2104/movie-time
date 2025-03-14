import React, { useEffect, useRef } from 'react';
import { useTmdb } from '../../../hooks/useTmdb';
import { Category, MovieType, TVType } from '../../../context/TmdbContext';
import MovieCard from '../MovieCard/MovieCard';
import './movie-list.scss';

export interface IMovie {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  overview?: string;
}

interface MovieListProps {
  category: Category;
  type: string; // pode ser um valor dos enums MovieType ou TVType ou a string 'similar'
  id?: number;  // usado quando type === 'similar'
}

const MovieList: React.FC<MovieListProps> = ({ category, type, id }) => {
  const {
    movies,
    tvShows,
    similarMovies,
    getMoviesList,
    getTvList,
    getSimilarMovies,
  } = useTmdb();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchList = async () => {
      if (type !== 'similar') {
        if (category === Category.MOVIE) {
          await getMoviesList(type as MovieType, { page: 1 });
        } else {
          await getTvList(type as TVType, { page: 1 });
        }
      } else {
        if (id) {
          await getSimilarMovies(category, id);
        }
      }
    };
    fetchList();
  }, [category, type, id, getMoviesList, getTvList, getSimilarMovies]);

  let items: IMovie[] = [];
  if (type === 'similar') {
    items = similarMovies;
  } else if (category === Category.MOVIE) {
    items = movies;
  } else {
    items = tvShows;
  }

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="movie-list">
      <button className="movie-list__arrow left" onClick={scrollLeft}>
        &#8249;
      </button>
      <div className="movie-list__container" ref={containerRef}>
        {items.map((item, i) => (
          <div className="movie-list__item" key={i}>
            <MovieCard item={item} category={category} />
          </div>
        ))}
      </div>
      <button className="movie-list__arrow right" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default MovieList;
