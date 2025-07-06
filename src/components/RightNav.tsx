/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocNode, AuthContextProps, AuthStatus } from "loony-types"
import { Link } from "react-router"

export const RightNavView = ({
  doc_id,
  authContext,
  mainNode,
  docType,
  deleteDoc,
}: {
  doc_id: number
  authContext: AuthContextProps
  mainNode: DocNode
  docType: string
  deleteDoc: any
}) => {
  return (
    <ul>
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <>
          <li className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition">
            <Link to={`/view/${docType}/${doc_id}`}>View</Link>
          </li>
          <li
            onClick={deleteDoc}
            className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition"
          >
            Delete
          </li>
        </>
      ) : null}
      <li className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition">
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
          <Link to={`/edit/${docType}/${doc_id}`}>Edit</Link>
        </li>
      ) : null}
      <li className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-3 py-1 rounded transition">
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}
