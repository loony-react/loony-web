import { useNavigate } from "react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { AuthStatus } from "loony-types"
import { useLogout } from "loony-api"
import type { AppContextProps, AuthContextProps } from "loony-types"
import { Moon, Sun } from "lucide-react"

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
      className="flex fixed w-full h-14 z-40 bg-[var(--bg-nav)] backdrop-blur-sm border-b border-[var(--border)]"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo / Brand */}
      <div className="flex items-center w-64 px-5 border-r border-[var(--border)]">
        <a
          href="/"
          className="text-[var(--text-primary)] text-base font-semibold tracking-tight hover:text-[var(--text-primary)] transition-colors"
          aria-label="Loony home"
        >
          Loony
        </a>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-end gap-3 px-5">
        <button
          onClick={() => appContext.setAppContext((prev) => ({ ...prev, isDark: !appContext.isDark }))}
          aria-label={appContext.isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-colors duration-150"
        >
          {appContext.isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
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
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--hover-bg)] hover:bg-[var(--hover-bg)] text-[var(--text-primary)] ring-1 ring-[var(--ring-color)] transition-all duration-150"
        >
          Create
          <svg
            className={`w-3.5 h-3.5 text-[var(--text-secondary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
            className="absolute right-0 mt-2 w-44 rounded-xl bg-[var(--surface)] shadow-xl ring-1 ring-[var(--ring-color)] z-50 overflow-hidden backdrop-blur-sm"
          >
            <ul className="py-1 text-sm">
              <li role="none">
                <a
                  href="/create/book"
                  role="menuitem"
                  className="flex items-center px-4 py-2.5 text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors duration-100"
                  onClick={() => setIsOpen(false)}
                >
                  Book
                </a>
              </li>
              <li role="none">
                <a
                  href="/create/blog"
                  role="menuitem"
                  className="flex items-center px-4 py-2.5 text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors duration-100"
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
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 px-2 py-1.5"
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
        className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 px-2 py-1.5"
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
