export function Footer() {
  return (
    <footer className="mt-auto shrink-0 border-t border-border py-8 px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-sm font-semibold text-text tracking-wide">FILEXO</span>
          <span className="text-xs text-text-muted">Smart file renaming, entirely on your device.</span>
        </div>
        
        <div className="text-xs text-text-muted">
          Crafted by <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 tracking-widest text-[11px] uppercase">RHLIVERSE</span>
        </div>

      </div>
    </footer>
  )
}
