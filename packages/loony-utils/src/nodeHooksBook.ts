import { PageStatus, ReadBookState, EditBookState } from "loony-types"
import { useEffect, useState } from "react"
import { orderBookNodes } from "./nodeHelpers"

export const STATE_VALUES = {
  form: {
    method: "",
    nodeType: 0,
  },
  modal: {
    method: "",
    nodeType: 0,
    title: "",
  },
}

export const useEditBookNodes = (data: any, doc_id: number) => {
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

  const [pageStatus, setStatus] = useState({
    status: PageStatus.IDLE,
    error: "",
  })

  useEffect(() => {
    if (data) {
      const bookTree = orderBookNodes(data.child_nodes, data.main_node, [])
      const mainNode = bookTree && bookTree[0]
      mainNode.child = []
      const __navNodes = bookTree.slice(1)
      const groupNodesById = {}
      bookTree.forEach((node) => {
        groupNodesById[node.uid] = node
      })
      setState((prevState) => ({
        ...prevState,
        mainNode,
        frontPage: mainNode,
        parentNode: mainNode,
        navNodes: __navNodes,
        page_id: mainNode.uid,
        childNodes: [],
        groupNodesById,
      }))
      setStatus((prevStatus) => ({
        ...prevStatus,
        status: PageStatus.VIEW_PAGE,
      }))
    }
  }, [data])

  return { state, setState, pageStatus }
}

export const useBookNodes = (data: any) => {
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

  const [pageStatus, setStatus] = useState({
    status: PageStatus.IDLE,
    error: "",
  })

  useEffect(() => {
    if (data) {
      const bookTree = orderBookNodes(data.child_nodes, data.main_node, [])
      const mainNode = bookTree && bookTree[0]
      mainNode.child = []
      const __navNodes = bookTree.slice(1)
      const groupNodesById = {}
      bookTree.forEach((node) => {
        groupNodesById[node.uid] = node
      })
      setState((prevState) => ({
        ...prevState,
        mainNode,
        frontPage: mainNode,
        parentNode: mainNode,
        navNodes: __navNodes,
        page_id: mainNode.uid,
        childNodes: [],
        groupNodesById,
      }))
      setStatus((prevStatus) => ({
        ...prevStatus,
        status: PageStatus.VIEW_PAGE,
      }))
    }
  }, [data])

  return { state, setState, pageStatus }
}
