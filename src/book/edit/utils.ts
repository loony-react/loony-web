/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteOne, deleteSubSection, deleteSection } from "loony-utils"
import { axiosInstance } from "loony-api"
import { STATE_VALUES } from "utils/const.ts"
import {
  AppDispatchAction,
  DocNode,
  EditBookAction,
  EditBookState,
} from "loony-types"
import { NavigateFunction } from "react-router"

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
  state: EditBookState
  setState: EditBookAction
  doc_id: number
  navigate: NavigateFunction
  setAppContext: AppDispatchAction
}) => {
  if (props.state.modal.nodeType === 100) {
    deleteBook(props)
  } else {
    deleteNode(props)
  }
}

const deleteBook = ({
  navigate,
  doc_id,
  setAppContext,
}: {
  doc_id: number
  navigate: NavigateFunction
  setAppContext: AppDispatchAction
}) => {
  axiosInstance.post("/book/delete", { doc_id: doc_id }).then(() => {
    setAppContext((prevState) => ({
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

export const onCancel = ({ setState }: { setState: EditBookAction }) => {
  setState((state) => ({
    ...state,
    modal: STATE_VALUES.modal,
    editNode: null,
    addNode: null,
  }))
}

const deleteNode = ({
  state,
  setState,
}: {
  state: EditBookState
  setState: EditBookAction
}) => {
  const {
    deleteNode,
    navNodes,
    groupNodesById,
    childNodes,
    parentNode,
    frontPage,
  } = state
  if (!deleteNode || !parentNode || !frontPage) return
  const submitData = {
    identity: deleteNode.identity,
    parent_id: deleteNode.parent_id,
    delete_id: deleteNode.uid,
  }
  axiosInstance
    .post(`/book/delete/node`, submitData)
    .then((res) => {
      if (deleteNode.identity === 101) {
        const __navNodes = deleteOne(navNodes, res.data)
        setState({
          ...state,
          parentNode: groupNodesById[frontPage.uid],
          childNodes: groupNodesById[frontPage.uid].child as DocNode[],
          navNodes: __navNodes,
          deleteNode: null,
          form: STATE_VALUES.form,
          modal: STATE_VALUES.modal,
        })
      }
      if (deleteNode.identity === 102) {
        const newNavNodes: DocNode[] = deleteSection(navNodes, res.data)
        delete groupNodesById[deleteNode.uid]
        setState({
          ...state,
          navNodes: newNavNodes,
          parentNode: groupNodesById[frontPage.uid],
          childNodes: groupNodesById[frontPage.uid].child as DocNode[],
          deleteNode: null,
          form: STATE_VALUES.form,
          modal: STATE_VALUES.modal,
        })
      }
      if (deleteNode.identity === 103) {
        const child = deleteSubSection(childNodes, res.data)
        setState({
          ...state,
          groupNodesById: {
            ...groupNodesById,
            [parentNode?.uid as number]: {
              ...parentNode,
              child: child,
            },
          },
          childNodes: child,
          deleteNode: null,
          form: STATE_VALUES.form,
          modal: STATE_VALUES.modal,
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
