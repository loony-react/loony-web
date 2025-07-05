import { DocNode, AuthContextProps, AuthStatus } from "loony-types"
import { Link } from "react-router"
import { LuFileWarning } from "react-icons/lu"
import { FiEdit2 } from "react-icons/fi"

export const RightNavView = ({
  doc_id,
  authContext,
  mainNode,
  docType,
}: {
  doc_id: number
  authContext: AuthContextProps
  mainNode: DocNode
  docType: string
}) => {
  return (
    <ul>
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <li className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition">
          <FiEdit2 color="#2d2d2d" size={16} />
          <Link to={`/view/${docType}/${doc_id}`}>View this page</Link>
        </li>
      ) : null}
      <li className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition">
        <LuFileWarning color="#2d2d2d" size={16} />
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}

export const RightNavEdit = ({
  doc_id,
  authContext,
  mainNode,
  docType,
}: {
  doc_id: number
  authContext: AuthContextProps
  mainNode: DocNode
  docType: string
}) => {
  return (
    <ul>
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <li className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition">
          <FiEdit2 color="#2d2d2d" size={16} />
          <Link to={`/edit/${docType}/${doc_id}`}>Edit this page</Link>
        </li>
      ) : null}
      <li className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition">
        <LuFileWarning color="#2d2d2d" size={16} />
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}
