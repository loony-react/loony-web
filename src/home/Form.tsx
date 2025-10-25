/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeLeftNavbar from "../components/HomeLeftNavbar.tsx"
import CreateDocument from "../form/createDocument.tsx"

export default function CreateNewDocument(props: any) {
  return (
    <div className="flex flex-1 overflow-hidden h-screen">
      <HomeLeftNavbar
        mobileNavOpen={props.mobileNavOpen}
        appContext={props.appContext}
      />
      <main className="ml-72 p-4 flex-1 bg-stone-50 dark:bg-[#212121] overflow-y-auto mt-16">
        <CreateDocument {...props} />
      </main>
    </div>
  )
}
