import Games from './components/Games'

// const localStorageProvider = () => {
//   // Check the cache timestamp
//   const cacheTimestamp = localStorage.getItem('app-cacheTimestamp')

//   // If cache is older than 1 day then clear the cache
//   if (cacheTimestamp && Date.now() - Number(cacheTimestamp) > 86400000) {
//     localStorage.removeItem('app-cache')
//     localStorage.removeItem('app-cacheTimestamp')
//   }

//   // When initializing, we restore the data from `localStorage` into a map.
//   const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

//   // Before unloading the app, we write back all the data into `localStorage`.
//   window.addEventListener('beforeunload', () => {
//     const appCache = JSON.stringify(Array.from(map.entries()))
//     localStorage.setItem('app-cache', appCache)
//   })

//   // We still use the map for write & read for performance.
//   return map
// }

export default function App() {
  return (
    <main className="w-full min-h-screen mx-auto xl:max-w-7xl centered">
      <Games />
    </main>
  )
}
