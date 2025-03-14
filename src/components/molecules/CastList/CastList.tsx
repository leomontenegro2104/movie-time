import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTmdb } from '../../../hooks/useTmdb';
import apiConfig from '../../../api/apiConfig';
import './cast-list.scss';
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
    <div className="casts">
      {castList.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path || '')})` }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
