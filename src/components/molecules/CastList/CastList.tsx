import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTmdb } from '../../../hooks/useTmdb';
import apiConfig from '../../../api/apiConfig';
import { Category } from '../../../context/TmdbContext';

interface Cast {
  profile_path?: string;
  name: string;
}

interface CastListProps {
  id: number;
}

interface Params {
  category: Category;
  [key: string]: string | undefined;
}

const CastList: React.FC<CastListProps> = ({ id }) => {
  const { category } = useParams<Params>();
  const { credits, getCredits } = useTmdb();

  useEffect(() => {
    if (category && id) {
      getCredits(category, id);
    }
  }, [category, id, getCredits]);

  const castList: Cast[] = (credits as Cast[])?.slice(0, 5) || [];

  return (
    <div className="grid grid-cols-auto-fill-90 gap-2">
      {castList.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="w-full h-[160px] bg-cover bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path || '')})` }}
          ></div>
          <p className="text-xs text-center mt-1">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
