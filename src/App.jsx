import { useEffect } from 'react'
import { useRenamer } from './context/RenamerContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Workspace } from './components/Workspace'

function AppContent() {
  const { files, settings } = useRenamer()
  
  useEffect(() => {
    const root = document.documentElement
    
    // Theme
    let isLight = false
    if (settings.appearance === 'light') {
      isLight = true
    } else if (settings.appearance === 'system') {
      isLight = window.matchMedia('(prefers-color-scheme: light)').matches
    }
    
    if (isLight) root.classList.add('light')
    else root.classList.remove('light')

    // Animations
    if (settings.animations === 'off') {
      root.classList.add('no-animations')
      root.classList.remove('reduced-animations')
    } else if (settings.animations === 'reduced') {
      root.classList.add('reduced-animations')
      root.classList.remove('no-animations')
    } else {
      root.classList.remove('no-animations', 'reduced-animations')
    }
  }, [settings.appearance, settings.animations])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col">
        {files.length === 0 ? <Hero /> : <Workspace />}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  // We need to wrap AppContent in RenamerProvider in main.jsx or here.
  // We'll just export App, but main.jsx will need RenamerProvider, or we can wrap it here.
  return <AppContent />
}
