import { MdClose } from 'react-icons/md'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import CustomSpinner from './Spinner.tsx'
import { Alert } from 'loony-types'

const alertStyles: Record<string, string> = {
  success: "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800",
  error: "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800",
  request: "bg-orange-400 border border-orange-500",
}

const alertIcons: Record<string, React.ReactNode> = {
  success: <FaCircleCheck className="text-green-600 dark:text-green-400 w-8 h-8" />,
  error: <FaCircleXmark className="text-red-600 dark:text-red-400 w-8 h-8" />,
  request: <CustomSpinner color="#fff" />,
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
    <div className="fixed right-5 top-5 z-[1001] w-80 shadow-lg rounded-lg overflow-hidden">
      <div className={`${alertStyles[alert.status] ?? ""} flex items-center gap-3 px-4 py-4`}>
        <div className="flex-shrink-0">
          {alertIcons[alert.status]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{alert.title}</p>
          {alert.content && (
            <p className="text-xs mt-0.5 text-gray-600 dark:text-gray-300">{alert.content}</p>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <MdClose className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default AlertComponent
