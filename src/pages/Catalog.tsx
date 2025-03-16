import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PageHeader from '../components/molecules/PageHeader/PageHeader';
import MovieSection from '../components/molecules/MovieSection/MovieSection';
import MovieList from '../components/molecules/MovieList/MovieList';
import { Category, MovieType, TVType } from '../context/TmdbContext';

const VALID_CATEGORIES: Category[] = [Category.MOVIE, Category.TV];

const Catalog: React.FC = () => {
  const { category } = useParams<{ category?: string }>();

  if (!category || !VALID_CATEGORIES.includes(category as Category)) {
    return <Navigate to="/404" replace />;

  }

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
