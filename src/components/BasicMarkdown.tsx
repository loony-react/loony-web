// import MarkdownPreview from '@uiw/react-markdown-preview'
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function BasicMarkdown({ source }: { source: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      // source={source}
      // wrapperElement={{ "data-color-mode": "light" }}
    >
      {source}
    </Markdown>
  )
}
