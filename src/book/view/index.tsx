import { useState, useEffect } from "react"
import { extractImage, getNav } from "loony-utils"
import { useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { AppRouteProps, ReadBookState, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "components/RightNav.tsx"
import { LeftNav } from "./pageNavigation.tsx"

const View = (props: AppRouteProps) => {
  const { appContext, authContext } = props
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
    return <PageLoadingContainer />

  if (!parentNode || !mainNode || !frontPage) return null

  return (
    <div className="w-[70%] mx-auto mt-5 flex">
      {/* Left Navbar */}
      <div className="w-[20%] p-4">
        <LeftNav
          doc_id={doc_id as number}
          setState={setState}
          state={state}
          viewFrontPage={viewFrontPage}
          navNodes={navNodes}
          {...props}
        />
      </div>

      {/* Markdown Body */}
      <div className="w-[60%]">
        <div className="w-[90%] mx-5">
          <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
            {parentNode.title}
          </h2>
          <ViewContent source={parentNode.content} />
          {childNodes &&
            childNodes.map((childNode) => {
              const nodeImage = extractImage(childNode.images)
              return (
                <div key={childNode.uid}>
                  <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
                    {childNode.title}
                  </h2>
                  {nodeImage && nodeImage.name ? (
                    <img
                      src={`${base_url}/book/${doc_id}/720/${nodeImage.name}`}
                      alt=""
                      width="100%"
                    />
                  ) : null}
                  <ViewContent source={childNode.content} />
                </div>
              )
            })}
        </div>
      </div>
      <div className="w-[20%]">
        <RightNavEdit
          doc_id={doc_id as number}
          authContext={authContext}
          mainNode={mainNode}
          docType="book"
        />
      </div>
    </div>
  )
}

export default View
