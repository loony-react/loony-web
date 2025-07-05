import { BasicMenuNavContainer } from "../../components/Containers.tsx"
import { EditBlogState, ReadBlogState } from "loony-types"

export const Chapters = ({
  state,
}: {
  state: EditBlogState | ReadBlogState
}) => {
  const { childNodes } = state
  return (
    <>
      {childNodes.map((chapter) => {
        return (
          <div key={chapter.uid}>
            <BasicMenuNavContainer>
              <div className="page-nav-title">{chapter.title}</div>
            </BasicMenuNavContainer>
          </div>
        )
      })}
    </>
  )
}
