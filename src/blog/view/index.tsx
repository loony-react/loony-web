import { useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { createImageUrl, extractImage, useBlogNodes } from "loony-utils"
import { AppRouteProps, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "../../components/RightNav.tsx"
import { useGetBlogNodes } from "loony-api"

const View = (props: AppRouteProps) => {
  const { authContext, appContext } = props
  const { isDark } = appContext
  const { base_url } = appContext.env
  const { blogId } = useParams()
  const { user } = authContext
  const doc_id = blogId && parseInt(blogId)

  const { data } = useGetBlogNodes(doc_id as number)
  const { state, status } = useBlogNodes(data, doc_id as number)

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
    <div>
      <div className="fixed bg-gray-50 dark:bg-[#131313] text-stone-800 dark:text-stone-300 md:block w-72 bg-white p-4 space-y-6 shadow-md h-screen overflow-y-auto mt-16" />
      <main className="flex-1 h-screen ml-64 bg-stone-50 dark:bg-[#212121] pt-16">
        <div className="w-[45%] mx-auto">
          {image && (
            <img
              src={image}
              alt="Video Thumbnail"
              className="w-full h-full object-cover mb-4"
            />
          )}
          <h2 className="text-4xl dark:text-white font-semibold my-4">
            {mainNode.title}
          </h2>
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
      </main>
      <div className="fixed bottom-0 right-16 mb-4 mx-auto">
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
