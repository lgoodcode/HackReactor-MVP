import { render } from 'preact'
import App from './App'
import { createFastContext } from './utils/fastContext'
import './index.css'

type Store = {
  session: Session
}

const { StoreProvider } = createFastContext<Store>({
  session: null,
})

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('app') as HTMLElement
)
