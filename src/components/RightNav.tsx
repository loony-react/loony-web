import { DocNode, AuthContextProps, AuthStatus } from "loony-types"
import { Link } from "react-router"

const className = `px-4
      py-2
      border
      border-[#cccccc]
      dark:border-[#4d4d4d]
      hover:border-[#666666]
      text-gray-800
      dark:text-white
      rounded
      cursor-pointer
      mr-2`

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
  deleteDoc: any
  navigate: any
}) => {
  return (
    <ul className="flex flex-row">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <>
          <li
            className={className}
            onClick={() =>
              navigate(`/view/${docType}/${doc_id}`, { replace: true })
            }
          >
            View
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
  navigate,
}: {
  doc_id: number
  authContext: AuthContextProps
  mainNode: DocNode
  docType: string
  navigate: any
}) => {
  return (
    <ul className="flex flex-row">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <li
          className={className}
          onClick={() =>
            navigate(`/edit/${docType}/${doc_id}`, { replace: true })
          }
        >
          Edit
        </li>
      ) : null}
      <li className={className}>
        <Link to="#">Report</Link>
      </li>
    </ul>
  )
}
