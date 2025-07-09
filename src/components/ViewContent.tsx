import BasicMarkdown from "./BasicMarkdown"
import MathsMarkdown from "./MathsMarkdown"

type ViewContentProps = {
  source: string
  contentType?: string
  isDark: boolean
}

export default function ViewContent(props: ViewContentProps) {
  const { contentType, source, isDark } = props

  if (contentType) {
    if (contentType === "basic") {
      return <BasicMarkdown source={source.substring(8)} isDark={isDark} />
    }

    if (contentType === "markdown") {
      return <BasicMarkdown source={source.substring(11)} isDark={isDark} />
    }

    if (contentType === "maths") {
      return <MathsMarkdown source={source.substring(8)} isDark={isDark} />
    }
  }

  if (source.startsWith("<basic>")) {
    return <BasicMarkdown source={source.substring(8)} isDark={isDark} />
  }

  if (source.startsWith("<markdown>")) {
    return <BasicMarkdown source={source.substring(11)} isDark={isDark} />
  }

  if (source.startsWith("<maths>")) {
    return <MathsMarkdown source={source.substring(8)} isDark={isDark} />
  }

  return <BasicMarkdown source={source} isDark={isDark} />
}
