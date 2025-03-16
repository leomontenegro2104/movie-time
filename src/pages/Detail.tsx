import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTmdb } from '../hooks/useTmdb';
import { Category } from '../context/TmdbContext';
import CastList from '../components/molecules/CastList/CastList';
import VideoList from '../components/molecules/VideoList/VideoList';

const Detail: React.FC = () => {
  const { category, id } = useParams<{ category: Category; id: string }>();
  const { setCategory, setMovieId, movieDetail } = useTmdb();

  useEffect(() => {
    if (category && id) {
      setCategory(category);
      setMovieId(id);
    }
  }, [category, id]);

  if (!movieDetail) return <div className="text-center text-white">Carregando...</div>;

  return (
    <div className="text-white">
      {/* Banner com overlay */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black"></div>
      </div>

      {/* Conteúdo do filme */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8 p-4 mt-[-100px] relative">
        {/* Pôster */}
        <div className="w-64 shrink-0">
          <img
            className="w-full rounded-xl shadow-lg"
            src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
            alt={movieDetail.title || movieDetail.original_title}
          />
        </div>

        {/* Informações */}
        <div className="flex flex-col w-full">
          <h1 className="text-4xl font-bold">{movieDetail.title || movieDetail.original_title}</h1>
          <p className="text-gray-300 mt-2">{movieDetail.overview}</p>

          {/* Gêneros */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movieDetail.genres?.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-gray-800 rounded-lg text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Informações adicionais */}
          <p className="mt-2 text-gray-400">Duração: {movieDetail.runtime} min</p>
          <p className="mt-1 text-gray-400">Lançamento: {movieDetail.release_date}</p>
          <p className="mt-1 text-gray-400">Avaliação: ⭐ {movieDetail.vote_average} / 10</p>

          {/* Lista de Elenco */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Elenco</h2>
            <CastList />
          </div>
        </div>
      </div>

      {/* Lista de Vídeos */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Vídeos</h2>
        <VideoList />
      </div>
    </div>
  );
};

export default Detail;
