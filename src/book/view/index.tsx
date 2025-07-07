import { useState, useEffect } from "react"
import { createImageUrl, extractImage, getNav } from "loony-utils"
import { useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { AppRouteProps, ReadBookState, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "components/RightNav.tsx"
import { LeftNav } from "./pageNavigation.tsx"

const View = (props: AppRouteProps) => {
  const { appContext, authContext, mobileNavOpen } = props
  const { base_url } = appContext.env
  const { bookId } = useParams()
  const doc_id = bookId && parseInt(bookId)
  const [pageStatus, setStatus] = useState({
    status: PageStatus.IDLE,
    error: "",
  })

  const [state, setState] = useState<ReadBookState>({
    mainNode: null,
    parentNode: null,
    page_id: null,
    section_id: null,
    groupNodesById: {},
    navNodes: [],
    childNodes: [],
    frontPage: null,
  })

  useEffect(() => {
    if (doc_id) {
      getNav(doc_id, setState, setStatus)
    }
  }, [doc_id])

  const viewFrontPage = () => {
    setState({
      ...state,
      page_id: state.frontPage?.uid || null,
      parentNode: frontPage,
      childNodes: [],
    })
  }

  const { parentNode, navNodes, frontPage, childNodes, mainNode } = state

  if (pageStatus.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  if (!parentNode || !mainNode || !frontPage || !doc_id) return null

  const image = createImageUrl({
    docType: "book",
    baseUrl: base_url,
    nodeId: doc_id,
    image: extractImage(parentNode.images),
    size: 720,
  })

  return (
    <div className="sm:w-[90%] md:w-[70%] mx-auto mt-4 flex">
      {/* Left Navbar */}
      <div className={`${mobileNavOpen ? "" : "hidden"} md:block md:w-[20%]`}>
        <LeftNav
          doc_id={doc_id}
          setState={setState}
          state={state}
          viewFrontPage={viewFrontPage}
          navNodes={navNodes}
          {...props}
        />
      </div>

      {/* Markdown Body */}
      <div className="md-w-[60%]">
        <div className="w-[90%] mx-[5%] pt-4">
          {parentNode && image ? (
            <img src={image} alt="" width="100%" className="mb-4" />
          ) : null}
          <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
            {parentNode.title}
          </h2>
          <ViewContent source={parentNode.content} />
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
                  <ViewContent source={childNode.content} />
                </div>
              )
            })}
        </div>
      </div>
      <div className="hidden md:block w-[18%] pt-4">
        <div className="border-l border-gray-300">
          <RightNavEdit
            doc_id={doc_id}
            authContext={authContext}
            mainNode={mainNode}
            docType="book"
          />
        </div>
      </div>
    </div>
  )
}

export default View
