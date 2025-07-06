export default function DeleteModal({
  cancel,
  confirm,
  title,
}: {
  cancel: () => void
  confirm: () => void
  title?: string
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete?</p>
        <p className="text-blue-600 text-lg mb-6">{title}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={cancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
