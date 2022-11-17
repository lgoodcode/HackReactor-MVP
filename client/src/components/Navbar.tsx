import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Search } from '../assets/search.svg'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleLogoClick = () => (pathname === '/' ? null : navigate('/'))

  return (
    <div className="navbar h-[84px] px-36 py-2 w-full bg-transparent flex justify-between">
      <div onClick={handleLogoClick} className="logo flex items-center select-none cursor-pointer">
        <img src="/vite.svg" alt="logo" className="w-[48px] h-[48px]" />
        <h1 className="text-2xl font-bold ml-2">MVP</h1>
      </div>

      <div className="search flex items-center">
        <div className="ml-6 centered">
          <input
            type="text"
            placeholder="Search for games"
            className="w-[300px] h-[40px] px-4 rounded-l-md bg-gray-800 outline-none"
          />

          <button className="btn h-[40px] bg-cool-500 hover:bg-cool-400 text-white rounded-r-md">
            <Search width={18} height={18} fill="white" />
          </button>
        </div>

        <div className="user flex items-center ml-4">
          <button
            onClick={() => navigate('/signup')}
            className="btn rounded-md text-gray-200 hover:text-white bg-lavender-500 hover:bg-lavender-400"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn ml-4 rounded-md border-2 border-lavender-500 hover:bg-lavender-800 hover:bg-opacity-40 text-gray-200 hover:text-white"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  )
}
