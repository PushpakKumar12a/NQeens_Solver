import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dryrun from './Dryrun.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dryrun" element={<Dryrun />} />
    </Routes>
  </BrowserRouter>
)
