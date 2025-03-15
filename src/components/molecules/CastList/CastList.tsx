import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTmdb } from '../../../hooks/useTmdb';
import apiConfig from '../../../api/apiConfig';
import { Category } from '../../../context/TmdbContext';

interface Cast {
  profile_path?: string;
  name: string;
  job?: string;
}

interface CastListProps {
  id: number;
}

const CastList: React.FC<CastListProps> = ({ id }) => {
  const { category } = useParams<{ category?: Category }>();
  const { credits, getCredits } = useTmdb();

  useEffect(() => {
    if (category && id) {
      getCredits(category, id);
    }
  }, [category, id, getCredits]);

  const filteredCredits = (credits as Cast[])?.filter((c) => c.profile_path) || [];

  return (
    <div className="grid grid-cols-auto-fill-90 gap-2">
      {filteredCredits.slice(0, 5).map((cast, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="w-full h-[160px] bg-cover bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path || '')})` }}
          ></div>
          <p className="text-xs text-center mt-1">{cast.name}</p>
        </div>
      ))}
      {filteredCredits.length === 0 && (
        <p className="text-white text-center col-span-full">No cast available.</p>
      )}
    </div>
  );
};

export default CastList;
