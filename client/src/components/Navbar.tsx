import { ReactComponent as Search } from '../assets/search.svg'

export default function Navbar() {
  return (
    <div className="navbar h-[68px] px-36 mb-12 w-full bg-transparent flex justify-between">
      <div className="logo flex items-center select-none">
        <img src="/vite.svg" alt="logo" className="w-[48px] h-[48px]" />
        <h1 className="text-2xl font-bold ml-2 hover:cursor-default">MVP</h1>
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

        <div className="user flex items-center ml-8">
          <button className="btn rounded-md text-gray-200 hover:text-white bg-lavender-500 hover:bg-lavender-400">
            Sign Up
          </button>
          <button className="btn ml-4 rounded-md border-2 border-lavender-500 hover:bg-lavender-800 hover:bg-opacity-40 text-gray-200 hover:text-white">
            Log in
          </button>
        </div>
      </div>
    </div>
  )
}
