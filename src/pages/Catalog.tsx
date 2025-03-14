import React from 'react';
import { useParams } from 'react-router-dom';
import { Category } from '../context/TmdbContext';
import PageHeader from '../components/molecules/PageHeader/PageHeader';
import MovieGrid from '../components/molecules/MovieGrid/MovieGrid';

interface CatalogParams {
  category: string;
  [key: string]: string | undefined;
}

const Catalog: React.FC = () => {
  const { category } = useParams<CatalogParams>();

  return (
    <>
      <PageHeader>
        {category === Category.MOVIE ? 'Movies' : 'TV Series'}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category as Category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
