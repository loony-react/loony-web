/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeLeftNavbar from "../components/HomeLeftNavbar.tsx"
import CreateDocument from "../form/createDocument.tsx"

export default function CreateNewDocument(props: any) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <HomeLeftNavbar
        mobileNavOpen={props.mobileNavOpen}
        appContext={props.appContext}
      />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <CreateDocument {...props} />
      </main>
    </div>
  )
}
