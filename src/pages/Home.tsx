import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlide from '../components/molecules/HeroSlide/HeroSlide';
import { OutlineButton } from '../components/atoms/Button/Button';
import { Category, MovieType, TVType } from '../context/TmdbContext';
import MovieList from '../components/molecules/MovieList/MovieList';


const Home: React.FC = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={Category.MOVIE} type={MovieType.POPULAR} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={Category.MOVIE} type={MovieType.TOP_RATED} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={Category.TV} type={TVType.POPULAR} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={Category.TV} type={TVType.TOP_RATED} />
        </div>
      </div>
    </>
  );
};

export default Home;
