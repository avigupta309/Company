import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Router from './components/Router/Router.tsx'
import { ContextProvider } from './components/ContextApi/ContextApi.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
    {/* <Router/> */}
    <App/>
    </ContextProvider>
  </StrictMode>,
)
