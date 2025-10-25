import { useContext } from "react"
import { createImageUrl, extractImage, useEditBookNodes } from "loony-utils"
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
import { AppContext } from "context/AppContext.tsx"
import {
  onCancel,
  onConfirmDelete,
  showModalToConfirmDeleteDoc,
} from "./utils.ts"
import { LeftNav } from "./LeftNav.tsx"
import { RightNavView } from "components/RightNav.tsx"
import { ButtonIcon } from "loony-ui"
import { useGetBookNav } from "loony-api"
import { Image } from "./Image.tsx"

export default function Edit(props: AppRouteProps) {
  const { isMobile, appContext, authContext, mobileNavOpen, setMobileNavOpen } =
    props
  //
  const navigate = useNavigate()
  const { bookId } = useParams()
  const { setAppContext } = useContext(AppContext)
  //
  const { isDark, device } = appContext
  const { base_url } = appContext.env
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

  const baseImageUrl = `${base_url}/book/${doc_id}`
  const image = createImageUrl({
    docType: "book",
    baseUrl: base_url,
    nodeId: doc_id,
    image: extractImage(parentNode.images),
    size: 720,
  })

  return (
    <div>
      <LeftNav doc_id={doc_id} setState={setState} state={state} {...props} />
      <main className="flex-1 h-screen ml-64 bg-stone-50 dark:bg-[#212121] pt-16">
        {/* Markdown Body */}
        <div
          className="bg-gray-50"
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
            <div className="w-[45%] mx-auto pt-4">
              {parentNode && image ? (
                <img src={image} alt="" width="100%" className="mb-4" />
              ) : null}
              <h2 className="text-4xl font-semibold dark:text-white mb-8 pb-2">
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
                      <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
                        {childNode.title}
                      </h2>
                      <Image
                        baseUrl={baseImageUrl}
                        images={childNode.images}
                        size={720}
                      />
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
            <div className="w-[45%] mx-auto pt-4">
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
