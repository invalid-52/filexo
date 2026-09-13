import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RenamerProvider } from './context/RenamerContext'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RenamerProvider>
      <App />
    </RenamerProvider>
  </React.StrictMode>,
)
