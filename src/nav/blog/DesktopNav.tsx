import { ReadBlogState } from "loony-types"
import { Chapters } from "./BlogPageNavigation.tsx"

export default function ViewNav(props: { state: ReadBlogState }) {
  const { state } = props
  return <Chapters state={state} />
}
