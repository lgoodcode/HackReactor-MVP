import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'preact/hooks'
import Cookies from 'js-cookie'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import PageNotFound from './pages/404'
import { useStore } from './utils/fastContext'

export default function App() {
  const [session, setSession] = useStore<Session>('session')
  const logout = async () => {
    await fetch('/api/logout')
    // Redirect to the login page after logging out to force a refresh
    window.location.assign('/')
  }

  // Check if the user is logged in on page load via the cookies
  useEffect(() => {
    const session = Cookies.get('session')

    if (session) {
      setSession(JSON.parse(session))
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar session={session} logout={logout} />
              <main className="w-full min-h-[calc(100vh-84px)] mx-auto xl:max-w-7xl centered flex-col">
                <Home session={session} />
              </main>
            </>
          }
        />
        <Route path="/login" element={<Auth setSession={setSession} />} />
        <Route path="/signup" element={<Auth setSession={setSession} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <footer className="h-36 bg-black"></footer> */}
    </BrowserRouter>
  )
}
