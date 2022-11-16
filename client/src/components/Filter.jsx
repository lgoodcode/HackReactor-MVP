import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ReactComponent as CheckIcon } from '../assets/check.svg'
import { ReactComponent as ChevronUpDownIcon } from '../assets/chevron-up-down.svg'

export default function Filter({ data, selected, setSelected }) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 text-gray-100">
        <Listbox.Button className="relative w-full cursor-default bg-gray-800 rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="mr-1">Order by:</span>
          <span className="font-semibold mr-2">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-6 w-6 fill-gray-100" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full bg-gray-800 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.map((item, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-700 text-gray-100' : 'text-gray-300'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-normal' : 'font-medium'}`}>
                      {item.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5 fill-green-500" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
