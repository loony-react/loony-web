import HomeLeftNavbar from "../components/HomeLeftNavbar.tsx"
import CreateDocument from "../form/createDocument.tsx"

export default function CreateNewDocument(props: {
  url: string
  title: string
  isMobile: boolean
  docType: string
  mobileNavOpen: boolean
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <HomeLeftNavbar mobileNavOpen={props.mobileNavOpen} />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <CreateDocument {...props} />
      </main>
    </div>
  )
}
