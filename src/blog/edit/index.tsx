import { useContext } from "react"
import { useNavigate, useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { useEditBlogNodes } from "loony-utils"
import Image from "../Image.tsx"
import { AppRouteProps, Auth, EditBlogState, PageStatus } from "loony-types"
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
import { RightNavView } from "../../components/RightNav.tsx"
import DeleteModal from "../../components/Modal.tsx"
import { STATE_VALUES } from "../../utils/const.ts"
import {
  showModalToConfirmDeleteDoc,
  onConfirmDelete,
  onCancel,
} from "./utils.ts"
import { AppContext } from "../../context/AppContext.tsx"
import { useGetBlogNodes } from "loony-api"
import { Container } from "loony-ui"

export default function Edit(props: AppRouteProps) {
  const { appContext, authContext } = props
  const { isDark } = appContext
  const { blogId } = useParams()
  const { setAppContext } = useContext(AppContext)

  const navigate = useNavigate()
  const doc_id = blogId && parseInt(blogId)
  const base_url = props.appContext.env.base_url
  const { user } = authContext as Auth

  const { data } = useGetBlogNodes(doc_id)
  const { state, setState, status } = useEditBlogNodes(data, doc_id as number)

  const { mainNode, childNodes } = state

  if (!mainNode || !user) return null

  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  return (
    <div>
      <div className="fixed bg-[#111111] border-r border-white/[0.08] w-64 h-screen mt-14" />
      <Container>
        {state.modal.method === "delete" && (
          <DeleteModal
            cancel={() => {
              onCancel({ setState })
            }}
            confirm={() => {
              onConfirmDelete({
                state,
                setState,
                setAppContext,
                navigate,
                doc_id: doc_id as number,
              })
            }}
            title={state.modal.title}
          />
        )}
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-24">
          {!state.form.method && (
            <>
              <Image mainNode={mainNode} node={mainNode} base_url={base_url} />
              <h2 className="text-3xl font-bold text-[#ececec] mb-8 pb-2">
                {mainNode.title}
              </h2>
              <ViewContent source={mainNode.content} isDark={isDark} />
              <NodeSettings
                state={state}
                setState={setState}
                node={mainNode}
                nodeIndex={null}
                onDeleteDoc={() => setState((s) => ({ ...s, modal: { method: "delete", nodeType: 100, title: mainNode.title } }))}
              />

              {childNodes.map((node, id) => {
                return (
                  <div key={id}>
                    <Image mainNode={mainNode} node={node} base_url={base_url} />
                    <h2 className="text-2xl font-semibold my-4 border-b border-white/[0.08] text-[#ececec]">
                      {node.title}
                    </h2>
                    <ViewContent source={node.content} isDark={isDark} />
                    <NodeSettings
                      state={state}
                      setState={setState}
                      node={node}
                      nodeIndex={id}
                    />
                  </div>
                )
              })}
            </>
          )}
          {state.form.method && (
            <EditComponent
              state={state}
              setState={setState}
              doc_id={doc_id as number}
              isMobile={false}
            />
          )}
        </div>
      </Container>
      <div className="fixed bottom-0 right-16 mb-4 mx-auto">
        <RightNavView
          authContext={props.authContext}
          doc_id={doc_id as number}
          mainNode={mainNode}
          docType="blog"
          deleteDoc={(e: any) => {
            showModalToConfirmDeleteDoc(e, setState, mainNode.title)
          }}
          navigate={navigate}
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
  onDeleteDoc,
}: {
  setState: EditBlogAction
  node: DocNode
  state: EditBlogState
  nodeIndex: number | null
  onDeleteDoc?: () => void
}) => {
  return (
    <div className="flex gap-1 mb-12">
      {/* Create */}
      <button
        className="p-1.5 rounded-md text-[#6b6b76] hover:bg-white/5 hover:text-[#9b9ba4] transition-colors duration-150"
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
        className="p-1.5 rounded-md text-[#6b6b76] hover:bg-white/5 hover:text-[#9b9ba4] transition-colors duration-150"
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
      {node.identity === 100 && onDeleteDoc && (
        <button
          className="p-1.5 rounded-md text-red-500/60 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-150"
          title="Delete blog"
          onClick={(e) => { e.stopPropagation(); onDeleteDoc() }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      {node.identity > 100 && (
        <button
          className="p-1.5 rounded-md text-[#6b6b76] hover:bg-white/5 hover:text-[#9b9ba4] transition-colors duration-150"
          title="Delete"
          onClick={(e) => {
            setState({
              ...state,
              deleteNode: node,
              nodeIndex,
              modal: {
                method: "delete",
                nodeType: 101,
                title: node.title,
              },
            })
            e.stopPropagation()
          }}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
