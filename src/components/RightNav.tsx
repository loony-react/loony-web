import { DocNode, AuthContextProps, AuthStatus } from "loony-types"
import { Link, NavigateFunction } from "react-router"

const btnClass =
  "px-4 py-2 border border-[#cccccc] dark:border-[#4d4d4d] hover:border-[#666666] text-gray-800 dark:text-white rounded cursor-pointer mr-2"

export const RightNavView = ({
  doc_id,
  authContext,
  mainNode,
  docType,
  deleteDoc,
  navigate,
}: {
  doc_id: number
  authContext: AuthContextProps
  mainNode: DocNode
  docType: string
  deleteDoc: () => void
  navigate: NavigateFunction
}) => {
  return (
    <ul className="flex flex-row">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <>
          <li
            className={btnClass}
            onClick={() => navigate(`/view/${docType}/${doc_id}`, { replace: true })}
          >
            View
          </li>
          <li onClick={deleteDoc} className={btnClass}>
            <Link to="#">Delete</Link>
          </li>
        </>
      ) : null}
      <li className={btnClass}>
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
  navigate,
}: {
  doc_id: number
  authContext: AuthContextProps
  mainNode: DocNode
  docType: string
  navigate: NavigateFunction
}) => {
  return (
    <ul className="flex flex-row">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <li
          className={btnClass}
          onClick={() => navigate(`/edit/${docType}/${doc_id}`, { replace: true })}
        >
          Edit
        </li>
      ) : null}
      <li className={btnClass}>
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}
