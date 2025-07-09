/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react"
import { createImageUrl, extractImage, getNav } from "loony-utils"
import { useNavigate, useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import ViewContent from "../../components/ViewContent.tsx"
import {
  AppRouteProps,
  EditBookState,
  PageStatus,
  PageState,
  DocNode,
  EditBookAction,
} from "loony-types"
import EditComponent from "./edit.tsx"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { STATE_VALUES } from "../../utils/const.ts"
import DeleteModal from "../../components/Modal.tsx"
import { AppContext } from "context/AppContext.tsx"
import {
  onCancel,
  onConfirmDelete,
  showModalToConfirmDeleteDoc,
} from "./utils.ts"
import { LeftNav } from "./LeftNav.tsx"
import { RightNavView } from "components/RightNav.tsx"

export default function Edit(props: AppRouteProps) {
  const { isMobile, appContext, authContext } = props
  const { isDark } = appContext
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
    form: STATE_VALUES.form,
    modal: STATE_VALUES.modal,
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
      form: STATE_VALUES.form,
    })
  }
  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  const { parentNode, childNodes, mainNode } = state
  if (!parentNode || !mainNode || !doc_id) return null
  const image = createImageUrl({
    docType: "book",
    baseUrl: base_url,
    nodeId: doc_id,
    image: extractImage(parentNode.images),
    size: 720,
  })

  return (
    <div className="w-[70%] mx-auto flex">
      {/* Left Navbar */}
      <div className="w-[20%]">
        <LeftNav
          doc_id={doc_id}
          setState={setState}
          state={state}
          viewFrontPage={viewFrontPage}
          {...props}
        />
      </div>

      {/* Markdown Body */}
      <div className="w-[60%] mx-[5%] pt-4">
        {state.modal.method === "delete" && (
          <DeleteModal
            cancel={() => {
              onCancel({ setState })
            }}
            confirm={() =>
              onConfirmDelete({
                state,
                setState,
                navigate,
                doc_id: doc_id,
                setAppContext,
              })
            }
            title={state.modal.title}
          />
        )}
        {!state.form.method && (
          <div className="w-[90%]">
            {parentNode && image ? (
              <img src={image} alt="" width="100%" className="mb-4" />
            ) : null}
            <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
              {parentNode.title}
            </h2>
            <ViewContent source={parentNode.content} isDark={isDark} />
            <NodeSettings state={state} setState={setState} node={parentNode} />
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
                    <NodeSettings
                      state={state}
                      setState={setState}
                      node={childNode}
                    />
                  </div>
                )
              })}
          </div>
        )}
        {state.form.method && (
          <EditComponent
            state={state}
            setState={setState}
            doc_id={doc_id}
            isMobile={isMobile}
          />
        )}
      </div>
      <div className="w-[18%] mt-4">
        <div className="border-l border-gray-300">
          <RightNavView
            doc_id={doc_id}
            authContext={authContext}
            mainNode={mainNode}
            docType="book"
            deleteDoc={(e: any) => {
              showModalToConfirmDeleteDoc(e, setState, mainNode.title)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const NodeSettings = ({
  setState,
  node,
  state,
}: {
  setState: EditBookAction
  node: DocNode
  state: EditBookState
}) => {
  return (
    <div className="flex gap-1 mb-8">
      {/* Create */}
      <button
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition"
        title="Create"
        onClick={(e) => {
          setState({
            ...state,
            topNode: node,
            form: {
              method: "create",
              nodeType: node.identity + 1,
            },
          })
          e.stopPropagation()
        }}
      >
        <Plus className="w-4 h-4" />
      </button>

      {/* Edit */}
      <button
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition"
        title="Edit"
        onClick={(e) => {
          setState({
            ...state,
            topNode: node,
            editNode: node,
            form: {
              method: "update",
              nodeType: node.identity,
            },
          })
          e.stopPropagation()
        }}
      >
        <Pencil className="w-4 h-4" />
      </button>

      {/* Delete */}
      <button
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition"
        title="Delete"
        onClick={(e) => {
          setState({
            ...state,
            deleteNode: node,
            modal: {
              method: "delete",
              nodeType: node.identity,
              title: node.title,
            },
          })
          e.stopPropagation()
        }}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
