import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Category, MovieType, TVType } from '../../../context/TmdbContext';
import logo from '../../../assets/tmovie.png';

interface NavItem {
  display: string;
  path: string;
  category?: Category;
  type?: MovieType | TVType;
}

const headerNav: NavItem[] = [
  { display: 'Home', path: '/' },
  { display: 'Movies', path: '/movie', category: Category.MOVIE, type: MovieType.POPULAR },
  { display: 'TV Series', path: '/tv', category: Category.TV, type: TVType.POPULAR },
];

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement | null>(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (window.scrollY > 100) {
        headerRef.current?.classList.add('bg-black', 'h-16');
      } else {
        headerRef.current?.classList.remove('bg-black', 'h-16');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => window.removeEventListener('scroll', shrinkHeader);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const token = sessionStorage.getItem('token');

  return (
    <div ref={headerRef} className="fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300">
      <div className="container flex items-center justify-between h-full px-8">
        <div className="flex items-center space-x-3 text-2xl font-bold">
          <img src={logo} alt="tMovies logo" className="w-12 md:w-8" />
          <Link to="/" className="text-white">Movie Time</Link>
        </div>
        <ul className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          {headerNav.map((e, i) => (
            <li key={i} className="relative">
              <Link
                to={e.path}
                className={`text-white pb-1 relative ${i === active ? 'after:w-full' : 'after:w-0'} after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-red-500 after:transition-all after:duration-500 hover:after:w-full`}
              >
                {e.display}
              </Link>
            </li>
          ))}
          {token && (
            <li>
              <button onClick={handleLogout} className="text-white text-lg font-semibold">
                Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
      <ul className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-black flex items-center justify-around text-lg font-semibold shadow-md">
        {headerNav.map((e, i) => (
          <li key={i}>
            <Link
              to={e.path}
              className={`text-white pb-1 relative ${i === active ? 'after:w-full' : 'after:w-0'} after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-red-500 after:transition-all after:duration-500 hover:after:w-full`}
            >
              {e.display}
            </Link>
          </li>
        ))}
        {token && (
          <li>
            <button onClick={handleLogout} className="text-white text-lg font-semibold">
              Log Out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
