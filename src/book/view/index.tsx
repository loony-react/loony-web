import { useState, useEffect } from "react"
import { extractImage, getNav } from "loony-utils"
import { useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { AppRouteProps, DocNode, ReadBookState, PageStatus } from "loony-types"
import NodeInfo from "../../components/NodeInfo.tsx"
import Nav from "../../nav/book/view/index.tsx"
import ViewContent from "../../components/ViewContent.tsx"
import {
  DocsBodyContainer,
  DocsContentContainer,
  DocsNavContainer,
  DocsSettingsContainer,
} from "../../components/Containers.tsx"
import RightNavView from "nav/RightNavView.tsx"

const View = (props: AppRouteProps) => {
  const { isMobile, appContext, authContext } = props
  const isDesktop = !isMobile
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
    return <PageLoadingContainer isMobile={isMobile} />

  if (!parentNode || !mainNode || !frontPage) return null

  return (
    <DocsBodyContainer>
      <DocsNavContainer>
        <Nav
          doc_id={doc_id as number}
          setState={setState}
          state={state}
          viewFrontPage={viewFrontPage}
          navNodes={navNodes}
          {...props}
        />
      </DocsNavContainer>
      <DocsContentContainer>
        <ParentNode
          parentNode={parentNode}
          doc_id={doc_id as number}
          base_url={base_url}
        />
        {childNodes.map((childNode) => {
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
        <div style={{ height: 50 }} />
      </DocsContentContainer>

      {/*
       * @Page End
       */}
      {isDesktop ? (
        <DocsSettingsContainer>
          <RightNavView
            doc_id={doc_id as number}
            authContext={authContext}
            mainNode={mainNode}
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
}: {
  parentNode: DocNode
  doc_id: number
  base_url: string
}) => {
  const image = extractImage(parentNode.images)
  return (
    <div
      style={{
        marginBottom: 24,
      }}
    >
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

      {parentNode.content && (
        <div style={{ marginTop: 16 }}>
          <ViewContent source={parentNode.content} />
        </div>
      )}
    </div>
  )
}

export default View
