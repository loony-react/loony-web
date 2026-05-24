import { ReactNode } from "react"

export const Button = ({
  onClick,
  children,
  type = "button",
  disabled = false,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-150 bg-white text-black hover:bg-gray-100 dark:bg-[#ececec] dark:text-[#0d0d0d] dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const SubmitButton = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 bg-[#10a37f] text-white hover:bg-[#0d8c6e] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/40"
    >
      {children ?? "Submit"}
    </button>
  )
}

export const BorderButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 bg-transparent ring-1 ring-white/10 text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec] active:scale-[0.98]"
    >
      Cancel
    </button>
  )
}

export const DeleteButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 bg-red-600/10 text-red-400 ring-1 ring-red-500/20 hover:bg-red-600/20 hover:text-red-300 active:scale-[0.98]"
    >
      Delete
    </button>
  )
}

export const ButtonIcon = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md p-1.5 text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec] transition-all duration-150 active:scale-[0.95]"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
