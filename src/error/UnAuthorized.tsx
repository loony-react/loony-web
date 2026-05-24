import { Link } from "react-router"

const AuthError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#212121] px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">401</h1>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Unauthorized</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        You need to be signed in to view this page.
      </p>
      <Link
        to="/login"
        className="text-sm font-medium px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity"
      >
        Sign in
      </Link>
    </div>
  )
}

export default AuthError
