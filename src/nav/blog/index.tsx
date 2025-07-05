import { Suspense, lazy } from "react"
import {
  BooleanDispatchAction,
  ReadBlogState,
  EditBlogState,
} from "loony-types"
const MobileNav = lazy(() => import("./MobileNav"))
import { Chapters } from "./BlogPageNavigation.tsx"

export default function Nav(props: {
  isMobile: boolean
  state: ReadBlogState | EditBlogState
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

  return <Chapters {...props} />
}
