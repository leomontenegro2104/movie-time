import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader/PageHeader';
import MovieSection from '../components/molecules/MovieSection/MovieSection';
import MovieList from '../components/molecules/MovieList/MovieList';
import { Category, MovieType, TVType } from '../api/tmdbApi';

interface CatalogParams {
  category: string;
}

const Catalog: React.FC = () => {
  const { category } = useParams<CatalogParams>();

  const categoryTypes = category === Category.MOVIE ? MovieType : TVType;

  const parseTypeName = (category: string): string => {
    return category
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <PageHeader>
        {category === Category.MOVIE ? 'Movies' : 'TV Series'}
      </PageHeader>
      <div className="container mx-auto px-8">
        {Object.entries(categoryTypes).map(([key, type]) => (
          <MovieSection key={key} title={parseTypeName(type)} viewMoreLink={`/${category}`}>
            <MovieList category={category as Category} type={type as MovieType | TVType} />
          </MovieSection>
        ))}
      </div>
    </>
  );
};

export default Catalog;
