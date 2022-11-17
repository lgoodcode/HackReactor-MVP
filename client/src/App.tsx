import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'preact/hooks'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import PageNotFound from './pages/404'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error('API_URL is not defined')
}

const getSession = async () => {
  try {
    return await fetch(`${API_URL}/session`).then((res) => res.json())
  } catch (err) {
    console.error(err)
    return null
  }
}

export default function App() {
  const [session, setSession] = useState<Session>(null)
  const logout = async () => {
    await fetch(`${API_URL}/logout`)
    setSession(null)
  }

  // Get the session on initial render
  useEffect(() => {
    // Check if the session is stored in localStorage
    const session = localStorage.getItem('session')

    if (session) {
      setSession(JSON.parse(session))
    } else {
      getSession().then(setSession)
    }
  }, [])

  // Store the session in localStorage
  useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session))
    } else {
      localStorage.removeItem('session')
    }
  }, [session])

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
        <Route path="/login" element={<Auth api={API_URL} setSession={setSession} />} />
        <Route path="/signup" element={<Auth api={API_URL} setSession={setSession} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <footer className="h-36 bg-black"></footer> */}
    </BrowserRouter>
  )
}
