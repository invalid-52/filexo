import { useState } from 'react'
import { useRenamer } from '../context/RenamerContext'
import { Icons } from './ui/Icons'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { cn } from '../lib/utils'

function FileRow({ file }) {
  const { removeFile } = useRenamer()
  const { id, name, newName, changed, duplicate } = file
  
  return (
    <div className={cn(
      "group flex items-center gap-3 px-4 py-3 border-b border-border/50 transition-colors",
      duplicate ? "bg-error-bg/30 hover:bg-error-bg/50" : "hover:bg-surface-hover"
    )}>
      <button 
        onClick={() => removeFile(id)}
        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-text-muted hover:text-error hover:bg-error-bg border border-transparent hover:border-error-border transition-colors"
        title="Remove file"
      >
        <Icons.Close className="w-3.5 h-3.5" />
      </button>

      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 min-w-0 font-mono text-[13px]">
        <div className="text-text-muted truncate sm:w-[40%] shrink-0" title={name}>
          {name}
        </div>
        <div className="hidden sm:block shrink-0 text-border-hover">
          <Icons.ArrowRight className="w-4 h-4" />
        </div>
        <div className={cn(
          "flex-1 truncate direction-rtl text-left",
          changed ? (duplicate ? "text-error" : "text-accent") : "text-text-secondary"
        )} title={newName || '(empty)'}>
          <bdi>{newName || '(empty)'}</bdi>
        </div>
      </div>

      {duplicate && (
        <div className="shrink-0" title="Name conflict">
          <Icons.Warning className="w-4 h-4 text-error" />
        </div>
      )}
    </div>
  )
}

export function PreviewPanel() {
  const { files, rows, download, addFiles, removeFile, clearAll } = useRenamer()
  
  const changedCount = rows.filter(r => r.changed).length
  const conflictCount = rows.filter(r => r.duplicate).length
  
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all, changed, conflicts

  const filteredRows = rows.filter(r => {
    if (filter === 'changed' && !r.changed) return false
    if (filter === 'conflicts' && !r.duplicate) return false
    if (search) {
      const s = search.toLowerCase()
      if (!r.name.toLowerCase().includes(s) && !(r.newName && r.newName.toLowerCase().includes(s))) {
        return false
      }
    }
    return true
  })

  const handleDownload = (asZip) => {
    setDownloading(true)
    setTimeout(() => {
      download(asZip)
      setDownloading(false)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2000)
    }, 100)
  }

  return (
    <div className="flex-1 bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div className="shrink-0 flex flex-col border-b border-border bg-surface-2/50">
        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">Preview</h2>
            <div className="flex items-center gap-2">
              <Badge variant="default">{files.length} file{files.length !== 1 ? 's' : ''}</Badge>
              {changedCount > 0 && <Badge variant="accent">{changedCount} changed</Badge>}
              {conflictCount > 0 && <Badge variant="error">{conflictCount} conflict{conflictCount !== 1 ? 's' : ''}</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-8">Clear All</Button>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="p-3 flex items-center gap-4 bg-surface/50">
            <div className="relative flex-1 max-w-[240px]">
              <Icons.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search files..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-surface border border-border rounded-md text-xs text-text placeholder:text-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex bg-surface border border-border rounded-md p-0.5">
              {['all', 'changed', 'conflicts'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-sm capitalize transition-colors",
                    filter === f ? "bg-surface-2 text-text shadow-sm" : "text-text-muted hover:text-text"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRows.length > 0 ? filteredRows.map(r => (
          <FileRow key={r.id} file={r} />
        )) : (
          <div className="p-8 text-center text-text-muted text-sm">
            {search || filter !== 'all' ? 'No matching files.' : 'No files added.'}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="shrink-0 p-4 border-t border-border bg-surface-2/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        {conflictCount > 0 ? (
          <div className="text-xs text-error flex items-center gap-1.5 font-medium">
            <Icons.Warning className="w-4 h-4" />
            Resolve conflicts before exporting
          </div>
        ) : (
          <div className="text-xs text-text-muted">
            All files ready
          </div>
        )}

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="cursor-pointer inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 bg-transparent border border-transparent text-text-muted hover:text-text hover:bg-hover-overlay h-8 px-3 text-xs">
            <Icons.Plus className="w-4 h-4 mr-1.5" /> <span>Add</span>
            <input type="file" multiple className="hidden" onChange={e => {
              if (e.target.files?.length) {
                addFiles(e.target.files)
                e.target.value = ''
              }
            }} />
          </label>
          <div className="flex gap-2 w-full sm:w-auto">
            {files.length > 1 && (
              <Button 
                onClick={() => handleDownload(true)} 
                disabled={conflictCount > 0 || downloading}
                variant="secondary"
                className="flex-1 sm:flex-none"
              >
                <Icons.Archive className="w-4 h-4 mr-2" />
                ZIP
              </Button>
            )}
            <Button 
              onClick={() => handleDownload(false)} 
              disabled={conflictCount > 0 || downloading}
              className={cn("flex-1 sm:flex-none min-w-[140px]", downloaded && "bg-success hover:bg-success text-white shadow-[0_0_0_3px_rgba(134,239,172,0.25)]")}
            >
              {downloading ? (
                <span>Exporting...</span>
              ) : downloaded ? (
                <>
                  <Icons.Check className="w-4 h-4 mr-2" /> Exported
                </>
              ) : (
                <>
                  <Icons.Download className="w-4 h-4 mr-2" /> Export All
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
