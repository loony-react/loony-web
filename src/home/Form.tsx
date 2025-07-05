import { DesktopLeftNavbar } from "../common/index.tsx"
import CreateDocument from "../form/createDocument.tsx"

export default function CreateNewDocument(props: {
  url: string
  title: string
  isMobile: boolean
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <DesktopLeftNavbar isMobile={false} />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <CreateDocument {...props} />
      </main>
    </div>
  )
}
