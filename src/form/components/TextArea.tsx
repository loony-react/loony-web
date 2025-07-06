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
    <div className="">
      <div className="bg-muted border border-gray-300 rounded-2xl p-4">
        {/* Tabs */}
        <div className="flex mb-3 border-b border-gray-200">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => props.setContentType(m.id)}
              className={`flex-1 text-sm font-medium px-4 py-2 text-center transition-colors duration-200 ${
                props.contentType === m.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          rows={12}
          value={props.formContent}
          placeholder={`Send a message... (${props.contentType})`}
          className="w-full bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          onChange={(event) => {
            props.setFormContent(event.target.value)
          }}
        />
      </div>
    </div>
  )
}
