import { useLocation, useNavigate } from 'react-router-dom'
import useMediaQuery from '@/hooks/useMediaQuery'
import Menu from './Menu'
import { ReactComponent as Search } from '../assets/search.svg'

const MOBILE_ICON_SIZE = 'w-10 h-10'
const DESKTOP_ICON_SIZE = 'w-14 h-14'

export type NavbarProps = {
  session: Session
}

export default function Navbar({ session }: NavbarProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleLogoClick = () => (pathname === '/' ? null : navigate('/'))
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const logoIconClass = isDesktop ? MOBILE_ICON_SIZE : DESKTOP_ICON_SIZE

  return (
    <div className="navbar h-[84px] px-6 md:px-12 lg:px-44 py-2 bg-transparent flex justify-between">
      <div onClick={handleLogoClick} className="logo flex items-center select-none cursor-pointer">
        <img src="/logo.svg" alt="logo" className={logoIconClass} />
        <h1 className="text-3xl md:text-4xl font-medium ml-2 font-mont">Menelaus</h1>
      </div>

      {!isDesktop ? (
        <Menu isDesktop={false} />
      ) : (
        <div className="search flex items-center">
          <div className="ml-4 centered">
            <input
              type="text"
              placeholder="Search for games"
              className="w-[300px] h-[40px] px-4 rounded-l-md bg-gray-800 outline-none"
            />

            <button className="btn h-[40px] bg-cool-500 hover:bg-cool-400 text-white rounded-r-md">
              <Search width={18} height={18} fill="white" />
            </button>
          </div>

          <div className="w-full h-full flex items-center ml-4">
            {session ? (
              <Menu isDesktop={true} />
            ) : (
              <div className="no-user">
                <button
                  onClick={() => navigate('/signup')}
                  className="btn rounded-md text-gray-200 hover:text-white bg-lavender-500 hover:bg-lavender-400"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn ml-4 rounded-md border-2 border-transparent hover:bg-lavender-500 hover:bg-opacity-40 text-gray-200 hover:text-white"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
