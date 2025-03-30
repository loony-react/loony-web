import { DocNode, AuthContextProps, AuthStatus } from "loony-types"
import { Link } from "react-router"
import { LuFileWarning } from "react-icons/lu"
import { FiEdit2 } from "react-icons/fi"

export default function RightNav({
  doc_id,
  authContext,
  mainNode,
}: {
  doc_id: number
  authContext: AuthContextProps
  mainNode: DocNode
}) {
  return (
    <ul className="list-item" style={{ paddingLeft: 0, listStyle: "none" }}>
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <li>
          <FiEdit2 color="#2d2d2d" size={16} />
          <Link to={`/edit/blog/${doc_id}`}>Edit this page</Link>
        </li>
      ) : null}
      <li>
        <LuFileWarning color="#2d2d2d" size={16} />
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}
