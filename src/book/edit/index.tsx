import { useContext } from "react"
import { useEditBookNodes } from "loony-utils"
import BookImage from "../Image.tsx"
import { useNavigate, useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import ViewContent from "../../components/ViewContent.tsx"
import {
  AppRouteProps,
  EditBookState,
  PageStatus,
  DocNode,
  EditBookAction,
} from "loony-types"
import EditComponent from "./edit.tsx"
import { Plus, Pencil, Trash2 } from "lucide-react"
import DeleteModal from "../../components/Modal.tsx"
import { AppContext } from "../../context/AppContext.tsx"
import {
  onCancel,
  onConfirmDelete,
  showModalToConfirmDeleteDoc,
} from "./utils.ts"
import { LeftNav } from "./LeftNav.tsx"
import { RightNavView } from "../../components/RightNav.tsx"
import { ButtonIcon } from "loony-ui"
import { useGetBookNav } from "loony-api"


export default function Edit(props: AppRouteProps) {
  const { isMobile, appContext, authContext, mobileNavOpen, setMobileNavOpen } =
    props
  //
  const navigate = useNavigate()
  const { bookId } = useParams()
  const { setAppContext } = useContext(AppContext)
  //
  const { isDark, device, env: { base_url } } = appContext
  const doc_id = bookId && parseInt(bookId)
  const { data: book_data } = useGetBookNav(doc_id)
  const { state, setState, pageStatus } = useEditBookNodes(
    book_data,
    doc_id as number,
  )
  //
  const { parentNode, childNodes, mainNode } = state
  //
  if (pageStatus.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  if (!parentNode || !mainNode || !doc_id) return null

  return (
    <div className="min-h-screen">
      <LeftNav doc_id={doc_id} setState={setState} state={state} {...props} />
      <main className="min-h-screen flex-1 ml-64 bg-[#0d0d0d] pt-14">
        {/* Markdown Body */}
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
            <div className="max-w-2xl mx-auto px-4 pt-8 pb-24">
              <BookImage docId={doc_id} node={parentNode} base_url={base_url} />
              <h2 className="text-3xl font-bold text-[#ececec] mb-8 pb-2">
                {parentNode.title}
              </h2>
              <ViewContent source={parentNode.content} isDark={isDark} />
              <NodeSettings
                state={state}
                setState={setState}
                node={parentNode}
              />
              {childNodes &&
                childNodes.map((childNode) => {
                  return (
                    <div key={childNode.uid}>
                      <BookImage docId={doc_id} node={childNode} base_url={base_url} />
                      <h2 className="text-4xl font-semibold border-b border-white/[0.08] mb-8 pb-2">
                        {childNode.title}
                      </h2>
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
            <div className="max-w-2xl mx-auto px-4 pt-8 pb-24">
              <EditComponent
                state={state}
                setState={setState}
                doc_id={doc_id}
                isMobile={isMobile}
              />
            </div>
          )}
        </div>
        {/* <div className="hidden md:block w-[18%] pt-4">
          <div className="border-l border-gray-300 dark:border-[#4d4d4d]">
            
          </div>
        </div> */}
      </main>
      <div className="fixed bottom-0 right-16 mb-4 mx-auto">
        <RightNavView
          doc_id={doc_id}
          authContext={authContext}
          mainNode={mainNode}
          docType="book"
          deleteDoc={(e: any) => {
            showModalToConfirmDeleteDoc(e, setState, mainNode.title)
          }}
          navigate={navigate}
        />
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
      <ButtonIcon
        onClick={(e: any) => {
          setState({
            ...state,
            topNode: node,
            form: {
              method: "create",
              nodeType: node.identity === 103 ? 103 : node.identity + 1,
            },
          })
          e.stopPropagation()
        }}
      >
        <Plus className="w-4 h-4" />
      </ButtonIcon>
      {/* Edit */}
      <ButtonIcon
        onClick={(e: any) => {
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
      </ButtonIcon>
      {/* Delete */}
      <ButtonIcon
        onClick={(e: any) => {
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
      </ButtonIcon>
    </div>
  )
}
