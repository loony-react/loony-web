import { Link } from "react-router"

const AuthError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] px-4 text-center">
      <p className="text-8xl font-bold text-white/5 mb-2 select-none">401</p>
      <h2 className="text-lg font-semibold text-[#ececec] mb-2">Unauthorized</h2>
      <p className="text-sm text-[#6b6b76] mb-8 max-w-xs">
        You need to be signed in to view this page.
      </p>
      <Link
        to="/login"
        className="text-sm font-medium px-4 py-2 rounded-lg bg-[#10a37f] text-white hover:bg-[#0d8c6e] transition-colors"
      >
        Sign in
      </Link>
    </div>
  )
}

export default AuthError
