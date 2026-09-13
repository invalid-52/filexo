import { createContext, useContext, useState, useMemo, useCallback, useRef } from 'react'
import { buildNewName, splitName } from '../lib/renamer'
import JSZip from 'jszip'

const RenamerContext = createContext()

export function RenamerProvider({ children }) {
  const [files, setFiles] = useState([]) // { id, file, name }
  
  // Options
  const [template, setTemplate] = useState('{name}')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [useRegex, setUseRegex] = useState(false)
  const [caseMode, setCaseMode] = useState('original')
  
  // Numbering
  const [start, setStart] = useState(1)
  const [padding, setPadding] = useState(2)
  
  // Extension
  const [extMode, setExtMode] = useState('keep')
  const [extValue, setExtValue] = useState('')
  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('filexo_settings')
      if (saved) return JSON.parse(saved)
    } catch {}
    return { appearance: 'dark', autoResolve: false, animations: 'full' }
  })

  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('filexo_settings', JSON.stringify(newSettings))
  }, [])

  const idRef = useRef(0)
  
  const opts = useMemo(() => ({
    find, replace, useRegex, caseMode, template, start, padding, extMode, extValue
  }), [find, replace, useRegex, caseMode, template, start, padding, extMode, extValue])

  const addFiles = useCallback((fileList) => {
    const incoming = Array.from(fileList).map(f => ({ id: ++idRef.current, file: f, name: f.name }))
    setFiles(prev => [...prev, ...incoming])
  }, [])

  const removeFile = useCallback((id) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  const clearAll = useCallback(() => setFiles([]), [])

  const resetOptions = useCallback(() => {
    setTemplate('{name}')
    setFind('')
    setReplace('')
    setUseRegex(false)
    setCaseMode('original')
    setStart(1)
    setPadding(2)
    setExtMode('keep')
    setExtValue('')
  }, [])

  const rows = useMemo(() => {
    const seen = new Map()
    const list = files.map((f, i) => {
      const newName = buildNewName(f.name, i, opts, f.file)
      return { ...f, newName, changed: newName !== f.name }
    })
    
    // Check conflicts (duplicate target names or empty targets)
    // First pass: detect dupes
    const autoResolve = settings?.autoResolve || false

    if (autoResolve) {
      const counts = {}
      return list.map(r => {
        if (!r.newName || r.newName.trim() === '') {
          return { ...r, duplicate: true }
        }
        
        let finalName = r.newName
        if (counts[finalName] !== undefined) {
          counts[finalName]++
          const { base, ext } = splitName(finalName)
          finalName = ext ? `${base}-${counts[finalName]}.${ext}` : `${base}-${counts[finalName]}`
        } else {
          counts[finalName] = 1
        }
        
        return { ...r, newName: finalName, duplicate: false, changed: finalName !== r.name }
      })
    } else {
      list.forEach(r => {
        if (r.newName) {
          seen.set(r.newName, (seen.get(r.newName) || 0) + 1)
        }
      })
      
      return list.map(r => ({
        ...r,
        duplicate: seen.get(r.newName) > 1 || !r.newName || r.newName.trim() === ''
      }))
    }
  }, [files, opts, settings])

  const downloadAllAsZip = async () => {
    if (rows.length === 0) return
    const zip = new JSZip()
    rows.forEach(r => {
      zip.file(r.newName || r.name, r.file)
    })
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = `FILEXO_Renamed_${new Date().getTime()}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const downloadIndividual = () => {
    rows.forEach((r, i) => {
      setTimeout(() => {
        const url = URL.createObjectURL(r.file)
        const a = document.createElement('a')
        a.href = url
        a.download = r.newName || r.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }, i * 150)
    })
  }

  const download = (asZip = false) => {
    if (asZip && rows.length > 1) {
      downloadAllAsZip()
    } else {
      downloadIndividual()
    }
  }

  return (
    <RenamerContext.Provider value={{
      files, setFiles, addFiles, removeFile, clearAll,
      template, setTemplate,
      find, setFind,
      replace, setReplace,
      useRegex, setUseRegex,
      caseMode, setCaseMode,
      start, setStart,
      padding, setPadding,
      extMode, setExtMode,
      extValue, setExtValue,
      settings, updateSettings,
      resetOptions,
      rows,
      download
    }}>
      {children}
    </RenamerContext.Provider>
  )
}

export const useRenamer = () => useContext(RenamerContext)
