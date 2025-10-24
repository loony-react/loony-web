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
    <div className="fixed bg-gray-50 dark:bg-[#131313] text-stone-800 dark:text-stone-300 md:block w-72 bg-white p-4 space-y-6 shadow-md h-screen overflow-y-auto mt-16">
      <aside className="w-full overflow-y-auto py-4">
        <nav className="text-sm">
          <div
            className="px-2 py-1 text-xs font-semibold uppercase tracking-wide hover:bg-[#ececec] dark:hover:bg-[#363636]"
            onClick={viewFrontPage}
          >
            {frontPage.title}
          </div>
          {navNodes.map((chapter) => {
            return (
              <div key={chapter.uid}>
                <h2
                  className="px-2 py-1 text-xs font-semibold uppercase tracking-wide hover:bg-[#ececec] dark:hover:bg-[#333333]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onGetChapter(chapter)
                  }}
                  // isActive={parentNode.uid === chapter.uid}
                >
                  {chapter.title}
                </h2>
                <div className="sections px-4">
                  <ul
                    onClick={() => {
                      return
                    }}
                  >
                    {/* {page_id === chapter.uid &&
                } */}
                    {chapter.child?.map((section) => {
                      return (
                        <li key={section.uid}>
                          <a
                            href="#"
                            className="block px-2 py-1 rounded hover:bg-[#ececec] dark:hover:bg-[#363636]"
                            onClick={(e) => {
                              e.stopPropagation()
                              onGetSection(section)
                            }}
                            // isActive={parentNode.uid === section.uid}
                          >
                            {section.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
