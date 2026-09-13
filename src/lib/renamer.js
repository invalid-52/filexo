export function splitName(filename) {
  const dot = filename.lastIndexOf('.')
  if (dot <= 0) return { base: filename, ext: '' }
  return { base: filename.slice(0, dot), ext: filename.slice(dot + 1) }
}

export function applyCase(str, mode) {
  if (!str) return str
  switch (mode) {
    case 'lower':
      return str.toLowerCase()
    case 'upper':
      return str.toUpperCase()
    case 'title':
      return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    case 'camel':
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ''
        return index === 0 ? match.toLowerCase() : match.toUpperCase()
      }).replace(/[\s-_]+/g, '')
    case 'pascal':
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
        if (+match === 0) return ''
        return match.toUpperCase()
      }).replace(/[\s-_]+/g, '')
    case 'kebab':
      return str.trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').toLowerCase()
    case 'snake':
      return str.trim().replace(/[\s-]+/g, '_').replace(/_+/g, '_').toLowerCase()
    default:
      return str
  }
}

export function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function buildNewName(orig, index, opts, originalFileObj) {
  const {
    find,
    replace,
    useRegex,
    caseMode,
    template,
    start,
    padding,
    extMode,
    extValue,
  } = opts

  const { base, ext } = splitName(orig)
  let workBase = base

  // Find & Replace
  if (find) {
    try {
      const pattern = useRegex ? new RegExp(find, 'g') : new RegExp(escapeRegExp(find), 'g')
      workBase = workBase.replace(pattern, replace)
    } catch {
      // invalid regex, ignore
    }
  }

  // Case
  workBase = applyCase(workBase, caseMode)

  // Tokens
  const d = originalFileObj && originalFileObj.lastModified ? new Date(originalFileObj.lastModified) : new Date()
  
  const padDate = (n) => String(n).padStart(2, '0')
  const yyyy = d.getFullYear()
  const mm = padDate(d.getMonth() + 1)
  const dd = padDate(d.getDate())
  const dateStr = `${yyyy}-${mm}-${dd}`
  const timeStr = `${padDate(d.getHours())}-${padDate(d.getMinutes())}-${padDate(d.getSeconds())}`
  const seq = String(start + index).padStart(Math.max(0, padding), '0')
  const randomStr = Math.random().toString(36).substring(2, 8)

  const tpl = template && template.trim() ? template : '{name}'
  let newBase = tpl
    .replace(/\{name\}/g, workBase)
    .replace(/\{original\}/g, base)
    .replace(/\{n\}/g, seq)
    .replace(/\{index\}/g, index + 1)
    .replace(/\{date\}/g, dateStr)
    .replace(/\{yyyy\}/g, yyyy)
    .replace(/\{mm\}/g, mm)
    .replace(/\{dd\}/g, dd)
    .replace(/\{time\}/g, timeStr)
    .replace(/\{random\}/g, randomStr)
    .replace(/\{ext\}/g, ext)

  // Extension handling
  let newExt = ext
  if (extMode === 'set') newExt = extValue.replace(/^\.+/, '').trim()
  else if (extMode === 'lower') newExt = ext.toLowerCase()
  else if (extMode === 'upper') newExt = ext.toUpperCase()
  else if (extMode === 'remove') newExt = ''

  return newExt ? `${newBase}.${newExt}` : newBase
}
