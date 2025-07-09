import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function BasicMarkdown({
  source,
  isDark,
}: {
  source: string
  isDark: boolean
}) {
  return (
    <div
      className={`prose ${isDark ? "prose-invert bg-[#272727] text-white" : "bg-white text-black"} max-w-[60ch] sm:max-w-[70ch] md:max-w-[80ch] lg:max-w-[90ch] xl:max-w-[100ch] mb-8`}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{source}</Markdown>
    </div>
  )
}
