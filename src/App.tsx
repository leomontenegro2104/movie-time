import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routers/Routes';
import { TmdbProvider } from './context/TmdbContext';
import Footer from './components/molecules/Footer/Footer';
import Header from './components/molecules/Header/Header';

const Layout: React.FC = () => {
  const location = useLocation();
  const hideHeader = ['/login', '/signup'].includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      {!hideHeader && <Header />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <TmdbProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TmdbProvider>
  );
}

export default App;
