import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { createImageUrl, extractImage, getBlogNodes } from "loony-utils"
import {
  AppRouteProps,
  Auth,
  AuthContextProps,
  EditBlogState,
  PageStatus,
} from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { useCallback } from "react"
import {
  updateBlogNode,
  appendBlogNode,
  orderBlogChildNodes,
} from "loony-utils"
import AddNode from "../../form/addNode.tsx"
import EditNodeForm from "../../form/editNode.tsx"
import { AppendNodeResponse, EditBlogAction } from "loony-types"
import { DocNode } from "loony-types"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { RightNavView } from "components/RightNav.tsx"
import DeleteModal from "./modal.tsx"
import { STATE_VALUES } from "../../utils/const.ts"
import { AuthContext } from "context/AuthContext.tsx"

export default function Edit(props: AppRouteProps) {
  const { blogId } = useParams()
  const authContext = useContext<AuthContextProps>(AuthContext)

  const doc_id = blogId && parseInt(blogId)
  const base_url = props.appContext.env.base_url
  const { user } = authContext as Auth

  const [state, setState] = useState<EditBlogState>({
    mainNode: null,
    parentNode: null,
    addNode: null,
    editNode: null,
    nodeIndex: null,
    topNode: null,
    doc_id: doc_id as number,
    childNodes: [],
    form: {
      method: "",
      nodeType: 0,
    },
    modal: {
      method: "",
      nodeType: 0,
    },
    deleteNode: null,
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
  const { mainNode, childNodes } = state

  if (!mainNode || !user) return null

  const image = createImageUrl({
    docType: "blog",
    baseUrl: base_url,
    nodeId: mainNode.uid,
    image: extractImage(mainNode.images),
    size: 720,
  })

  if (status.status !== PageStatus.VIEW_PAGE) return <PageLoadingContainer />

  return (
    <div className="w-[70%] mx-auto mt-10 flex">
      {state.modal.method === "delete" && (
        <DeleteModal
          state={state}
          doc_id={doc_id as number}
          setState={setState}
        />
      )}
      <div className="w-[20%]" />
      <div className="w-[60%] mb-50">
        {!state.form.method && (
          <div className="w-[90%] mx-[5%]">
            {image && (
              <img
                src={image}
                alt="Video Thumbnail"
                className="w-full h-full object-cover mb-4"
              />
            )}
            <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
              {mainNode.title}
            </h2>
            <ViewContent source={mainNode.content} />
            <NodeSettings
              state={state}
              setState={setState}
              node={mainNode}
              nodeIndex={null}
            />

            {childNodes.map((node, id) => {
              return (
                <div key={id}>
                  <h2 className="text-2xl font-semibold my-4 border-b border-gray-300">
                    {node.title}
                  </h2>
                  <ViewContent source={node.content} />
                  <NodeSettings
                    state={state}
                    setState={setState}
                    node={node}
                    nodeIndex={id}
                  />
                </div>
              )
            })}
          </div>
        )}
        {state.form.method && (
          <div className="w-[90%] mx-[5%]">
            <EditComponent
              state={state}
              setState={setState}
              doc_id={doc_id as number}
              isMobile={false}
            />
          </div>
        )}
      </div>
      <div className="w-[20%]">
        <RightNavView
          authContext={props.authContext}
          doc_id={doc_id as number}
          mainNode={mainNode}
          docType="blog"
        />
      </div>
    </div>
  )
}

const EditComponent = ({
  state,
  setState,
  doc_id,
  isMobile,
}: {
  state: EditBlogState
  setState: EditBlogAction
  doc_id: number
  isMobile: boolean
}) => {
  const { childNodes, form, mainNode, addNode } = state

  const editFnCallback = useCallback(
    (data: DocNode) => {
      const nodesAfterUpdate = updateBlogNode(childNodes, data)
      const orderChildNodes = orderBlogChildNodes(nodesAfterUpdate, mainNode)
      const newChildNodes =
        orderChildNodes.length >= 2 ? orderChildNodes.slice(1) : []

      setState({
        ...state,
        childNodes: newChildNodes,
        form: STATE_VALUES.form,
      })
    },
    [setState, childNodes, mainNode, state],
  )

  const addNodeCbFn = (data: AppendNodeResponse) => {
    if (!addNode) return
    const nodesAfterAdd = appendBlogNode(childNodes, addNode, data, mainNode)
    const newChildNodes = orderBlogChildNodes(nodesAfterAdd, mainNode)

    setState({
      ...state,
      addNode: null,
      childNodes: newChildNodes,
      form: STATE_VALUES.form,
    })
  }

  const onCancel = useCallback(() => {
    setState({
      ...state,
      form: STATE_VALUES.form,
      editNode: null,
      addNode: null,
    })
  }, [setState, state])

  if (!mainNode) return null

  return (
    <>
      {form.method === "create" && state.addNode ? (
        <AddNode
          heading="Add Node"
          FnCallback={addNodeCbFn}
          url="/blog/append/node"
          isMobile={isMobile}
          docType="blog"
          doc_id={doc_id}
          parent_id={state.addNode.uid}
          identity={101}
          onCancel={onCancel}
          page_id={mainNode.uid as number}
          parent_identity={state.addNode.uid}
        />
      ) : null}

      {form.method === "update" && state.editNode ? (
        <EditNodeForm
          heading="Edit Node"
          state={state}
          docType="blog"
          doc_id={doc_id}
          FnCallback={editFnCallback}
          onCancel={onCancel}
          url="/blog/edit"
          isMobile={isMobile}
        />
      ) : null}
    </>
  )
}

const NodeSettings = ({
  setState,
  node,
  state,
  nodeIndex,
}: {
  setState: EditBlogAction
  node: DocNode
  state: EditBlogState
  nodeIndex: number | null
}) => {
  return (
    <div className="flex gap-1 mb-12">
      {/* Create */}
      <button
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition"
        title="Create"
        onClick={(e) => {
          e.stopPropagation()
          setState({
            ...state,
            addNode: node,
            form: {
              method: "create",
              nodeType: 101,
            },
          })
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
            editNode: node,
            form: {
              method: "update",
              nodeType: 101,
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
            nodeIndex,
            modal: {
              method: "delete",
              nodeType: 101,
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
