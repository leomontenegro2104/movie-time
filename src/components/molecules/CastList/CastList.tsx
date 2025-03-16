import React from 'react';
import { useTmdb } from '../../../hooks/useTmdb';

const CastList: React.FC = () => {
  const { movieCasts } = useTmdb();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
      {movieCasts &&
        movieCasts.map((actor) => (
          <div key={actor.id} className="flex flex-col items-center text-center">
            <img
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : 'https://via.placeholder.com/100x100?text=No+Image'
              }
              alt={actor.name}
            />
            <p className="text-sm mt-2 font-semibold">{actor.name}</p>
            <p className="text-xs text-gray-400">{actor.character}</p>
          </div>
        ))}
    </div>
  );
};

export default CastList;
