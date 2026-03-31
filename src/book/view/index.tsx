import { createImageUrl, extractImage, useBookNodes } from "loony-utils"
import { useGetBookNav } from "loony-api"
import { useNavigate, useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { AppRouteProps, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "../../components/RightNav.tsx"
import { PageNavigation } from "./PageNavigation.tsx"

const View = (props: AppRouteProps) => {
  const {
    appContext: {
      isDark,
      device,
      env: { base_url },
    },
    authContext,
    mobileNavOpen,
    setMobileNavOpen,
  } = props

  const navigate = useNavigate()
  const { bookId } = useParams()
  const docId = bookId ? Number(bookId) : null

  const { data: bookData } = useGetBookNav(docId)
  const { state, setState, pageStatus } = useBookNodes(bookData)

  const { parentNode, navNodes, frontPage, childNodes, mainNode } = state

  // Early returns for clarity and performance
  if (pageStatus.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  if (!parentNode || !mainNode || !frontPage || !docId) return null

  const viewFrontPage = () =>
    setState((prev) => ({
      ...prev,
      page_id: prev.frontPage?.uid ?? null,
      parentNode: prev.frontPage,
      childNodes: [],
    }))

  const image = createImageUrl({
    docType: "book",
    baseUrl: base_url,
    nodeId: docId,
    image: extractImage(parentNode.images),
    size: 720,
  })

  return (
    <div className="min-h-screen">
      <PageNavigation
        doc_id={docId}
        setState={setState}
        state={state}
        viewFrontPage={viewFrontPage}
        navNodes={navNodes}
        {...props}
      />
      <main className="flex-1 min-h-screen ml-64 bg-stone-50 dark:bg-[#212121] pt-16">
        <div
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
                  nodeId: docId,
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
          doc_id={docId}
          authContext={authContext}
          mainNode={mainNode}
          docType="book"
          navigate={navigate}
        />
      </div>
    </div>
  )
}

export default View
