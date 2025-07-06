/* eslint-disable @typescript-eslint/no-explicit-any */
import AddNode from "../../form/addNode.tsx"
import EditDocument from "../../form/editNode.tsx"
import { appendChapters, appendSections, appendSubSections } from "loony-utils"
import { EditBookAction, EditBookState, DocNode } from "loony-types"
import { useCallback } from "react"
import { STATE_VALUES } from "utils/const.ts"

export default function EditComponent({
  state,
  setState,
  doc_id,
  isMobile,
}: {
  state: EditBookState
  setState: EditBookAction
  doc_id: number
  isMobile: boolean
}) {
  const {
    editNode,
    navNodes,
    frontPage,
    form,
    page_id,
    section_id,
    groupNodesById,
    childNodes,
    parentNode,
    topNode,
  } = state

  const editPage = (data: DocNode) => {
    if (!editNode) return
    let __parentNode = null
    const __navNodes = navNodes.map((n) => {
      if (n.uid === editNode.uid) {
        const t = {
          ...n,
          ...data,
        }
        __parentNode = t
        return t
      }
      return n
    })
    setState({
      ...state,
      parentNode: __parentNode,
      navNodes: __navNodes,
      form: STATE_VALUES.form,
    })
  }
  const editSection = (data: DocNode) => {
    if (!editNode) return
    setState({
      ...state,
      groupNodesById: {
        ...groupNodesById,
        [editNode.uid as number]: {
          ...data,
          child: editNode.child,
        },
      },
      parentNode: data,
      form: STATE_VALUES.form,
      editNode: null,
    })
  }
  const editSubSection = (data: DocNode) => {
    if (!editNode) return
    if (!parentNode) return
    const activeSection = groupNodesById[parentNode.uid]
    const subSections = activeSection.child as DocNode[]
    const child = subSections?.map((innerNode) => {
      if (innerNode.uid === editNode.uid) {
        return {
          ...innerNode,
          ...data,
        }
      }
      return innerNode
    })
    setState({
      ...state,
      groupNodesById: {
        ...groupNodesById,
        [parentNode.uid as number]: {
          ...activeSection,
          child,
        },
      },
      childNodes: child,
      form: STATE_VALUES.form,
      editNode: null,
    })
  }

  const updateFrontPage = (data: DocNode) => {
    const __parentNode = {
      ...frontPage,
      ...data,
    }
    setState({
      ...state,
      parentNode: __parentNode,
      page_id: __parentNode.uid,
      form: STATE_VALUES.form,
    })
  }

  const editFnCallback = (data: DocNode) => {
    if (!editNode) return
    if (editNode.identity === 100) {
      updateFrontPage(data)
    }
    if (editNode.identity === 101) {
      editPage(data)
    }
    if (editNode.identity === 102) {
      editSection(data)
    }
    if (editNode.identity === 103) {
      editSubSection(data)
    }
  }

  const addChapterFnCb = (data: {
    new_node: DocNode
    update_node: DocNode
  }) => {
    if (!topNode) return
    const newNavNodes = appendChapters(navNodes, topNode, data)
    setState({
      ...state,
      parentNode: data.new_node,
      navNodes: newNavNodes,
      childNodes: [],
      addNode: null,
      form: STATE_VALUES.form,
    })
  }

  const addSectionFnCb = (data: {
    new_node: DocNode
    update_node: DocNode
  }) => {
    if (!topNode || !parentNode) return

    const newNavNodes = appendSections(navNodes, topNode, data)
    const newActiveNode = data.new_node
    setState({
      ...state,
      addNode: null,
      navNodes: newNavNodes,
      section_id: newActiveNode.uid,
      parentNode: newActiveNode,
      childNodes: [],
      groupNodesById: {
        ...groupNodesById,
        [newActiveNode.uid]: {
          ...newActiveNode,
          child: [],
        },
      },
      form: STATE_VALUES.form,
    })
  }

  const addSubSectionFnCb = (data: {
    new_node: DocNode
    update_node: DocNode
  }) => {
    if (!topNode || !parentNode) return
    const newChildNodes = appendSubSections(childNodes, topNode, data)

    setState({
      ...state,
      groupNodesById: {
        ...groupNodesById,
        [parentNode?.uid as number]: {
          ...parentNode,
          child: newChildNodes,
        },
      },
      childNodes: newChildNodes,
      addNode: null,
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

  const nodeTypes: any = {
    101: {
      FnCallback: addChapterFnCb,
      url: "/book/append/node",
      identity: 101,
      heading: "Add Chapter",
      page_id: page_id,
    },
    102: {
      FnCallback: addSectionFnCb,
      url: "/book/append/node",
      identity: 102,
      heading: "Add Section",
      page_id: page_id,
    },
    103: {
      FnCallback: addSubSectionFnCb,
      url: "/book/append/node",
      identity: 103,
      heading: "Add Sub-Section",
      page_id: section_id,
    },
  }

  return (
    <>
      {form.method === "create" && topNode ? (
        <AddNode
          isMobile={isMobile}
          docIdName="book"
          doc_id={doc_id as number}
          parent_identity={topNode.identity}
          onCancel={onCancel}
          {...nodeTypes[form.nodeType]}
        />
      ) : null}

      {form.method === "update" ? (
        <EditDocument
          docIdName="book"
          doc_id={doc_id}
          state={state}
          FnCallback={editFnCallback}
          onCancel={onCancel}
          heading="Edit Node"
          url="/book/edit"
          isMobile={isMobile}
        />
      ) : null}
    </>
  )
}
