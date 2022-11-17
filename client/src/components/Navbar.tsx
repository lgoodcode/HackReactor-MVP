import { useLocation, useNavigate } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'preact/jsx-runtime'
import { ReactComponent as Search } from '../assets/search.svg'
import { ReactComponent as User } from '../assets/user.svg'

const dropdownItems = [
  {
    name: 'My Games',
  },
  {
    name: 'My Account',
  },
  {
    name: 'Logout',
  },
]

export type NavbarProps = {
  session: Session
  logout: () => void
}

export default function Navbar({ session, logout }: NavbarProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleLogoClick = () => (pathname === '/' ? null : navigate('/'))

  return (
    <div className="navbar h-[84px] px-36 py-2 w-full bg-transparent flex justify-between">
      <div onClick={handleLogoClick} className="logo flex items-center select-none cursor-pointer">
        <img src="/vite.svg" alt="logo" className="w-[48px] h-[48px]" />
        <h1 className="text-4xl font-medium ml-2 font-mont">MVP</h1>
      </div>

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
            <Popover className="user relative">
              <Popover.Button className="w-[42px] h-[42px] centered rounded-full cursor-pointer bg-gradient-to-b from-lavender-300 to-cool-500 hover:opacity-80 transition-opacity duration-150">
                <User width={16} height={16} fill="white" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute w-[192px] left-0 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white p-2 flex flex-col gap-2">
                      {dropdownItems.map((item, i) => (
                        <a
                          key={item.name}
                          onClick={() => (i === dropdownItems.length - 1 ? logout() : null)}
                          className={`flex items-center py-1 rounded-lg ${
                            i === dropdownItems.length - 1
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-white hover:bg-gray-200'
                          } cursor-pointer transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50`}
                        >
                          <div className="flex h-10 w-4 shrink-0 items-center justify-center"></div>
                          <div className="ml-4">
                            <p
                              className={`text-sm font-medium ${
                                i === dropdownItems.length - 1
                                  ? 'text-white'
                                  : 'text-gray-700 hover:text-gray-900'
                              }`}
                            >
                              {item.name}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
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
    </div>
  )
}
