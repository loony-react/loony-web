import { NavigateFunction } from "react-router"
import { FilePlus } from "lucide-react"

const EmptyCard = ({
  title,
  navigate,
  docType,
}: {
  title: string
  navigate: NavigateFunction
  docType: string
}) => {
  return (
    <div className="rounded-xl overflow-hidden border border-dashed border-white/15 bg-transparent hover:border-white/25 transition-colors duration-200">
      <div className="flex flex-col items-center justify-center text-center p-8 gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
          <FilePlus className="w-5 h-5 text-[#6b6b76]" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#9b9ba4]">{title}</p>
          <p className="text-xs text-[#6b6b76]">Get started by creating your first {docType}</p>
        </div>
        <button
          className="mt-1 px-4 py-2 text-sm font-medium rounded-lg bg-white/5 text-[#9b9ba4] ring-1 ring-white/10 hover:bg-white/10 hover:text-[#ececec] transition-all duration-150"
          onClick={() => {
            navigate(`/create/${docType}`)
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export { EmptyCard }
