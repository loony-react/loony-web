// import MarkdownPreview from '@uiw/react-markdown-preview'
import Markdown from "react-markdown"

export default function BasicMarkdown({ source }: { source: string }) {
  return (
    <Markdown
    // source={source}
    // wrapperElement={{ "data-color-mode": "light" }}
    >
      {source}
    </Markdown>
  )
}
