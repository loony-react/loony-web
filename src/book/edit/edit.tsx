import AddNode from "../../form/addNode.tsx"
import EditDocument from "../../form/editNode.tsx"
import { appendChapters, appendSections, appendSubSections } from "loony-utils"
import { EditBookAction, EditBookState, DocNode } from "loony-types"
import { useCallback } from "react"
import { STATE_VALUES } from "../../utils/const.ts"

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

  const editPage = useCallback(
    (data: DocNode) => {
      if (editNode) {
        let __parentNode: DocNode | null = null
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
        setState((prevState) => ({
          ...prevState,
          parentNode: __parentNode,
          navNodes: __navNodes,
          form: STATE_VALUES.form,
        }))
      }
    },
    [editNode, navNodes, setState],
  )

  const editSection = useCallback(
    (data: DocNode) => {
      if (!editNode) return
      setState((prevState) => ({
        ...prevState,
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
      }))
    },
    [editNode, groupNodesById, setState],
  )

  const editSubSection = useCallback(
    (data: DocNode) => {
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
      setState((prevState) => ({
        ...prevState,
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
      }))
    },
    [editNode, groupNodesById, parentNode, setState],
  )

  const updateFrontPage = useCallback(
    (data: DocNode) => {
      const __parentNode = {
        ...frontPage,
        ...data,
      }
      setState((prevState) => ({
        ...prevState,
        parentNode: __parentNode,
        page_id: __parentNode.uid,
        form: STATE_VALUES.form,
      }))
    },
    [frontPage, setState],
  )

  const addChapterFnCb = useCallback(
    (data: { new_node: DocNode; update_node: DocNode }) => {
      if (!topNode) return
      const newNavNodes = appendChapters(navNodes, topNode, data)
      setState((prevState) => ({
        ...prevState,
        parentNode: data.new_node,
        navNodes: newNavNodes,
        childNodes: [],
        addNode: null,
        form: STATE_VALUES.form,
      }))
    },
    [navNodes, setState, topNode],
  )

  const addSectionFnCb = useCallback(
    (data: { new_node: DocNode; update_node: DocNode }) => {
      if (!topNode || !parentNode) return

      const newNavNodes = appendSections(navNodes, topNode, data)
      const newActiveNode = data.new_node
      setState((prevState) => ({
        ...prevState,
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
      }))
    },
    [groupNodesById, navNodes, parentNode, setState, topNode],
  )

  const addSubSectionFnCb = useCallback(
    (data: { new_node: DocNode; update_node: DocNode }) => {
      if (!topNode || !parentNode) return
      const newChildNodes = appendSubSections(childNodes, topNode, data)

      setState((prevState) => ({
        ...prevState,
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
      }))
    },
    [childNodes, groupNodesById, parentNode, setState, topNode],
  )

  const onCancel = useCallback(() => {
    setState({
      ...state,
      form: STATE_VALUES.form,
      editNode: null,
      addNode: null,
    })
  }, [setState, state])

  const addNodeTypes: any = {
    101: {
      parent_id: topNode?.uid,
      FnCallback: addChapterFnCb,
      identity: 101,
      heading: "Add Chapter",
      page_id: page_id,
    },
    102: {
      parent_id: topNode?.uid,
      FnCallback: addSectionFnCb,
      identity: 102,
      heading: "Add Section",
      page_id: page_id,
    },
    103: {
      parent_id: topNode?.uid,
      FnCallback: addSubSectionFnCb,
      identity: 103,
      heading: "Add Sub-Section",
      page_id: section_id,
    },
  }

  const editNodeTypes: any = {
    100: {
      FnCallback: updateFrontPage,
    },
    101: {
      FnCallback: editPage,
    },
    102: {
      FnCallback: editSection,
    },
    103: {
      FnCallback: editSubSection,
    },
  }

  if (form.method === "create" && topNode) {
    return (
      <AddNode
        isMobile={isMobile}
        doc_id={doc_id as number}
        parent_identity={topNode.identity}
        onCancel={onCancel}
        docType="book"
        url="/book/append/node"
        {...addNodeTypes[form.nodeType]}
      />
    )
  }
  if (editNode) {
    return (
      <EditDocument
        docType="book"
        doc_id={doc_id}
        state={state}
        onCancel={onCancel}
        heading="Edit Node"
        url="/book/edit"
        isMobile={isMobile}
        {...editNodeTypes[editNode.identity]}
      />
    )
  }
  return null
}
