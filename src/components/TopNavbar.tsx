/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, NavigateFunction } from "react-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { AuthStatus } from "loony-types"
import { axiosInstance } from "loony-api"
import type { AppContextProps, AuthContextProps } from "loony-types"
import { Menu } from "lucide-react"

const Navigation = ({
  authContext,
  appContext,
  setMobileNavOpen,
}: {
  appContext: AppContextProps
  authContext: AuthContextProps
  setMobileNavOpen: any
}) => {
  const navigate: NavigateFunction = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const logoutUser = useCallback(() => {
    axiosInstance.post("/auth/logout").then(() => {
      authContext.setAuthContext({
        status: AuthStatus.UNAUTHORIZED,
        user: null,
      })
      navigate("/", { replace: true })
    })
  }, [])

  return (
    <nav className="bg-white dark:bg-[#242424] border-b border-gray-200 dark:border-stone-900 text-black dark:text-white py-2">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center pl-5">
          <Menu
            className="block lg:hidden mr-2"
            onClick={() => {
              setMobileNavOpen((prevState: boolean) => !prevState)
            }}
          />
          <a href="/" className="text-xl font-bold">
            Loony
          </a>
        </div>

        {/* Menu */}
        <div className="hidden md:flex md:items-center pr-10">
          {authContext.status === AuthStatus.AUTHORIZED ? (
            <AuthNavRight logoutUser={logoutUser} />
          ) : (
            <NotAuthNavRight />
          )}
        </div>
      </div>
    </nav>
  )
}

const AuthNavRight = ({ logoutUser }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<any>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  return (
    <>
      <ul className="flex flex-col md:flex-row md:space-x-6 mt-3 md:mt-0">
        <li className="relative" ref={dropdownRef}>
          {/* Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-stone-100 hover:bg-stone-200 dark:bg-[#2e2e2e] hover:dark:bg-[#363636] rounded-sm transition duration-200"
          >
            Create
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md px-1 bg-white dark:bg-neutral-900 shadow-xl ring-1 ring-gray-200 dark:ring-gray-900 z-50 animate-fade-in">
              <ul className="py-2 text-sm">
                <li>
                  <a
                    href="/create/book"
                    className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#333333] transition duration-150"
                  >
                    Book
                  </a>
                </li>
                <li>
                  <a
                    href="/create/blog"
                    className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#333333] transition duration-150"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li>
          <a href="#" onClick={logoutUser} className="block py-2">
            Logout
          </a>
        </li>
      </ul>
    </>
  )
}

const NotAuthNavRight = () => {
  return (
    <>
      <ul className="flex flex-col md:flex-row md:space-x-6 mt-3 md:mt-0">
        <li>
          <a href="/login" className="block py-2">
            Login
          </a>
        </li>
      </ul>
    </>
  )
}

export default Navigation
