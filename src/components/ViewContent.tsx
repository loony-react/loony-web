import BasicMarkdown from "./BasicMarkdown"
import MathsMarkdown from "./MathsMarkdown"

type ViewContentProps = {
  source: string
  contentType?: string
}

export default function ViewContent(props: ViewContentProps) {
  const { contentType, source } = props

  if (contentType) {
    if (contentType === "basic") {
      return <BasicMarkdown source={source.substring(8)} />
    }

    if (contentType === "markdown") {
      return <BasicMarkdown source={source.substring(11)} />
    }

    if (contentType === "maths") {
      return <MathsMarkdown source={source.substring(8)} />
    }
  }

  if (source.startsWith("<basic>")) {
    return <BasicMarkdown source={source.substring(8)} />
  }

  if (source.startsWith("<markdown>")) {
    return <BasicMarkdown source={source.substring(11)} />
  }

  if (source.startsWith("<maths>")) {
    return <MathsMarkdown source={source.substring(8)} />
  }

  return <BasicMarkdown source={source} />
}
