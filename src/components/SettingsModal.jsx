import { Icons } from './ui/Icons'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'
import { useRenamer } from '../context/RenamerContext'

export function SettingsModal({ isOpen, onClose }) {
  const { settings, updateSettings } = useRenamer()

  const updateSetting = (key, val) => {
    updateSettings({ ...settings, [key]: val })
  }

  if (!isOpen || !settings) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text">Settings</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors">
            <Icons.Close className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Appearance</label>
            <div className="flex bg-surface-2 p-1 rounded-lg border border-border">
              {['dark', 'light', 'system'].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateSetting('appearance', opt)}
                  className={cn(
                    "flex-1 text-xs font-medium px-2 py-1.5 rounded-md capitalize transition-colors",
                    settings.appearance === opt ? "bg-accent text-white shadow-sm" : "text-text-secondary hover:text-text"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Rename Behavior</label>
            <label 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={(e) => { e.preventDefault(); updateSetting('autoResolve', !settings.autoResolve); }}
            >
              <div className={cn(
                "w-8 h-4.5 rounded-full transition-colors relative",
                settings.autoResolve ? "bg-accent" : "bg-surface-2 border border-border"
              )}>
                <div className={cn(
                  "absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-sm",
                  settings.autoResolve ? "left-[calc(100%-2px)] -translate-x-full" : "left-[2px]"
                )} />
              </div>
              <span className="text-sm text-text-secondary group-hover:text-text transition-colors">Auto-resolve conflicts</span>
            </label>
            <p className="text-[11px] text-text-muted ml-11">Automatically appends a number to duplicate targets.</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Animations</label>
            <div className="flex bg-surface-2 p-1 rounded-lg border border-border">
              {['full', 'reduced', 'off'].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateSetting('animations', opt)}
                  className={cn(
                    "flex-1 text-xs font-medium px-2 py-1.5 rounded-md capitalize transition-colors",
                    settings.animations === opt ? "bg-accent text-white shadow-sm" : "text-text-secondary hover:text-text"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="p-4 border-t border-border bg-surface-2/30 flex justify-end">
          <Button onClick={onClose} variant="primary">Done</Button>
        </div>

      </div>
    </div>
  )
}
