import Markdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css" // `rehype-katex` does not import the CSS for you

export default function MathsMarkdown({ source }: { source: string }) {
  console.log(source)

  return (
    <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {source}
    </Markdown>
  )
}
