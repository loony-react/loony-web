/* eslint-disable @typescript-eslint/no-explicit-any */
export const CancelButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-[#cccccc] dark:border-[#4d4d4d] hover:border-[#666666] text-gray-800 dark:text-white rounded"
    >
      Cancel
    </button>
  )
}

export const SubmitButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-[#f0f0f0] hover:bg-[#dedede] text-gray-800 rounded"
    >
      Submit
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
      onClick={onClick}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Delete
    </button>
  )
}

export const ButtonIcon = ({ onClick, children }: any) => {
  return (
    <button
      className="p-2 rounded-md text-[#2d2d2d] dark:text-white hover:bg-[#ececec] dark:hover:bg-[#333333] transition"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
