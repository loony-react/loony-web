import { useNavigate } from "react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { AuthStatus } from "loony-types"
import { useLogout } from "loony-api"
import type { AppContextProps, AuthContextProps } from "loony-types"

const TopNavbar = ({
  authContext,
  appContext,
  setMobileNavOpen,
}: {
  appContext: AppContextProps
  authContext: AuthContextProps
  setMobileNavOpen: (fn: (prev: boolean) => boolean) => void
}) => {
  const navigate = useNavigate()
  const { onLogout } = useLogout()

  const onLogoutSuccess = useCallback(() => {
    authContext.setAuthContext({ status: AuthStatus.UNAUTHORIZED, user: null })
    navigate("/", { replace: true })
  }, [authContext, navigate])

  const logoutUser = useCallback(() => {
    onLogout(onLogoutSuccess, () => {})
  }, [onLogout, onLogoutSuccess])

  return (
    <nav className="flex fixed w-full h-16 z-40" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="flex items-center w-72 px-4 bg-white dark:bg-[#131313] text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a]">
        <a href="/" className="text-xl font-bold tracking-tight" aria-label="Loony home">
          Loony
        </a>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-end bg-gray-50 dark:bg-[#212121] text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a] pr-6">
        {authContext.status === AuthStatus.AUTHORIZED ? (
          <AuthNavRight logoutUser={logoutUser} />
        ) : (
          <NotAuthNavRight />
        )}
      </div>
    </nav>
  )
}

const AuthNavRight = ({ logoutUser }: { logoutUser: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <ul className="flex items-center gap-4" role="list">
      <li className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-stone-100 hover:bg-stone-200 dark:bg-[#2e2e2e] dark:hover:bg-[#363636] transition-colors"
        >
          Create
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-1.5 w-48 rounded-lg bg-white dark:bg-[#2e2e2e] shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 z-50"
          >
            <ul className="py-1 text-sm">
              <li role="none">
                <a
                  href="/create/book"
                  role="menuitem"
                  className="block px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#3a3a3a] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Book
                </a>
              </li>
              <li role="none">
                <a
                  href="/create/blog"
                  role="menuitem"
                  className="block px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#3a3a3a] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        )}
      </li>

      <li>
        <button
          onClick={logoutUser}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Sign out
        </button>
      </li>
    </ul>
  )
}

const NotAuthNavRight = () => (
  <ul className="flex items-center gap-4" role="list">
    <li>
      <a
        href="/login"
        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        Sign in
      </a>
    </li>
    <li>
      <a
        href="/signup"
        className="text-sm font-medium px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity"
      >
        Sign up
      </a>
    </li>
  </ul>
)

export default TopNavbar
