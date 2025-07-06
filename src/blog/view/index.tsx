import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { extractImage } from "loony-utils"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { getBlogNodes } from "loony-utils"
import { AppRouteProps, ReadBlogState, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "nav/RightNav.tsx"

const View = (props: AppRouteProps) => {
  const { isMobile, appContext, authContext } = props
  const { base_url } = appContext.env
  const { blogId } = useParams()
  const doc_id = blogId && parseInt(blogId)

  const [state, setState] = useState<ReadBlogState>({
    mainNode: null,
    childNodes: [],
    topNode: null,
    doc_id: doc_id as number,
  })
  const [status, setStatus] = useState({
    status: PageStatus.IDLE,
    error: "",
  })

  useEffect(() => {
    if (doc_id) {
      getBlogNodes(doc_id, setState, setStatus)
    }
  }, [doc_id])

  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer isMobile={isMobile} />

  const { childNodes, mainNode } = state
  if (!mainNode || !mainNode) return null

  const image = extractImage(mainNode.images)

  return (
    <div className="w-[70%] mx-auto mt-10 flex">
      <div className="w-[20%]" />
      <div className="w-[60%] mb-50">
        <div className="w-[90%] mx-[5%]">
          <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
            {mainNode.title}
          </h2>

          <ViewContent source={mainNode.content} />
          {childNodes.map((node, id) => {
            return <ViewContent key={id} source={node.content} />
          })}
        </div>
      </div>
      <div className="w-[20%]">
        <RightNavEdit
          doc_id={doc_id as number}
          authContext={authContext}
          mainNode={mainNode}
          docType="blog"
        />
      </div>
    </div>
  )
}

export default View
