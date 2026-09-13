import { 
  FileText, UploadCloud, X, ArrowRight, Download, Check, AlertCircle, Plus, Sparkles, FolderArchive, Settings, Search, History
} from 'lucide-react'

export const BrandMark = ({ className }) => (
  <div className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-md bg-accent/10 border border-accent/20 text-accent ${className || ''}`}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m3 15 4 4" />
      <path d="m7 15-4 4" />
    </svg>
  </div>
)

export const Icons = {
  File: FileText,
  Upload: UploadCloud,
  Close: X,
  ArrowRight,
  Download,
  Check,
  Warning: AlertCircle,
  Plus,
  Sparkles,
  Archive: FolderArchive,
  Settings,
  Search,
  History,
  Brand: BrandMark
}
