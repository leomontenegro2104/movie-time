import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useTmdb } from '../../../hooks/useTmdb';
import { Category, MovieType, TVType } from '../../../context/TmdbContext';

import MovieCard from '../MovieCard/MovieCard';
import Button, { OutlineButton } from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

import './movie-grid.scss';

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
}

const MovieGrid: React.FC<MovieGridProps> = ({ category }) => {
  const { keyword } = useParams<{ keyword?: string }>();
  const {
    movies,
    tvShows,
    searchResults,
    moviesTotalPages,
    tvShowsTotalPages,
    searchTotalPages,
    getMoviesList,
    getTvList,
    search,
  } = useTmdb();

  // Seleciona os itens conforme o modo (pesquisa ou listagem normal)
  const items: IMovie[] = !keyword
    ? category === Category.MOVIE
      ? movies
      : tvShows
    : searchResults;

  const totalPage: number = !keyword
    ? category === Category.MOVIE
      ? moviesTotalPages
      : tvShowsTotalPages
    : searchTotalPages;

  // Estado local para controlar a página atual (para o botão "Load more")
  const [page, setPage] = useState<number>(1);

  // Quando category ou keyword mudam, reinicia a busca (sem append)
  useEffect(() => {
    setPage(1);
    if (!keyword) {
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
  }, [category, keyword, getMoviesList, getTvList, search]);

  // Carrega mais resultados delegando ao contexto (com append)
  const loadMore = useCallback(() => {
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
  }, [page, totalPage, category, keyword, getMoviesList, getTvList, search]);

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keyword={keyword || ''} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} category={category} />
        ))}
      </div>
      {page < totalPage && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
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
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
