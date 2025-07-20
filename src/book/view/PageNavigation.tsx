import { getChapter, getSection } from "loony-utils"
import {
  ReadBookAction,
  ReadBookState,
  DocNode,
  EditBookAction,
  EditBookState,
  VoidReturnFunction,
} from "loony-types"

export const PageNavigation = ({
  setState,
  navNodes,
  state,
  doc_id,
  viewFrontPage,
}: {
  setState: ReadBookAction | EditBookAction
  navNodes: DocNode[]
  state: ReadBookState | EditBookState
  doc_id: number
  viewFrontPage: VoidReturnFunction
}) => {
  const { frontPage, parentNode, groupNodesById } = state

  if (!frontPage || !parentNode) return null

  return (
    <div className="w-full flex h-screen">
      <aside className="w-full border-r border-gray-200 dark:border-[#4d4d4d] overflow-y-auto py-4">
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
                    getChapter(chapter, setState, groupNodesById, doc_id)
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
                              getSection(
                                section,
                                setState,
                                groupNodesById,
                                doc_id,
                              )
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
