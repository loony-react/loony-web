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
    <div className="flex h-screen bg-white">
      <aside className="w-64 border-r border-gray-200 overflow-y-auto px-4">
        <nav className="space-y-4 text-sm">
          <div>
            <h2
              className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
              onClick={viewFrontPage}
              // isActive={parentNode.uid === frontPage.uid}
            >
              {frontPage.title}
            </h2>
          </div>
          {navNodes.map((chapter) => {
            return (
              <div key={chapter.uid}>
                <h2
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  onClick={(e) => {
                    e.stopPropagation()
                    getChapter(chapter, setState, groupNodesById, doc_id)
                  }}
                  // isActive={parentNode.uid === chapter.uid}
                >
                  {chapter.title}
                </h2>
                <ul
                  className="mt-2 space-y-1"
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
                          className="block px-2 py-1 rounded text-gray-700 hover:bg-gray-100"
                          // className="block px-2 py-1 rounded bg-gray-100 text-sky-600 font-medium"
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
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
