import React from 'react';
import { Link } from 'react-router-dom';

import './movie-card.scss';

import { Category } from '../../../context/TmdbContext';
import apiConfig from '../../../api/apiConfig';
import Button from '../../atoms/Button/Button';

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
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
