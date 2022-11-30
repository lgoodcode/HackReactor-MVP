import { Fragment } from 'preact/compat'
import { Popover, Transition } from '@headlessui/react'
import apiFetcher from '@/utils/apiFetcher'
import Hamburger from './Hamburger'

import { ReactComponent as User } from '../assets/user.svg'
import { useNavigate } from 'react-router-dom'

const logout = () => {
  // Need to include credentials to send the cookie to the server to destroy the session
  apiFetcher('/session', {
    method: 'DELETE',
    credentials: 'include',
  }).then(() =>
    // Redirect to the login page after logging out to force a refresh
    window.location.assign('/')
  )
}

const MENU_ITEMS = [
  {
    name: 'My Games',
    onClick: () => null,
  },
  {
    name: 'My Account',
    onClick: () => null,
  },
]

type MenuProps = {
  session: boolean
  isDesktop: boolean
}

export default function Menu({ session, isDesktop }: MenuProps) {
  const navigate = useNavigate()

  return (
    <Popover className="user relative">
      {isDesktop ? (
        <Popover.Button className="w-[42px] h-[42px] centered rounded-full cursor-pointer bg-gradient-to-b from-lavender-300 to-cool-500 hover:opacity-80 transition-opacity duration-150">
          <User width={16} height={16} fill="white" />
        </Popover.Button>
      ) : (
        <div className="h-full centered">
          <Popover.Button className="centered rounded-full cursor-pointer outline-none">
            <Hamburger w={38} h={38} />
          </Popover.Button>
        </div>
      )}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute w-[192px] -left-8 z-10 mt-0 lg:mt-3 -translate-x-1/2 transform px-4 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white p-2 flex flex-col gap-2">
              {session ? (
                <>
                  {MENU_ITEMS.map((item) => (
                    <a
                      key={item.name}
                      onClick={() => item.onClick}
                      className="flex items-center py-3 px-2 rounded-lg bg-white hover:bg-gray-200  cursor-pointer transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                    >
                      {/* <div className="flex h-10 w-4 shrink-0 items-center justify-center"></div> */}
                      <div className="ml-2">
                        <p className="font-medium text-gray-700 hover:text-gray-900">{item.name}</p>
                      </div>
                    </a>
                  ))}
                  <a
                    onClick={logout}
                    className="flex items-center py-3 px-2 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                  >
                    {/* <div className="flex h-10 w-4 shrink-0 items-center justify-center"></div> */}
                    <div className="ml-4">
                      <p className="font-medium text-white">Logout</p>
                    </div>
                  </a>
                </>
              ) : (
                <>
                  <a
                    onClick={() => navigate('/signup')}
                    className="flex items-center py-3 px-2 rounded-lg bg-white hover:bg-gray-200  cursor-pointer transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                  >
                    <div className="ml-2">
                      <p className="font-medium text-gray-700 hover:text-gray-900">Sign up</p>
                    </div>
                  </a>
                  <a
                    onClick={() => navigate('/login')}
                    className="flex items-center py-3 px-2 rounded-lg bg-white hover:bg-gray-200  cursor-pointer transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                  >
                    <div className="ml-2">
                      <p className="font-medium text-gray-700 hover:text-gray-900">Login</p>
                    </div>
                  </a>
                </>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
