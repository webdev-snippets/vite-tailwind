import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/global.css'
import App from '@/App.tsx'
import { TokenProvider } from './context/authContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
    <div className='bg-surface min-h-screen flex flex-col'>
    <App />
    </div>
    </TokenProvider>
  </StrictMode>,
)
