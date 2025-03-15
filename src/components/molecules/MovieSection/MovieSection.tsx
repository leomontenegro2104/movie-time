import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../../atoms/Button/Button';

interface MovieSectionProps {
  title: string;
  viewMoreLink: string;
  children: React.ReactNode;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, viewMoreLink, children }) => (
  <section className="mb-12">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl text-white font-bold">{title}</h2>
      <Link to={viewMoreLink}>
        <OutlineButton className="small">View more</OutlineButton>
      </Link>
    </div>
    {children}
  </section>
);

export default MovieSection;
