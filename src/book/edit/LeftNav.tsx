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
          form: {
            method: "create",
            nodeType: 101,
          },
        }))
      }
    },
    [frontPage, setState],
  )

  const addSection = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      parentNode: DocNode,
      page_id: number,
    ) => {
      e.preventDefault()
      if (parentNode) {
        setState({
          ...state,
          topNode: parentNode,
          page_id: page_id,
          form: {
            method: "create",
            nodeType: 102,
          },
        })
      }
      e.stopPropagation()
    },
    [state, setState],
  )

  if (!frontPage || !parentNode) return null

  return (
    <div className="w-full flex h-screen">
      <aside className="w-full border-r border-gray-200 dark:border-[#4d4d4d] overflow-y-auto py-4">
        <nav className="text-sm">
          <div>
            <div
              className="px-2 py-1 text-xs font-semibold uppercase tracking-wide hover:bg-[#ececec] dark:hover:bg-[#363636]"
              onClick={viewFrontPage}
            >
              {frontPage.title}
            </div>
            <button
              className="px-2 block rounded text-blue-700 dark:text-[#bdbdbd] hover:bg-[#ececec] dark:hover:bg-[#333333]"
              onClick={(e) => addChapter(e, undefined)}
            >
              Add Chapter
            </button>
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
                >
                  <div style={{ width: "90%" }}>{chapter.title}</div>
                </h2>
                <div className="sections px-4">
                  <button
                    className="block px-2 rounded text-blue-700 dark:text-[#bdbdbd] hover:bg-[#ececec] dark:hover:bg-[#333333]"
                    onClick={(e) => addSection(e, chapter, chapter.uid)}
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
                          <button
                            className="block px-2 rounded text-blue-700 dark:text-[#bdbdbd] hover:bg-[#ececec] dark:hover:bg-[#333333]"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                              addSection(e, section, chapter.uid)
                            }
                          >
                            Add Section
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <button
                  className="block px-2 rounded text-blue-700 dark:text-[#bdbdbd] hover:bg-[#ececec] dark:hover:bg-[#333333]"
                  onClick={(e) => addChapter(e, chapter)}
                >
                  Add Chapter
                </button>
              </div>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
