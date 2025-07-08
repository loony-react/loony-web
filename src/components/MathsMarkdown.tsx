import Markdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import "katex/dist/katex.min.css" // `rehype-katex` does not import the CSS for you

const theme = "dark"
export default function MathsMarkdown({ source }: { source: string }) {
  return (
    <div
      className={`prose ${theme === "dark" ? "prose-invert bg-stone-800 text-white" : "bg-white text-black"} max-w-[60ch] sm:max-w-[70ch] md:max-w-[80ch] lg:max-w-[90ch] xl:max-w-[100ch] mb-8`}

      // className="prose max-w-[60ch] sm:max-w-[70ch] md:max-w-[80ch] lg:max-w-[90ch] xl:max-w-[100ch] mb-8"
    >
      <Markdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      >
        {source}
      </Markdown>
    </div>
  )
}
