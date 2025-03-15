import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useTmdb } from '../../../hooks/useTmdb';
import { Category, MovieType, TVType } from '../../../context/TmdbContext';

import MovieCard from '../MovieCard/MovieCard';
import Button, { OutlineButton } from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

export interface IMovie {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  overview?: string;
}

interface MovieGridProps {
  category: Category;
  type?: string;
  id?: number;
}

const MovieGrid: React.FC<MovieGridProps> = ({ category, type, id }) => {
  const { keyword } = useParams<{ keyword?: string }>();
  const {
    movies,
    tvShows,
    searchResults,
    similarMovies,
    moviesTotalPages,
    tvShowsTotalPages,
    searchTotalPages,
    getMoviesList,
    getTvList,
    search,
    getSimilarMovies,
  } = useTmdb();

  const items: IMovie[] =
    type === 'similar'
      ? similarMovies
      : !keyword
        ? category === Category.MOVIE
          ? movies
          : tvShows
        : searchResults;

  const totalPage: number =
    type === 'similar'
      ? 1
      : !keyword
        ? category === Category.MOVIE
          ? moviesTotalPages
          : tvShowsTotalPages
        : searchTotalPages;

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
    if (type === 'similar' && id) {
      getSimilarMovies(category, id);
    } else if (!keyword) {
      const params = { page: 1 };
      if (category === Category.MOVIE) {
        getMoviesList(MovieType.UPCOMING, params, false);
      } else {
        getTvList(TVType.POPULAR, params, false);
      }
    } else {
      const params = { page: 1, query: keyword };
      search(category, params, false);
    }
  }, [category, keyword, type, id, getMoviesList, getTvList, search, getSimilarMovies]);

  const loadMore = useCallback(() => {
    if (type === 'similar') return;
    if (page < totalPage) {
      const nextPage = page + 1;
      if (!keyword) {
        const params = { page: nextPage };
        if (category === Category.MOVIE) {
          getMoviesList(MovieType.UPCOMING, params, true);
        } else {
          getTvList(TVType.POPULAR, params, true);
        }
      } else {
        const params = { page: nextPage, query: keyword };
        search(category, params, true);
      }
      setPage(nextPage);
    }
  }, [page, totalPage, type, keyword, category, getMoviesList, getTvList, search]);

  return (
    <>
      <div className="mb-12">
        <MovieSearch category={category} keyword={keyword || ''} />
      </div>
      <div className="grid grid-cols-auto-fill-200 gap-5 mb-12">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} category={category} />
        ))}
      </div>
      {type !== 'similar' && page < totalPage && (
        <div className="text-center">
          <OutlineButton className="text-lg px-6 py-2" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      )}
    </>
  );
};

interface MovieSearchProps {
  category: Category;
  keyword: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ category, keyword: initKeyword }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>(initKeyword);

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category}/search/${keyword}`);
    }
  }, [keyword, category, navigate]);

  useEffect(() => {
    const enterEvent = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [goToSearch]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full pr-24 py-2 text-lg"
      />
      <Button className="absolute right-2 top-2 text-lg px-4 py-2" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
