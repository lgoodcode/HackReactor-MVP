import { render } from 'preact'
import App from './App'
import { createFastContext } from './lib/fastContext'
import './index.css'

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
    progress: 'pending',
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
