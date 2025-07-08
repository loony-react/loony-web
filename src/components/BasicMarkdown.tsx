import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function BasicMarkdown({ source }: { source: string }) {
  return (
    <div className="prose max-w-[60ch] sm:max-w-[70ch] md:max-w-[80ch] lg:max-w-[90ch] xl:max-w-[100ch] mb-8 dark:text-gray-50">
      <Markdown remarkPlugins={[remarkGfm]}>{source}</Markdown>
    </div>
  )
}
