/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from "react"
import { deleteBlogNode, orderBlogChildNodes } from "loony-utils"
import { useNavigate } from "react-router"
import { axiosInstance } from "loony-api"
import { EditBlogState } from "loony-types"
import { DocNode } from "loony-types"
import { STATE_VALUES } from "../../utils/const"

export default function DeleteModal({
  state,
  doc_id,
  setState,
}: {
  state: EditBlogState
  doc_id: number
  setState: React.Dispatch<React.SetStateAction<EditBlogState>>
}) {
  const navigate = useNavigate()
  const { childNodes, modal } = state
  const { mainNode } = state

  const deleteBlog = useCallback(() => {
    axiosInstance.post("/blog/delete", { doc_id }).then(() => {
      navigate("/", { replace: true })
    })
  }, [navigate, doc_id])

  const onCancel = useCallback(() => {
    setState({
      ...state,
      modal: STATE_VALUES.modal,
      editNode: null,
      addNode: null,
    })
  }, [setState, state])

  if (!mainNode || !mainNode) return null

  const onDeleteNode = () => {
    if (!state.deleteNode) return
    const delete_node = state.deleteNode
    if (childNodes) {
      let updateNode: DocNode | undefined
      childNodes.forEach((r) => {
        if (r.parent_id === delete_node.uid) {
          updateNode = r
        }
      })

      const submitData = {
        delete_node: {
          identity: delete_node.identity,
          uid: delete_node.uid,
        },
        update_node: updateNode
          ? {
              parent_id: delete_node.parent_id,
              uid: updateNode ? updateNode.uid : null,
            }
          : null,
      }

      axiosInstance
        .post(`/blog/delete/node`, submitData)
        .then(() => {
          const nodesAfterDelete = deleteBlogNode(childNodes, submitData)
          const orderChildNodes = orderBlogChildNodes(
            nodesAfterDelete,
            mainNode,
          )

          setState({
            ...state,
            childNodes: orderChildNodes,
            form: STATE_VALUES.form,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // return (
  //   <>
  //     {modal === "delete_node" && state.deleteNode ? (
  //       <ConfirmAction
  //         confirmTitle="Are you sure you want to delete Node?"
  //         confirmAction={onDeleteNode}
  //         title="Delete Node"
  //         onCancel={onCancel}
  //       />
  //     ) : null}
  //     {modal === "delete_blog" ? (
  //       <ConfirmAction
  //         confirmTitle="Are you sure you want to delete Blog?"
  //         confirmAction={deleteBlog}
  //         title="Delete Blog"
  //         onCancel={onCancel}
  //       />
  //     ) : null}
  //   </>
  // )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteNode}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
