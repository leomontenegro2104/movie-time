import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import { HOME_PATH, CATALOG_PATH, DETAIL_PATH, LOGIN_PATH, SIGNUP_PATH, SEARCH_CATALOG_PATH, NOT_FOUND_PATH } from './constants';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={LOGIN_PATH} element={<LogIn />} />
      <Route path={SIGNUP_PATH} element={<SignUp />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path={HOME_PATH} element={<Home />} />
        <Route path={CATALOG_PATH} element={<Catalog />} />
        <Route path={SEARCH_CATALOG_PATH} element={<Catalog />} />
        <Route path={DETAIL_PATH} element={<Detail />} />
      </Route>

      {/* Not Found Route 404 */}
      <Route path={NOT_FOUND_PATH} element={<NotFound />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_PATH} replace />} />
    </Routes>
  );
};

export default AppRoutes;
