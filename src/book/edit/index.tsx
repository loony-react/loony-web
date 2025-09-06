/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ButtonIcon } from "loony-ui"
import { useGetBookNav } from "loony-api"

export default function Edit(props: AppRouteProps) {
  const { isMobile, appContext, authContext, mobileNavOpen, setMobileNavOpen } =
    props
  const { isDark, device } = appContext
  const { base_url } = appContext.env
  const { bookId } = useParams()
  const doc_id = bookId && parseInt(bookId)
  const navigate = useNavigate()
  const { setAppContext } = useContext(AppContext)
  const { data: book_data } = useGetBookNav(doc_id)
  const { state, setState, pageStatus } = useEditBookNodes(
    book_data,
    doc_id as number,
  )

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
  if (pageStatus.status !== PageStatus.VIEW_PAGE)
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
    <div className="h-full sm:w-[90%] md:w-[70%] mx-auto flex">
      {/* Left Navbar */}
      <div
        className={`${mobileNavOpen ? "absolute top-0 left-0 z-10 w-[80%] bg-[#2d2d2d]" : "hidden"} h-full md:block md:w-[20%]`}
      >
        <LeftNav
          doc_id={doc_id}
          setState={setState}
          state={state}
          viewFrontPage={viewFrontPage}
          {...props}
        />
      </div>

      {/* Markdown Body */}
      <div
        className="h-full md:block md:w-[60%]"
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
          <div className="w-[90%] mx-[5%] pt-4">
            {parentNode && image ? (
              <img src={image} alt="" width="100%" className="mb-4" />
            ) : null}
            <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
              {parentNode.title}
            </h2>
            <ViewContent source={parentNode.content} isDark={isDark} />
            <NodeSettings
              state={state}
              setState={setState}
              node={parentNode}
              parentNode={null}
            />
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
                      parentNode={parentNode}
                    />
                  </div>
                )
              })}
          </div>
        )}
        {state.form.method && (
          <div className="w-[90%] mx-[5%] pt-4">
            <EditComponent
              state={state}
              setState={setState}
              doc_id={doc_id}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
      <div className="hidden md:block w-[18%] pt-4">
        <div className="border-l border-gray-300 dark:border-[#4d4d4d]">
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
  parentNode,
}: {
  setState: EditBookAction
  node: DocNode
  state: EditBookState
  parentNode: DocNode | null
}) => {
  return (
    <div className="flex gap-1 mb-8">
      {/* Create */}
      <ButtonIcon
        onClick={(e: any) => {
          setState({
            ...state,
            topNode: node,
            // parentNode,
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
