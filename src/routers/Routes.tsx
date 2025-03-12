import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import { CATALOG_PATH, DETAIL_PATH, HOME_PATH, LOGIN_PATH, SEARCH_CATALOG_PATH, SIGNUP_PATH } from './constants';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={LOGIN_PATH} element={<LogIn />} />
      <Route path={SIGNUP_PATH} element={<SignUp />} />
      <Route path={HOME_PATH} element={<Home />} />
      <Route path={CATALOG_PATH} element={<Catalog />} />
      <Route path={SEARCH_CATALOG_PATH} element={<Catalog />} />
      <Route path={DETAIL_PATH} element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
