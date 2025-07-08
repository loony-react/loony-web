import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const theme = "dark"
export default function BasicMarkdown({ source }: { source: string }) {
  return (
    <div
      className={`prose ${theme === "dark" ? "prose-invert bg-zinc-900 text-white" : "bg-white text-black"} max-w-[60ch] sm:max-w-[70ch] md:max-w-[80ch] lg:max-w-[90ch] xl:max-w-[100ch] mb-8`}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{source}</Markdown>
    </div>
  )
}
