import { NavigateFunction, useNavigate } from "react-router"
import { AppRouteProps, DocNode } from "loony-types"
import { createImageUrl, extractImage, timeAgo } from "loony-utils"
import { User } from "lucide-react"

import { DesktopLeftNavbar } from "../common/index.tsx"
import { useHomeBlogs, useHomeBooks } from "../hooks/home.ts"

const Home = (props: AppRouteProps) => {
  const { isMobile, authContext, appContext } = props
  const { base_url } = appContext.env
  const navigate = useNavigate()
  const [blogs] = useHomeBlogs(authContext)
  const [books] = useHomeBooks(authContext)

  return (
    <div className="flex flex-1 overflow-hidden">
      <DesktopLeftNavbar isMobile={isMobile} />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Documents
            navigate={navigate}
            documents={blogs}
            base_url={base_url}
            docType="blog"
          />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

const Documents = (props: {
  navigate: NavigateFunction
  documents: DocNode[] | null
  base_url: string
  docType: string
}) => {
  return (
    Array.isArray(props.documents) &&
    props.documents.map((node: DocNode, i) => (
      <Card key={i} {...props} node={node} />
    ))
  )
}

const Card = ({
  navigate,
  base_url,
  docType,
  node,
}: {
  navigate: NavigateFunction
  base_url: string
  docType: string
  node: DocNode
}) => {
  const image = createImageUrl({
    baseUrl: base_url,
    uid: node.uid,
    image: extractImage(node.images),
    docType,
    size: 340,
  })

  return (
    <div
      className="rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
      onClick={() => navigate(`/view/${docType}/${node.uid}`)}
    >
      <div className="relative w-full h-44 bg-gray-100 flex items-center justify-center">
        {image ? (
          <>
            <img
              src={image}
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
              12:34
            </span>
          </>
        ) : (
          <h3 className="text-center text-sm font-semibold px-4 text-gray-700">
            {node.title}
          </h3>
        )}
      </div>
      <div className="flex p-4">
        <div className="w-10 h-10 mr-2 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {node.title}
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">Sankar Boro</p>
          <p className="text-xs text-gray-500">
            0 views • {timeAgo(node.created_at)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
