import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routers/Routes"
import { TmdbProvider } from "./context/TmdbContext"
import Footer from "./components/molecules/Footer/Footer"
import Header from "./components/molecules/Header/Header"

function App() {
  return (
    <TmdbProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen min-w-screen">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TmdbProvider>
  )
}

export default App
