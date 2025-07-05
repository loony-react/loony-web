import { Suspense, lazy } from "react"
import {
  EditBookAction,
  EditBookState,
  VoidReturnFunction,
  BooleanDispatchAction,
} from "loony-types"
import { PageNavigation } from "./editPageNavigation"
const MobileNav = lazy(() => import("./MobileNav"))

export default function Nav(props: {
  setState: EditBookAction
  state: EditBookState
  doc_id: number
  isMobile: boolean
  viewFrontPage: VoidReturnFunction
  setMobileNavOpen: BooleanDispatchAction
  mobileNavOpen: boolean
}) {
  if (props.isMobile) {
    return (
      <Suspense fallback={<></>}>
        <MobileNav {...props} />;
      </Suspense>
    )
  }

  return <PageNavigation {...props} />
}
