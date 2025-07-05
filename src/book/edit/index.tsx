import { useState, useEffect } from "react"
import { extractImage, getNav } from "loony-utils"
import { useParams } from "react-router"
import Nav from "../../nav/book/edit/index.tsx"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import ViewContent from "../../components/ViewContent.tsx"
import {
  AppRouteProps,
  EditBookState,
  PageStatus,
  PageState,
} from "loony-types"
import { RightNavView } from "nav/RightNavView.tsx"

export default function Edit(props: AppRouteProps) {
  const { isMobile, appContext, authContext } = props
  const { base_url } = appContext.env
  const { bookId } = useParams()
  const doc_id = bookId && parseInt(bookId)
  // const navigate = useNavigate()
  // const { setAppContext } = useContext(AppContext)
  const [status, setStatus] = useState<PageState>({
    status: PageStatus.IDLE,
    error: "",
  })
  const [state, setState] = useState<EditBookState>({
    mainNode: null,
    childNodes: [],
    form: "",
    modal: "",
    parentNode: null,
    topNode: null,
    page_id: null,
    section_id: null,
    groupNodesById: {},
    navNodes: [],
    frontPage: null,
    addNode: null,
    deleteNode: null,
    editNode: null,
    doc_id: doc_id as number,
  })

  useEffect(() => {
    if (doc_id) {
      getNav(doc_id, setState, setStatus)
    }
  }, [doc_id])

  const viewFrontPage = () => {
    setState({
      ...state,
      page_id: state?.frontPage?.uid || null,
      parentNode: state?.frontPage,
      editNode: null,
      addNode: null,
      form: "",
    })
  }

  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer isMobile={isMobile} />

  const { parentNode, childNodes, mainNode } = state
  if (!parentNode || !mainNode) return null

  return (
    <div className="w-[70%] mx-auto mt-5 flex">
      {/* Left Navbar */}
      <div className="w-[20%] p-4">
        <Nav
          doc_id={doc_id as number}
          setState={setState}
          state={state}
          viewFrontPage={viewFrontPage}
          {...props}
        />
      </div>

      {/* Markdown Body */}
      <div className="w-[60%]">
        <div className="w-[90%]">
          <div>{parentNode.title}</div>
          <ViewContent source={parentNode.content} />
          {childNodes &&
            childNodes.map((childNode) => {
              const nodeImage = extractImage(childNode.images)
              return (
                <div className="page-section" key={childNode.uid}>
                  <div className="section-title">{childNode.title}</div>
                  {nodeImage && nodeImage.name ? (
                    <div style={{ width: "100%", borderRadius: 5 }}>
                      <img
                        src={`${base_url}/book/${doc_id}/720/${nodeImage.name}`}
                        alt=""
                        width="100%"
                      />
                    </div>
                  ) : null}
                  <ViewContent source={childNode.content} />
                </div>
              )
            })}
        </div>
      </div>
      <div className="w-[20%]">
        <RightNavView
          doc_id={doc_id as number}
          authContext={authContext}
          mainNode={mainNode}
          docType="book"
        />
      </div>
    </div>
  )
}
