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
    <nav
      className="flex fixed w-full h-14 z-40 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-white/[0.08]"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo / Brand */}
      <div className="flex items-center w-64 px-5 border-r border-white/[0.08]">
        <a
          href="/"
          className="text-[#ececec] text-base font-semibold tracking-tight hover:text-white transition-colors"
          aria-label="Loony home"
        >
          Loony
        </a>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-end px-5">
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
    <ul className="flex items-center gap-3" role="list">
      <li className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-white/5 hover:bg-white/10 text-[#ececec] ring-1 ring-white/10 transition-all duration-150"
        >
          Create
          <svg
            className={`w-3.5 h-3.5 text-[#9b9ba4] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
            className="absolute right-0 mt-2 w-44 rounded-xl bg-[#1a1a1a] shadow-xl ring-1 ring-white/10 z-50 overflow-hidden backdrop-blur-sm"
          >
            <ul className="py-1 text-sm">
              <li role="none">
                <a
                  href="/create/book"
                  role="menuitem"
                  className="flex items-center px-4 py-2.5 text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec] transition-colors duration-100"
                  onClick={() => setIsOpen(false)}
                >
                  Book
                </a>
              </li>
              <li role="none">
                <a
                  href="/create/blog"
                  role="menuitem"
                  className="flex items-center px-4 py-2.5 text-[#9b9ba4] hover:bg-white/5 hover:text-[#ececec] transition-colors duration-100"
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
          className="text-sm text-[#9b9ba4] hover:text-[#ececec] transition-colors duration-150 px-2 py-1.5"
        >
          Sign out
        </button>
      </li>
    </ul>
  )
}

const NotAuthNavRight = () => (
  <ul className="flex items-center gap-3" role="list">
    <li>
      <a
        href="/login"
        className="text-sm font-medium text-[#9b9ba4] hover:text-[#ececec] transition-colors duration-150 px-2 py-1.5"
      >
        Sign in
      </a>
    </li>
    <li>
      <a
        href="/signup"
        className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[#10a37f] text-white hover:bg-[#0d8c6e] transition-colors duration-150"
      >
        Sign up
      </a>
    </li>
  </ul>
)

export default TopNavbar
