import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import { TmdbProvider } from './context/TmdbContext';

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
