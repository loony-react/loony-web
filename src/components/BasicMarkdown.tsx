import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
// import "highlight.js/styles/github-dark.css"

export default function BasicMarkdown({
  source,
  isDark,
}: {
  source: string
  isDark: boolean
}) {
  return (
    <div
      // className={`prose ${isDark ? "prose-invert bg-[#212121] text-white" : "bg-gray-50 text-black"} max-w-[60ch] sm:max-w-[70ch] md:max-w-[80ch] lg:max-w-[90ch] xl:max-w-[100ch] mb-8`}
      className={`prose ${isDark ? "prose-invert" : ""} max-w-[60ch] sm:max-w-[70ch] md:max-w-[80ch] lg:max-w-[90ch] xl:max-w-[100ch] mb-8`}
    >
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {source}
      </Markdown>
    </div>
  )
}
