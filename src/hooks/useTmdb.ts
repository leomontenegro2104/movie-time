import { useContext } from 'react';
import { TmdbContext } from '../context/TmdbContext';

export const useTmdb = () => {
  const context = useContext(TmdbContext);
  if (!context) {
    throw new Error('useTmdb must be used within a TmdbProvider');
  }
  return context;
};
