import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dryrun from './Dryrun.jsx'

const root = createRoot(document.getElementById('root'))

function render() {
  const path = window.location.pathname
  if (path.startsWith('/dryrun')) {
    root.render(<Dryrun />)
  } else {
    root.render(<App />)
  }
}

window.addEventListener('popstate', render)
render()
