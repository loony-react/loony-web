/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "loony-api"
import {
  AppDispatchAction,
  DocNode,
  EditBlogAction,
  EditBlogState,
} from "loony-types"
import { deleteBlogNode, orderBlogChildNodes } from "loony-utils"
import { NavigateFunction } from "react-router"
import { STATE_VALUES } from "utils/const"

export const onCancel = ({ setState }: { setState: EditBlogAction }) => {
  setState((state) => ({
    ...state,
    modal: STATE_VALUES.modal,
    editNode: null,
    addNode: null,
  }))
}

export const showModalToConfirmDeleteDoc = (
  e: any,
  setState: any,
  title?: string,
) => {
  e.preventDefault()
  setState((prevState: any) => ({
    ...prevState,
    modal: {
      method: "delete",
      nodeType: 100,
      title: title || "",
    },
  }))
}

export const onConfirmDelete = (props: {
  state: EditBlogState
  setState: EditBlogAction
  doc_id: number
  navigate: NavigateFunction
  setAppContext: AppDispatchAction
}) => {
  if (props.state.modal.nodeType === 100) {
    deleteBlog(props)
  } else {
    deleteNode(props)
  }
}

const deleteBlog = ({
  navigate,
  doc_id,
  setAppContext,
}: {
  doc_id: number
  navigate: NavigateFunction
  setAppContext: AppDispatchAction
}) => {
  axiosInstance.post("/book/delete", { doc_id: doc_id }).then(() => {
    setAppContext((prevState: any) => ({
      ...prevState,
      alert: {
        status: "success",
        title: "Deleted Book",
        body: "Your book has been successfully deleted.",
      },
    }))
    navigate("/", { replace: true })
  })
}

const deleteNode = ({ state, childNodes, setState, mainNode }: any) => {
  if (!state.deleteNode) return
  const delete_node = state.deleteNode
  if (childNodes) {
    let updateNode: DocNode | undefined
    childNodes.forEach((r: any) => {
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
        const orderChildNodes = orderBlogChildNodes(nodesAfterDelete, mainNode)

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
