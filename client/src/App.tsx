import Navbar from './components/Navbar'
import Games from './components/Games'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen mx-auto xl:max-w-7xl centered">
        <Games />
      </main>
      <footer className="h-36 bg-black"></footer>
    </>
  )
}
