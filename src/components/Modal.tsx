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
      <div className="w-full max-w-sm mx-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">Confirm deletion</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-1">This action cannot be undone.</p>
          {title && (
            <p className="text-sm text-red-400 font-medium mt-3 truncate">"{title}"</p>
          )}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[var(--border)]">
          <BorderButton onClick={cancel} />
          <DeleteButton onClick={confirm} />
        </div>
      </div>
    </div>
  )
}
