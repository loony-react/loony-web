import Markdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import "katex/dist/katex.min.css" // `rehype-katex` does not import the CSS for you

export default function MathsMarkdown({ source }: { source: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
    >
      {source}
    </Markdown>
  )
}
