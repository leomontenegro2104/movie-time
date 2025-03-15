import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';
import { Category } from '../../../api/tmdbApi';

interface MovieSearchProps {
  category: Category;
  keyword: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ category, keyword: initKeyword }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initKeyword);

  const goToSearch = useCallback(() => {
    if (keyword.trim()) navigate(`/${category}/search/${keyword}`);
  }, [keyword, category, navigate]);

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

export default MovieSearch;
