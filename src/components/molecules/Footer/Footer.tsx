import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../../../assets/footer-bg.jpg';

const Footer: React.FC = () => {
  return (
    <div className="relative py-8 px-8 bg-top bg-cover" style={{ backgroundImage: `url(${bg})` }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col text-lg font-semibold space-y-4">
            <Link to="/">Home</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="flex flex-col text-lg font-semibold space-y-4">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Privacy policy</Link>
          </div>
          <div className="flex flex-col text-lg font-semibold space-y-4">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
