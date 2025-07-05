import { NavigateFunction, useNavigate } from "react-router"
import { AppRouteProps, DocNode } from "loony-types"
import { timeAgo } from "loony-utils"

import { DesktopLeftNavbar } from "../common/index.tsx"
import Card from "../components/Card.tsx"
import { EmptyBlog, EmptyBook } from "../components/EmptyCard.tsx"
import { useHomeBlogs, useHomeBooks } from "../hooks/home.ts"
import { HomeNavContainer } from "../components/Containers.tsx"

const Home = (props: AppRouteProps) => {
  const { isMobile, authContext, appContext } = props
  const { base_url } = appContext.env
  const navigate = useNavigate()
  const [blogs] = useHomeBlogs(authContext)
  const [books] = useHomeBooks(authContext)

  return (
    <div className="flex flex-1 overflow-hidden">
      <DesktopLeftNavbar isMobile={isMobile} />
      {/* <div className="con-xxl-80 con-sm-12">

      </div> */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Documents
            navigate={navigate}
            documents={blogs}
            base_url={base_url}
            docType="blog"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Documents
            navigate={navigate}
            documents={books}
            base_url={base_url}
            docType="book"
          />
        </div>
      </main>
    </div>
  )
}

const Documents = ({
  navigate,
  documents,
  base_url,
  docType,
}: {
  navigate: NavigateFunction
  documents: DocNode[] | null
  base_url: string
  docType: string
}) => {
  return (
    Array.isArray(documents) &&
    documents.map((node: DocNode, i) => (
      <div
        key={i}
        className="bg-white shadow rounded-lg overflow-hidden"
        onClick={() => navigate(`/view/${docType}/${node.uid}`)}
      >
        <div className="h-40 bg-gray-300" />
        <div className="p-4">
          <div className="text-sm font-semibold">{node.title}</div>
          <div className="text-xs text-gray-500">
            {timeAgo(node.created_at)}
          </div>
        </div>
      </div>
    ))
  )
}

export default Home
