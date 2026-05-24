import { BorderButton, DeleteButton } from "loony-ui"

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 bg-[#1a1a1a] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5">
          <h2 className="text-base font-semibold text-[#ececec] mb-1">Confirm deletion</h2>
          <p className="text-sm text-[#9b9ba4] mb-1">This action cannot be undone.</p>
          {title && (
            <p className="text-sm text-red-400 font-medium mt-3 truncate">"{title}"</p>
          )}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
          <BorderButton onClick={cancel} />
          <DeleteButton onClick={confirm} />
        </div>
      </div>
    </div>
  )
}
