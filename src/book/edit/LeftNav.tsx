import { getChapter, getSection, STATE_VALUES } from "loony-utils"
import { DocNode, EditBookAction, EditBookState } from "loony-types"
import { useCallback } from "react"

export const LeftNav = ({
  setState,
  state,
  doc_id,
}: {
  setState: EditBookAction
  state: EditBookState
  doc_id: number
}) => {
  const { frontPage, parentNode, groupNodesById, navNodes } = state

  const viewFrontPage = useCallback(() => {
    setState({
      ...state,
      page_id: frontPage?.uid || null,
      parentNode: frontPage,
      editNode: null,
      addNode: null,
      form: STATE_VALUES.form,
    })
  }, [frontPage, setState, state])

  const addChapter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, chapter: DocNode | undefined) => {
      e.preventDefault()
      if (frontPage) {
        setState((prevState) => ({
          ...prevState,
          topNode: chapter || frontPage,
          page_id: frontPage.uid,
          form: { method: "create", nodeType: 101 },
        }))
      }
    },
    [frontPage, setState],
  )

  const addSection = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, parentNode: DocNode, page_id: number) => {
      e.preventDefault()
      e.stopPropagation()
      if (parentNode) {
        setState({
          ...state,
          topNode: parentNode,
          page_id: page_id,
          form: { method: "create", nodeType: 102 },
        })
      }
    },
    [state, setState],
  )

  if (!frontPage || !parentNode) return null

  return (
    <div className="fixed bg-[#111111] border-r border-white/[0.08] w-64 h-screen overflow-y-auto mt-14 pt-4 pb-6">
      <nav className="px-3">
        {/* Book title */}
        <button
          type="button"
          onClick={viewFrontPage}
          className="w-full text-left px-3 py-2 mb-1 rounded-lg text-sm font-semibold text-[#ececec] hover:bg-white/5 transition-colors duration-150 truncate"
        >
          {frontPage.title}
        </button>

        {/* Add first chapter */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 mb-3 text-xs text-[#10a37f] hover:bg-[#10a37f]/10 rounded-md transition-colors duration-150"
          onClick={(e) => addChapter(e, undefined)}
        >
          <span className="text-base leading-none">+</span> Add chapter
        </button>

        <div className="space-y-0.5">
          {navNodes.map((chapter) => {
            const isActive = parentNode.uid === chapter.uid
            return (
              <div key={chapter.uid}>
                {/* Chapter row */}
                <button
                  type="button"
                  className={`w-full text-left flex items-center px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors duration-150 border-l-2 ${
                    isActive
                      ? "border-[#10a37f] text-[#ececec] bg-white/5"
                      : "border-transparent text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    getChapter(chapter, setState, groupNodesById, doc_id)
                  }}
                >
                  <span className="truncate flex-1">{chapter.title}</span>
                </button>

                {/* Sections */}
                <div className="pl-3">
                  {chapter.child?.map((section) => {
                    const isSectionActive = parentNode.uid === section.uid
                    return (
                      <div key={section.uid}>
                        <button
                          type="button"
                          className={`w-full text-left flex items-center px-3 py-1.5 rounded-md text-xs transition-colors duration-150 border-l-2 ${
                            isSectionActive
                              ? "border-[#10a37f] text-[#ececec] bg-white/5"
                              : "border-transparent text-[#6b6b76] hover:bg-white/5 hover:text-[#9b9ba4]"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            getSection(section, setState, groupNodesById, doc_id)
                          }}
                        >
                          <span className="truncate">{section.title}</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 px-4 py-1 text-[10px] text-[#10a37f] hover:bg-[#10a37f]/10 rounded transition-colors"
                          onClick={(e) => addSection(e, section, chapter.uid)}
                        >
                          + section
                        </button>
                      </div>
                    )
                  })}
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1 text-[10px] text-[#10a37f] hover:bg-[#10a37f]/10 rounded transition-colors"
                    onClick={(e) => addSection(e, chapter, chapter.uid)}
                  >
                    + section
                  </button>
                </div>

                {/* Add chapter after this one */}
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1 mb-1 text-[10px] text-[#6b6b76] hover:text-[#10a37f] hover:bg-[#10a37f]/10 rounded transition-colors"
                  onClick={(e) => addChapter(e, chapter)}
                >
                  + chapter
                </button>
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
