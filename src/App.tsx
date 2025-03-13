import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routers/Routes"
import Footer from "./components/molecules/Footer"
import Header from "./components/molecules/Header"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
