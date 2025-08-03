import { CancelButton, DeleteButton } from "loony-ui"

export default function DeleteModal({
  cancel,
  confirm,
  title,
}: {
  cancel: () => void
  confirm: (e: any) => void
  title?: string
}) {
  console.log(title)
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-[#2e2e2e] rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 dark:text-[#ccc] mb-6">
          Are you sure you want to delete?
        </p>
        <p className="text-blue-600 dark:text-red-300 text-lg mb-6">{title}</p>
        <div className="flex justify-end space-x-2">
          <CancelButton onClick={cancel} />
          <DeleteButton onClick={confirm} />
        </div>
      </div>
    </div>
  )
}
