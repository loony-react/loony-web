import { useState, useEffect, useContext, Suspense } from "react"

import { extractImage, getNav } from "loony-utils"
import { useParams, useNavigate } from "react-router"
import EditComponent from "./edit.tsx"
import Nav from "../../nav/book/edit/index.tsx"
import { PageNodeSettings } from "./pageNodeSettings.tsx"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import AppContext from "../../context/AppContext.tsx"
import ViewContent from "../../components/ViewContent.tsx"
import Modal from "./modal.tsx"

import {
  AppRouteProps,
  DocNode,
  EditBookAction,
  EditBookState,
  PageStatus,
  PageState,
} from "loony-types"
import NodeInfo from "../../components/NodeInfo.tsx"
import {
  DocsBodyContainer,
  DocsContentContainer,
  DocsNavContainer,
  DocsSettingsContainer,
} from "../../components/Containers.tsx"
import RightNavEdit from "nav/RightNavEdit.tsx"

export default function Edit(props: AppRouteProps) {
  const { isMobile, appContext } = props
  const { base_url } = appContext.env
  const { bookId } = useParams()
  const doc_id = bookId && parseInt(bookId)
  const navigate = useNavigate()
  const { setAppContext } = useContext(AppContext)
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
    <DocsBodyContainer>
      <DocsNavContainer>
        <Nav
          doc_id={doc_id as number}
          setState={setState}
          state={state}
          viewFrontPage={viewFrontPage}
          {...props}
        />
      </DocsNavContainer>

      {state.modal && (
        <Modal
          state={state as EditBookState}
          setState={setState as EditBookAction}
          setAppContext={setAppContext}
          doc_id={doc_id as number}
          navigate={navigate}
          isMobile={isMobile}
        />
      )}
      {state.form && (
        <DocsContentContainer>
          <EditComponent
            state={state as EditBookState}
            setState={setState as EditBookAction}
            setAppContext={setAppContext}
            doc_id={doc_id as number}
            navigate={navigate}
            isMobile={isMobile}
          />
        </DocsContentContainer>
      )}
      {!state.form && (
        <DocsContentContainer>
          <ParentNode
            parentNode={parentNode}
            doc_id={doc_id as number}
            base_url={base_url}
            setState={setState}
            state={state}
          />

          <div
            style={{
              marginTop: 16,
            }}
          >
            {childNodes.map((subSectionNode) => {
              const subSectionNodeImage = extractImage(subSectionNode.images)

              return (
                <div className="page-section" key={subSectionNode.uid}>
                  <div className="section-title">{subSectionNode.title}</div>
                  {subSectionNodeImage && subSectionNodeImage.name ? (
                    <div style={{ width: "100%", borderRadius: 5 }}>
                      <img
                        src={`${base_url}/book/${doc_id}/720/${subSectionNodeImage.name}`}
                        alt=""
                        width="100%"
                      />
                    </div>
                  ) : null}
                  <Suspense fallback={<div>Loading component...</div>}>
                    <ViewContent source={subSectionNode.content} />
                  </Suspense>
                  <PageNodeSettings
                    node={subSectionNode}
                    setState={setState}
                    state={state}
                  />
                </div>
              )
            })}
          </div>
        </DocsContentContainer>
      )}
      {!isMobile ? (
        <DocsSettingsContainer>
          <RightNavEdit
            doc_id={doc_id as number}
            onDeleteDoc={() => {
              setState({
                ...state,
                modal: "delete_book",
              })
            }}
            docType="book"
          />
        </DocsSettingsContainer>
      ) : null}
    </DocsBodyContainer>
  )
}

const ParentNode = ({
  parentNode,
  doc_id,
  base_url,
  setState,
  state,
}: {
  parentNode: DocNode
  doc_id: number
  base_url: string
  setState: EditBookAction
  state: EditBookState
}) => {
  const image = extractImage(parentNode.images)
  return (
    <>
      <div>
        <div className="page-heading">{parentNode.title}</div>
        {image && image.name ? (
          <div style={{ width: "100%", borderRadius: 5 }}>
            <img
              src={`${base_url}/book/${doc_id}/720/${image.name}`}
              alt=""
              width="100%"
            />
          </div>
        ) : null}

        {parentNode.identity === 100 ? <NodeInfo node={parentNode} /> : null}
        <div style={{ marginTop: 16 }}>
          <Suspense fallback={<div>Loading component...</div>}>
            {parentNode.content && <ViewContent source={parentNode.content} />}
          </Suspense>
        </div>
      </div>
      <PageNodeSettings node={parentNode} setState={setState} state={state} />
    </>
  )
}
