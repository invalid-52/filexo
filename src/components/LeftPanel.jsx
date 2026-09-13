import { useRenamer } from '../context/RenamerContext'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Icons } from './ui/Icons'

const CORE_TOKENS = [
  { label: '{name}', desc: 'Original base name' },
  { label: '{n}', desc: 'Sequential number' },
  { label: '{date}', desc: 'Current date (YYYY-MM-DD)' },
  { label: '{ext}', desc: 'Original extension' },
]

const ADV_TOKENS = [
  { label: '{yyyy}', desc: '4-digit year' },
  { label: '{mm}', desc: '2-digit month' },
  { label: '{dd}', desc: '2-digit day' },
  { label: '{time}', desc: 'Current time (HH-MM-SS)' },
  { label: '{index}', desc: '0-based index' },
  { label: '{original}', desc: 'Original full base name' },
  { label: '{random}', desc: 'Random 6-char string' },
]

export function LeftPanel() {
  const { 
    template, setTemplate, 
    find, setFind, 
    replace, setReplace, 
    useRegex, setUseRegex,
    caseMode, setCaseMode,
    start, setStart,
    padding, setPadding,
    extMode, setExtMode,
    extValue, setExtValue,
    resetOptions
  } = useRenamer()

  const insertToken = (token) => {
    setTemplate(prev => prev + token)
  }

  return (
    <div className="flex flex-col gap-6 w-full lg:w-[400px] shrink-0">
      
      {/* Recipe Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text">Rename Recipe</h2>
        <Button variant="ghost" size="sm" onClick={resetOptions} title="Reset all options">
          Reset
        </Button>
      </div>

      {/* Pattern Builder */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Pattern</span>
          </div>
          <Input 
            value={template} 
            onChange={e => setTemplate(e.target.value)}
            placeholder="{name}"
            className="font-mono text-base h-12"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {CORE_TOKENS.map(t => (
              <button 
                key={t.label} 
                onClick={() => insertToken(t.label)}
                title={t.desc}
                className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
              >
                {t.label}
              </button>
            ))}
            <div className="relative group">
              <button className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-surface-2 text-text-secondary border border-border hover:bg-hover-overlay transition-colors flex items-center gap-1">
                More <Icons.Plus className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block w-48 bg-surface-2 border border-border rounded-lg shadow-xl p-2 z-20">
                {ADV_TOKENS.map(t => (
                  <button 
                    key={t.label}
                    onClick={() => insertToken(t.label)}
                    className="w-full text-left px-2 py-1.5 text-xs font-mono text-text-secondary hover:text-text hover:bg-hover-overlay rounded-md flex justify-between items-center"
                  >
                    <span>{t.label}</span>
                    <span className="text-[10px] text-text-muted font-sans opacity-0 group-hover:opacity-100">{t.desc.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm flex flex-col">
        
        {/* Find & Replace */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Find & Replace</span>
            <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer hover:text-text transition-colors">
              <input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} className="accent-accent" />
              Regex
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input value={find} onChange={e => setFind(e.target.value)} placeholder="Find" />
            <Input value={replace} onChange={e => setReplace(e.target.value)} placeholder="Replace with" />
          </div>
        </div>

        {/* Case */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Case Transformation</span>
          </div>
          <div className="flex flex-wrap gap-1 bg-surface-2 p-1 rounded-lg border border-border">
            {[
              { id: 'original', label: 'Original' },
              { id: 'lower', label: 'lower' },
              { id: 'upper', label: 'UPPER' },
              { id: 'title', label: 'Title' },
              { id: 'camel', label: 'camelCase' },
              { id: 'pascal', label: 'PascalCase' },
              { id: 'kebab', label: 'kebab-case' },
              { id: 'snake', label: 'snake_case' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setCaseMode(c.id)}
                className={`flex-1 min-w-[70px] text-xs font-medium px-2 py-1.5 rounded-md transition-colors ${caseMode === c.id ? 'bg-accent text-white shadow-sm' : 'text-text-secondary hover:text-text hover:bg-hover-overlay'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Numbering */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Numbering <span className="normal-case font-normal opacity-60">(uses {'{n}'})</span></span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-text-muted mb-1.5 ml-1">Start At</label>
              <Input type="number" min="0" value={start} onChange={e => setStart(parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-[11px] text-text-muted mb-1.5 ml-1">Padding Digits</label>
              <Input type="number" min="0" max="8" value={padding} onChange={e => setPadding(parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>

        {/* Extension */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Extension</span>
          </div>
          <div className="flex flex-wrap gap-1 bg-surface-2 p-1 rounded-lg border border-border">
            {[
              { id: 'keep', label: 'Keep' },
              { id: 'lower', label: 'lower' },
              { id: 'upper', label: 'UPPER' },
              { id: 'set', label: 'Set to...' },
              { id: 'remove', label: 'Remove' }
            ].map(x => (
              <button
                key={x.id}
                onClick={() => setExtMode(x.id)}
                className={`flex-1 text-xs font-medium px-2 py-1.5 rounded-md transition-colors ${extMode === x.id ? 'bg-accent text-white shadow-sm' : 'text-text-secondary hover:text-text hover:bg-hover-overlay'}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          {extMode === 'set' && (
            <div className="mt-3">
              <Input value={extValue} onChange={e => setExtValue(e.target.value)} placeholder="e.g. webp" />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
