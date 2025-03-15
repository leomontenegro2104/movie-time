import React from 'react';
import { Link } from 'react-router-dom';

import apiConfig from '../../../api/apiConfig';
import Button from '../../atoms/Button/Button';
import { Category } from '../../../api/tmdbApi';

interface IMovie {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  title?: string;
  name?: string;
}

interface MovieCardProps {
  item: IMovie;
  category: Category;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, category }) => {
  const link = `/${category}/${item.id}`;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path || '');

  return (
    <Link to={link} className="block">
      <div
        className="relative bg-cover bg-top bg-no-repeat rounded-[30px] pb-[160%] mb-4 transition-all duration-300 hover:before:opacity-80 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-black before:opacity-0 before:transition-opacity before:duration-300"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-all duration-300 hover:scale-100"
        >
          <i className="bx bx-play text-4xl"></i>
        </Button>
      </div>
      <h3 className="text-lg font-semibold text-white text-center">{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
