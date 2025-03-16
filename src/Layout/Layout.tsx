import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '../routers/Routes';
import Header from '../components/molecules/Header/Header';
import Footer from '../components/molecules/Footer/Footer';
import { LOGIN_PATH, NOT_FOUND_PATH, SIGNUP_PATH } from '../routers/constants';

const Layout: React.FC = () => {
  const location = useLocation();

  const hiddenRoutes = [LOGIN_PATH, SIGNUP_PATH, NOT_FOUND_PATH];
  const hideHeaderFooter = hiddenRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
