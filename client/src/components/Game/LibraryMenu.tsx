import { useEffect, useRef } from 'preact/hooks'
import { Fragment } from 'preact/compat'
import { Transition } from '@headlessui/react'
import { useStore } from '@/lib/fastContext'
import { ReactComponent as HourglassIcon } from '@/assets/hourglass.svg'
import { ReactComponent as GameControllerIcon } from '@/assets/game-controller.svg'
import { ReactComponent as TrophyIcon } from '@/assets/trophy.svg'
import { ReactComponent as TrashIcon } from '@/assets/trash.svg'
import { ReactComponent as CheckIcon } from '@/assets/check.svg'

const ICON_SIZE = 24

export default function LibraryMenu() {
  const menuRef = useRef<HTMLDivElement>(null)
  const [menu, setMenu] = useStore<LibraryMenu>('libraryMenu')
  // Close the menu if the user selects an option or clicks outside of it
  const handleMenuClick = (e: any) => {
    if (
      menu.open &&
      (e.target.classList.contains('library-menu-item') || !menuRef.current?.contains(e.target))
    ) {
      setMenu({
        ...menu,
        open: false,
      })
    }
  }

  /**
   * When the menu is open, add a click event listener to the document to close the menu
   * when the user clicks outside of it. NEED TO WATCH FOR CHANGES TO THE OPEN STATE TO
   * UPDATE THE CLOSURE FOR THE HANDLER FUNCTION!!!!!
   */
  useEffect(() => {
    window.addEventListener('click', handleMenuClick)
    return () => window.removeEventListener('click', handleMenuClick)
  }, [menu])

  return (
    <div ref={menuRef} className="library-menu">
      <Transition
        as={Fragment}
        show={menu.open}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className="absolute w-48 p-2 flex flex-col gap-1 bg-white text-gray-800 rounded-md shadow-lg"
          style={{ top: menu.y - 12, left: menu.x + 24 }}
        >
          <div className="library-menu-item hover:text-white hover:bg-cool-500">
            <HourglassIcon width={ICON_SIZE} height={ICON_SIZE} className="pointer-events-none" />
            Pending
            {menu.progress === 'pending' && (
              <CheckIcon className="h-5 w-5 fill-green-500" aria-hidden="true" />
            )}
          </div>
          <div className="library-menu-item hover:text-white hover:bg-cool-500">
            <GameControllerIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              className="pointer-events-none"
            />
            In Progress
            {menu.progress === 'in progress' && (
              <CheckIcon className="h-5 w-5 fill-green-500" aria-hidden="true" />
            )}
          </div>
          <div className="library-menu-item hover:text-white hover:bg-cool-500">
            <TrophyIcon width={ICON_SIZE} height={ICON_SIZE} className="pointer-events-none" />
            Completed
            {menu.progress === 'completed' && (
              <CheckIcon className="h-5 w-5 fill-green-500" aria-hidden="true" />
            )}
          </div>
          <div className="library-menu-item hover:bg-red-500 fill-red-500 text-red-500 hover:text-white hover:fill-white">
            <TrashIcon width={ICON_SIZE} height={ICON_SIZE} className="pointer-events-none" />
            Delete
          </div>
        </div>
      </Transition>
    </div>
  )
}
