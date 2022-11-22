import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'preact/hooks'
import Navbar from './components/Navbar'
import LibraryMenu from './components/Game/LibraryMenu'
import Home from './pages/Home'
import Auth from './pages/Auth'
import PageNotFound from './pages/404'
import { useStore } from './lib/fastContext'

export default function App() {
  const [session, setSession] = useStore<Session>('session')

  const logout = async () => {
    await fetch('/api/session', { method: 'DELETE' }).catch(console.error)
    // Redirect to the login page after logging out to force a refresh
    window.location.assign('/')
  }

  // Check if the user is logged in on page load via the cookies, if so, get the session
  // and set it in the store
  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then(setSession)
      .catch((err) => {
        console.error(err)
        setSession(null)
      })
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
                <Home />
              </main>
              <div id="portals">
                <LibraryMenu />
              </div>
            </>
          }
        />
        <Route path="/login" element={<Auth setSession={setSession} />} />
        <Route path="/signup" element={<Auth setSession={setSession} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
