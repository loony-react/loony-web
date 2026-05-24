type TextAreaProps = {
  formContent: string
  setFormContent: (_: string) => void
  theme: number
  setTheme: (_: number) => void
  setContentType: (type: string) => void
  contentType: string
}

const modes = [
  { id: "basic", label: "Basic" },
  { id: "markdown", label: "Markdown" },
  { id: "maths", label: "Maths" },
]

export const TextArea = (props: TextAreaProps) => {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111111] overflow-hidden">
      <div className="flex border-b border-white/[0.06]">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => props.setContentType(m.id)}
            className={`flex-1 text-xs font-medium px-4 py-2.5 transition-colors duration-150 ${
              props.contentType === m.id
                ? "text-[#ececec] border-b-2 border-[#10a37f] bg-white/[0.03]"
                : "text-[#6b6b76] hover:text-[#9b9ba4]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <textarea
        rows={12}
        value={props.formContent}
        placeholder="Write your content here…"
        className="w-full bg-transparent resize-none outline-none text-sm text-[#ececec] placeholder-[#4a4a54] px-4 py-3 leading-relaxed"
        onChange={(e) => props.setFormContent(e.target.value)}
      />
    </div>
  )
}
