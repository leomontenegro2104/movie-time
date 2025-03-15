import React from 'react';
import HeroSlide from '../components/molecules/HeroSlide/HeroSlide';
import { Category, MovieType, TVType } from '../context/TmdbContext';
import MovieList from '../components/molecules/MovieList/MovieList';
import MovieSection from '../components/molecules/MovieSection/MovieSection';

interface MovieSectionData {
  title: string;
  viewMoreLink: string;
  category: Category;
  type: MovieType | TVType;
}

const movieSections: MovieSectionData[] = [
  { title: 'Trending Movies', viewMoreLink: '/movie', category: Category.MOVIE, type: MovieType.POPULAR },
  { title: 'Top Rated Movies', viewMoreLink: '/movie', category: Category.MOVIE, type: MovieType.TOP_RATED },
  { title: 'Trending TV', viewMoreLink: '/tv', category: Category.TV, type: TVType.POPULAR },
  { title: 'Top Rated TV', viewMoreLink: '/tv', category: Category.TV, type: TVType.TOP_RATED },
];

const Home: React.FC = () => {
  return (
    <>
      <HeroSlide />
      <div className="container mx-auto px-8">
        {movieSections.map((section, index) => (
          <MovieSection key={index} title={section.title} viewMoreLink={section.viewMoreLink}>
            <MovieList category={section.category} type={section.type} />
          </MovieSection>
        ))}
      </div>
    </>
  );
};

export default Home;
