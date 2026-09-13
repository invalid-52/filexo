import { useState } from 'react'
import { Icons } from './ui/Icons'
import { SettingsModal } from './SettingsModal'

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <header className="shrink-0 border-b border-border px-6">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Icons.Brand />
            <div>
              <h1 className="text-base font-semibold tracking-tight text-text leading-tight">FILEXO</h1>
            </div>
            <div className="ml-4 hidden sm:flex items-center gap-2 text-xs font-medium text-text-muted bg-surface-2 px-3 py-1 rounded-full border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              Local • Private • Fast
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="text-text-muted hover:text-text transition-colors" 
              title="Settings"
            >
              <Icons.Settings className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  )
}
