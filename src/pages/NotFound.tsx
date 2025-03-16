import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Page not found</h2>
      <p className="text-gray-400 mt-2 text-center max-w-md">
        Oops! It looks like the page you're looking for doesn't exist or has been removed.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
      >
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;
