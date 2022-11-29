import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'preact/hooks'
import Navbar from './components/Navbar'
import LibraryMenu from './components/Game/LibraryMenu'
import Home from './pages/Home'
import Auth from './pages/Auth'
import PageNotFound from './pages/404'
import { useStore } from './lib/fastContext'
import apiFetcher from './utils/apiFetcher'
import Logo from './pages/Logo'

export default function App() {
  const [session, setSession] = useStore<Session>('session')

  // Check if the user is logged in on page load via the cookies, if so, get the session
  // and set it in the store
  useEffect(() => {
    // Need to include credentials to send the session cookie, if exists, to check
    // if the user is logged in already
    apiFetcher('/session', { credentials: 'include' }).then(({ data, error }) => {
      if (error) return setSession(null)
      setSession(data)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar session={session} />
              <main className="w-full min-h-screen lg:min-h-[calc(100vh-84px)] centered flex-col">
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
        <Route path="/logo" element={<Logo />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
