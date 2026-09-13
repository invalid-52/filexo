import { useState, useCallback } from 'react'
import { useRenamer } from '../context/RenamerContext'
import { Icons } from './ui/Icons'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

export function Hero() {
  const { addFiles } = useRenamer()
  const [dragging, setDragging] = useState(false)

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const onDragLeave = useCallback(() => {
    setDragging(false)
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files?.length) {
      addFiles(e.dataTransfer.files)
    }
  }, [addFiles])

  const onFileSelect = (e) => {
    if (e.target.files?.length) {
      addFiles(e.target.files)
    }
    e.target.value = ''
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[calc(100vh-160px)]">
      
      <div className="text-center mb-10 max-w-lg">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-text mb-4">
          Rename files. <span className="text-text-muted">Your way.</span>
        </h2>
        <p className="text-text-secondary text-base sm:text-lg">
          Batch rename files with powerful patterns, smart rules, and instant previews — entirely on your device.
        </p>
      </div>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative w-full max-w-2xl flex flex-col items-center justify-center p-12 sm:p-20 rounded-2xl border-2 border-dashed bg-surface-2/50 transition-all duration-300 group overflow-hidden shadow-sm",
          dragging ? "border-accent bg-accent/5 scale-[1.02]" : "border-border hover:border-accent-border hover:bg-surface-hover hover:shadow-md"
        )}
      >
        {/* Decorative background glow */}
        <div className={cn(
          "absolute inset-0 bg-accent/20 blur-[100px] rounded-full transition-opacity duration-500 pointer-events-none",
          dragging ? "opacity-100" : "opacity-0 group-hover:opacity-30"
        )} />

        <div className="relative z-10 flex flex-col items-center">
          <div className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 shadow-xl border border-border",
            dragging ? "bg-accent text-white scale-110 border-accent/20" : "bg-surface text-accent group-hover:-translate-y-1 group-hover:shadow-2xl"
          )}>
            <Icons.Upload className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-semibold text-text mb-2">
            {dragging ? 'Release to add files' : 'Drop files here'}
          </h3>
          <p className="text-text-muted mb-8 text-center max-w-sm">
            PDF • Images • Documents • Videos • Audio • Archives • Any file
          </p>

          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-hover hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)] h-12 px-8 text-base">
              <span>Choose Files</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={onFileSelect}
              />
            </label>
          </div>
        </div>
      </div>
      
    </div>
  )
}
