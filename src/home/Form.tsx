import HomeLeftNavbar from "../components/HomeLeftNavbar.tsx"
import CreateDocument from "../form/createDocument.tsx"
import { AppRouteProps } from "loony-types"

export default function CreateNewDocument(
  props: AppRouteProps & { url: string; title: string; docType: string },
) {
  return (
    <div className="flex flex-1 overflow-hidden h-screen">
      <HomeLeftNavbar
        mobileNavOpen={props.mobileNavOpen}
        appContext={props.appContext}
      />
      <main className="ml-64 flex-1 bg-[var(--bg)] overflow-y-auto mt-14 px-8 py-8">
        <CreateDocument {...props} />
      </main>
    </div>
  )
}
