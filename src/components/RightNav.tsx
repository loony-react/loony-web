import { DocNode, AuthContextProps, AuthStatus } from "loony-types"
import { Link, NavigateFunction } from "react-router"

const ghostBtn =
  "px-3 py-1.5 text-xs font-medium rounded-lg ring-1 ring-white/10 text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec] transition-all duration-150"

const dangerBtn =
  "px-3 py-1.5 text-xs font-medium rounded-lg ring-1 ring-red-500/20 bg-red-600/10 text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-all duration-150"

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
    <div className="flex items-center gap-2 bg-[#111111] border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <>
          <button
            className={ghostBtn}
            onClick={() => navigate(`/view/${docType}/${doc_id}`, { replace: true })}
          >
            View
          </button>
          <button onClick={deleteDoc} className={dangerBtn}>
            Delete
          </button>
        </>
      ) : null}
      <Link to="#" className={ghostBtn}>Report</Link>
    </div>
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
    <div className="flex items-center gap-2 bg-[#111111] border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
      {authContext.status === AuthStatus.AUTHORIZED &&
      authContext.user?.uid === mainNode.user_id ? (
        <button
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#10a37f] text-white hover:bg-[#0d8c6e] transition-all duration-150"
          onClick={() => navigate(`/edit/${docType}/${doc_id}`, { replace: true })}
        >
          Edit
        </button>
      ) : null}
      <Link to="#" className={ghostBtn}>Report</Link>
    </div>
  )
}
