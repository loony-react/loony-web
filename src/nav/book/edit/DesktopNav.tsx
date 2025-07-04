import { PageNavigation } from "./editPageNavigation.tsx"
import { EditBookAction, EditBookState, VoidReturnFunction } from "loony-types"

export default function DesktopNav(props: {
  setState: EditBookAction
  state: EditBookState
  doc_id: number
  isMobile: boolean
  viewFrontPage: VoidReturnFunction
}) {
  return <PageNavigation {...props} />
}
