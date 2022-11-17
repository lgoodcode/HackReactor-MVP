import { useNavigate } from 'react-router-dom'
import './404.css'

export default function PageNotFound() {
  const navigate = useNavigate()

  document.title = '404 | MVP'

  return (
    <div className="min-h-screen centered flex-col mx-auto px-24 pt-12 pb-20">
      <div className="error-page flex flex-col items-center justify-center gap-4">
        <h1 className="heading">404</h1>
        <p className="subheading">Looks like the page you were looking for is no longer here.</p>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/')}
          className="btn rounded-md bg-lavender-400 hover:bg-lavender-500"
        >
          Return home
        </button>
      </div>
    </div>
  )
}
