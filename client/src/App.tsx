import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="w-full min-h-[calc(100vh-84px)] mx-auto xl:max-w-7xl centered flex-col">
                <Home />
              </main>
            </>
          }
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
      </Routes>
      {/* <footer className="h-36 bg-black"></footer> */}
    </BrowserRouter>
  )
}
