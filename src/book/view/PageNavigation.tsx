import { getChapter, getSection } from "loony-utils"
import {
  ReadBookState,
  DocNode,
  EditBookState,
  VoidReturnFunction,
} from "loony-types"
import { useCallback } from "react"

export const PageNavigation = <T extends ReadBookState | EditBookState>({
  setState,
  navNodes,
  state,
  doc_id,
  viewFrontPage,
}: {
  setState: React.Dispatch<React.SetStateAction<T>>
  navNodes: DocNode[]
  state: ReadBookState | EditBookState
  doc_id: number
  viewFrontPage: VoidReturnFunction
}) => {
  const { frontPage, parentNode, groupNodesById } = state

  const onGetChapter = useCallback(
    (chapter: DocNode) => {
      getChapter(chapter, setState, groupNodesById, doc_id)
    },
    [doc_id, groupNodesById, setState],
  )

  const onGetSection = useCallback(
    (section: DocNode) => {
      getSection(section, setState, groupNodesById, doc_id)
    },
    [doc_id, groupNodesById, setState],
  )

  if (!frontPage || !parentNode) return null

  return (
    <div className="fixed bg-[#111111] border-r border-white/[0.08] w-64 h-screen overflow-y-auto mt-14 pt-4 pb-6">
      <nav className="px-3">
        {/* Book title */}
        <button
          type="button"
          onClick={viewFrontPage}
          className="w-full text-left px-3 py-2 mb-3 rounded-lg text-sm font-semibold text-[#ececec] hover:bg-white/5 transition-colors duration-150 truncate"
        >
          {frontPage.title}
        </button>

        <div className="space-y-0.5">
          {navNodes.map((chapter) => {
            const isActiveChapter = parentNode.uid === chapter.uid

            return (
              <div key={chapter.uid}>
                {/* Chapter row */}
                <button
                  type="button"
                  className={`w-full text-left flex items-center px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors duration-150 border-l-2 ${
                    isActiveChapter
                      ? "border-[#10a37f] text-[#ececec] bg-white/5"
                      : "border-transparent text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onGetChapter(chapter)
                  }}
                >
                  {chapter.title}
                </button>

                {/* Section list */}
                {chapter.child && chapter.child.length > 0 && (
                  <ul className="pl-4 mt-0.5 space-y-0.5">
                    {chapter.child.map((section) => {
                      const isActiveSection = parentNode.uid === section.uid
                      return (
                        <li key={section.uid}>
                          <button
                            type="button"
                            className={`w-full text-left flex items-center px-3 py-1.5 rounded-md text-xs transition-colors duration-150 border-l-2 ${
                              isActiveSection
                                ? "border-[#10a37f] text-[#ececec] bg-white/5"
                                : "border-transparent text-[#6b6b76] hover:bg-white/5 hover:text-[#9b9ba4]"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              onGetSection(section)
                            }}
                          >
                            {section.title}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
