import { MdClose } from 'react-icons/md'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import CustomSpinner from './Spinner.tsx'
import { Alert } from 'loony-types'

const alertStyles: Record<string, string> = {
  success: "bg-[#0d2818] border border-green-800/40",
  error: "bg-[#2a0d0d] border border-red-800/40",
  request: "bg-[#1a1a1a] border border-white/[0.08]",
}

const alertIcons: Record<string, React.ReactNode> = {
  success: <FaCircleCheck className="text-green-400 w-5 h-5" />,
  error: <FaCircleXmark className="text-red-400 w-5 h-5" />,
  request: <CustomSpinner color="#10a37f" />,
}

const AlertComponent = ({
  alert,
  onClose,
}: {
  alert: Alert
  onClose: React.MouseEventHandler<HTMLButtonElement>
}) => {
  if (!alert) return null
  return (
    <div className="fixed right-5 top-5 z-[1001] w-80 shadow-2xl rounded-xl overflow-hidden">
      <div className={`${alertStyles[alert.status] ?? ""} flex items-center gap-3 px-4 py-3.5`}>
        <div className="flex-shrink-0">
          {alertIcons[alert.status]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#ececec]">{alert.title}</p>
          {alert.content && (
            <p className="text-xs mt-0.5 text-[#9b9ba4]">{alert.content}</p>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="flex-shrink-0 text-[#6b6b76] hover:text-[#9b9ba4] transition-colors"
        >
          <MdClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default AlertComponent
