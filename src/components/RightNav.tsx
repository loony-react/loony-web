/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocNode, AuthContextProps, AuthStatus } from "loony-types"
import { Link } from "react-router"

const className =
  "flex items-center gap-2 px-4 py-2 border border-gray-400 mr-4 rounded transition hover:bg-[#ececec] dark:hover:bg-[#363636]"

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
    <ul className="flex flex-row">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <>
          <li className={className}>
            <Link to={`/view/${docType}/${doc_id}`}>View</Link>
          </li>
          <li onClick={deleteDoc} className={className}>
            <Link to="#">Delete</Link>
          </li>
        </>
      ) : null}
      <li className={className}>
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
    <ul className="flex flex-row">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <li className={className}>
          <Link to={`/edit/${docType}/${doc_id}`}>Edit</Link>
        </li>
      ) : null}
      <li className={className}>
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}
