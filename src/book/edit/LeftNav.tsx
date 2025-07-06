import { getChapter, getSection } from "loony-utils"
import { EditBookAction, EditBookState, VoidReturnFunction } from "loony-types"

export const LeftNav = ({
  setState,
  state,
  doc_id,
  viewFrontPage,
}: {
  setState: EditBookAction
  state: EditBookState
  doc_id: number
  viewFrontPage: VoidReturnFunction
}) => {
  const { frontPage, parentNode, groupNodesById, navNodes } = state

  if (!frontPage || !parentNode) return null

  return (
    <div className="w-full flex h-screen bg-white">
      <aside className="w-full border-r border-gray-200 overflow-y-auto px-4 py-4">
        <nav className="text-sm">
          <div>
            <div
              className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
              onClick={viewFrontPage}
              // isActive={parentNode.uid === frontPage.uid}
            >
              {frontPage.title}
            </div>
            <button
              className="block px-2 py-1 rounded text-blue-700 hover:bg-blue-100"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                setState((prevState) => ({
                  ...prevState,
                  topNode: frontPage,
                  page_id: frontPage.uid,
                  form: {
                    method: "create",
                    nodeType: 101,
                  },
                }))
              }}
            >
              Add Chapter
            </button>
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
                  <div style={{ width: "90%" }}>{chapter.title}</div>
                </h2>
                <button
                  className="block py-1 rounded text-blue-700 hover:bg-gray-100"
                  onClick={() => {
                    setState({
                      ...state,
                      topNode: chapter,
                      page_id: frontPage.uid,
                      form: {
                        method: "create",
                        nodeType: 101,
                      },
                    })
                  }}
                >
                  Add Chapter
                </button>
                <button
                  className="block ml-2 rounded text-blue-700 hover:bg-gray-100"
                  onClick={() => {
                    setState({
                      ...state,
                      topNode: chapter,
                      page_id: chapter.uid,
                      form: {
                        method: "create",
                        nodeType: 102,
                      },
                    })
                  }}
                >
                  Add Section
                </button>
                <ul
                  onClick={() => {
                    return
                  }}
                >
                  {chapter.child?.map((section) => {
                    return (
                      <li key={section.uid}>
                        <a
                          className="block px-2 rounded text-gray-700 hover:bg-gray-100"
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
                        <button
                          className="block px-2 py-1 rounded text-blue-700 hover:bg-gray-100"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            setState({
                              ...state,
                              topNode: section,
                              page_id: chapter.uid,
                              form: {
                                method: "create",
                                nodeType: 102,
                              },
                            })
                            e.stopPropagation()
                          }}
                        >
                          Add Section
                        </button>
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
