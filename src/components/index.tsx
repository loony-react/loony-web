import { MdClose } from "react-icons/md"

export const HR = <hr className="border-t border-white/10 mb-4" />

export const ModalFull = ({
  visible,
  children,
}: {
  children: React.ReactNode
  visible: boolean
}) => {
  if (!visible) {
    return null
  }

  return <div className="modal-print">{children}</div>
}

export const CustomModal = ({
  visible,
  children,
}: {
  children: React.ReactNode
  visible: boolean
}) => {
  if (!visible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl mx-4 bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export const ModalMd = ({
  visible,
  children,
  onClose,
  title,
}: {
  children: React.ReactNode
  visible: boolean
  onClose: React.MouseEventHandler<HTMLDivElement>
  title: string
}) => {
  if (!visible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <h2 className="text-lg font-semibold text-[#ececec] break-words">
            {title}
          </h2>
          <div
            onClick={onClose}
            className="p-1.5 rounded-md text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec] cursor-pointer transition-colors duration-150"
            role="button"
            aria-label="Close modal"
          >
            <MdClose size={16} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export const Modal = ({
  visible,
  children,
  onClose,
  title,
}: {
  children: React.ReactNode
  visible: boolean
  onClose: React.MouseEventHandler<HTMLDivElement>
  title: string
}) => {
  if (!visible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <h2 className="text-xl font-semibold text-[#ececec] break-words">
            {title}
          </h2>
          <button
            onClick={onClose as React.MouseEventHandler<HTMLButtonElement>}
            className="p-1.5 rounded-md text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec] transition-colors duration-150"
            aria-label="Close modal"
          >
            <MdClose size={16} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export const ModalButtonContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="px-6 py-4 flex justify-end gap-3 border-t border-white/[0.08] bg-[#1a1a1a]/50">
      {children}
    </div>
  )
}

export const ModalBodyContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="px-6 py-5 text-[#9b9ba4] text-sm leading-relaxed">
      {children}
    </div>
  )
}
