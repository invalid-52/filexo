import { LeftPanel } from './LeftPanel'
import { PreviewPanel } from './PreviewPanel'

export function Workspace() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 mx-auto w-full max-w-[1600px] min-h-[calc(100vh-160px)] items-start">
      <LeftPanel />
      <PreviewPanel />
    </div>
  )
}
