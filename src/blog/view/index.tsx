import { useState, useEffect } from "react"
import { useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { createImageUrl, extractImage, getBlogNodes } from "loony-utils"
import { AppRouteProps, ReadBlogState, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "components/RightNav.tsx"

const View = (props: AppRouteProps) => {
  const { authContext, appContext } = props
  const { isDark } = appContext
  const { base_url } = appContext.env
  const { blogId } = useParams()
  const { user } = authContext
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
    return <PageLoadingContainer title="" />

  const { childNodes, mainNode } = state
  if (!mainNode || !mainNode || !user) return null

  const image = createImageUrl({
    docType: "blog",
    baseUrl: base_url,
    nodeId: mainNode.uid,
    image: extractImage(mainNode.images),
    size: 720,
  })

  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  return (
    <div className="sm:w-[90%] md:w-[70%] mx-auto mt-4 flex bg-stone-50 text-stone-800 dark:bg-[#272727] dark:text-stone-50">
      <div className="hidden md:block w-[20%]" />
      <div className="sm:w-[90%] md:w-[60%] mb-50">
        <div className="w-[90%] mx-[5%]">
          {image && (
            <img
              src={image}
              alt="Video Thumbnail"
              className="w-full h-full object-cover mb-4"
            />
          )}
          <h2 className="text-4xl font-semibold my-4">{mainNode.title}</h2>
          <ViewContent source={mainNode.content} isDark={isDark} />
          {childNodes.map((node, id) => {
            return (
              <>
                <h2 className="text-2xl font-semibold my-4 border-b border-gray-300">
                  {node.title}
                </h2>
                <ViewContent key={id} source={node.content} isDark={isDark} />
              </>
            )
          })}
        </div>
      </div>
      <div className="hidden md:block md:w-[18%]">
        <div className="border-l border-gray-300">
          <RightNavEdit
            doc_id={doc_id as number}
            authContext={authContext}
            mainNode={mainNode}
            docType="blog"
          />
        </div>
      </div>
    </div>
  )
}

export default View
