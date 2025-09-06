import { useEffect, useState } from "react"
import { orderBlogNodes } from "./nodeHelpers"
import { EditBlogState, PageStatus, ReadBlogState } from "loony-types"

export const useBlogNodes = (data: any, doc_id: number) => {
  const [state, setState] = useState<ReadBlogState>({
    mainNode: null,
    childNodes: [],
    topNode: null,
    doc_id: doc_id as number,
  })
  const [status, setStatus] = useState({
    status: PageStatus.IDLE,
    error: "",
  })
  useEffect(() => {
    if (data) {
      const unOrderedChildNodes = data.child_nodes
      const blogNodes = orderBlogNodes(unOrderedChildNodes, data.main_node)
      const mainNode = blogNodes && blogNodes[0]
      const childNodes = blogNodes.length >= 2 ? blogNodes.slice(1) : []

      setState((prevState) => ({
        ...prevState,
        mainNode,
        childNodes,
        blogNodes,
      }))
      setStatus((prevState) => ({
        ...prevState,
        status: PageStatus.VIEW_PAGE,
      }))
    }
  }, [data])

  return { state, status }
}

export const useEditBlogNodes = (data: any, doc_id: number) => {
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
      title: "",
    },
    deleteNode: null,
  })
  const [status, setStatus] = useState({
    status: PageStatus.IDLE,
    error: "",
  })
  useEffect(() => {
    if (data) {
      const unOrderedChildNodes = data.child_nodes
      const blogNodes = orderBlogNodes(unOrderedChildNodes, data.main_node)
      const mainNode = blogNodes && blogNodes[0]
      const childNodes = blogNodes.length >= 2 ? blogNodes.slice(1) : []

      setState((prevState) => ({
        ...prevState,
        mainNode,
        childNodes,
        blogNodes,
      }))
      setStatus((prevState) => ({
        ...prevState,
        status: PageStatus.VIEW_PAGE,
      }))
    }
  }, [data])

  return { state, setState, status, setStatus }
}
