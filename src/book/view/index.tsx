import { createImageUrl, extractImage, useBookNodes } from "loony-utils"
import { useGetBookNav } from "loony-api"
import { useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { AppRouteProps, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "components/RightNav.tsx"
import { PageNavigation } from "./PageNavigation.tsx"

const View = (props: AppRouteProps) => {
  const { appContext, authContext, mobileNavOpen, setMobileNavOpen } = props
  const { isDark, device } = appContext
  const { base_url } = appContext.env
  const { bookId } = useParams()
  const doc_id = bookId && parseInt(bookId)

  const { data: book_data } = useGetBookNav(doc_id)
  const { state, setState, pageStatus } = useBookNodes(book_data)

  const { parentNode, navNodes, frontPage, childNodes, mainNode } = state

  if (pageStatus.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  if (!parentNode || !mainNode || !frontPage || !doc_id) return null
  const viewFrontPage = () => {
    setState({
      ...state,
      page_id: state.frontPage?.uid || null,
      parentNode: frontPage,
      childNodes: [],
    })
  }
  const image = createImageUrl({
    docType: "book",
    baseUrl: base_url,
    nodeId: doc_id,
    image: extractImage(parentNode.images),
    size: 720,
  })

  return (
    <div>
      <PageNavigation
        doc_id={doc_id}
        setState={setState}
        state={state}
        viewFrontPage={viewFrontPage}
        navNodes={navNodes}
        {...props}
      />
      <main className="flex-1 h-screen ml-64 bg-stone-50 dark:bg-[#212121] p-6">
        <div
          className="bg-gray-50"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (device.type === "mobile") {
              if (mobileNavOpen) {
                setMobileNavOpen(false)
              }
            }
          }}
        >
          <div className="w-[45%] mx-auto">
            {parentNode && image ? (
              <img src={image} alt="" width="100%" className="mb-4" />
            ) : null}
            <h2 className="text-4xl dark:text-white font-semibold mb-4 pb-2">
              {parentNode.title}
            </h2>
            <ViewContent source={parentNode.content} isDark={isDark} />
            {childNodes &&
              childNodes.map((childNode) => {
                const nodeImage = createImageUrl({
                  docType: "book",
                  baseUrl: base_url,
                  nodeId: doc_id,
                  image: extractImage(childNode.images),
                  size: 720,
                })
                return (
                  <div key={childNode.uid}>
                    <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
                      {childNode.title}
                    </h2>
                    {nodeImage && nodeImage ? (
                      <img src={nodeImage} alt="" width="100%" />
                    ) : null}
                    <ViewContent source={childNode.content} isDark={isDark} />
                  </div>
                )
              })}
          </div>
          <div className="pb-16" />
        </div>
      </main>

      <div className="fixed bottom-0 right-16 mb-4 mx-auto">
        <RightNavEdit
          doc_id={doc_id}
          authContext={authContext}
          mainNode={mainNode}
          docType="book"
        />
      </div>
    </div>
  )
}

export default View
