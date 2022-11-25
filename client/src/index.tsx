import { render } from 'preact'
import App from './App'
import { createFastContext } from './lib/fastContext'
import './index.css'

if (!import.meta.env.VITE_API_URL) {
  throw new Error('API_URL is not defined')
} else if (!import.meta.env.VITE_RAWG_API_KEY) {
  throw new Error('API_URL is not defined')
} else if (!import.meta.env.VITE_APP_TITLE) {
  throw new Error('APP_TITLE is not defined')
}

const { StoreProvider } = createFastContext<Store>({
  session: null,
  modal: {
    overlay: false,
    scrollLock: false,
    content: null,
  },
  libraryMenu: {
    open: false,
    gameId: -1,
    progress: 'not started',
    x: -1,
    y: -1,
    update: () => null,
    remove: () => null,
  },
})

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('app') as HTMLElement
)
