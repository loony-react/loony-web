/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { LuMenu } from "react-icons/lu"
import { LiaUserSolid } from "react-icons/lia"
import { Link, useNavigate, NavigateFunction } from "react-router"
import { useCallback, useContext, useState } from "react"
import { AuthStatus } from "loony-types"
import { AuthContext } from "../context/AuthContext.tsx"
import { axiosInstance } from "loony-api"
import type {
  Auth,
  BooleanDispatchAction,
  VoidReturnFunction,
} from "loony-types"

const Logo = () => {
  return (
    <Link className="nav-item" to="/" style={{ color: "white" }}>
      LOONY
    </Link>
  )
}

const CreateDocument = (authContext: Auth) => {
  if (authContext.status === AuthStatus.AUTHORIZED) {
    return (
      <div className="create-button">
        <button style={{ fontWeight: "bold" }}>Create</button>
        <div className="dropdown-content">
          <div className="dropdown-content-items">
            <div className="nav-list-items">
              <ul>
                <li>
                  <Link to="/create/book">Create Book</Link>
                </li>
                <li>
                  <Link to="/create/blog">Create Blog</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const Profile = ({
  authContext,
  logoutUser,
  navigate,
}: {
  authContext: Auth
  logoutUser: VoidReturnFunction
  navigate: NavigateFunction
}) => {
  if (authContext.status === AuthStatus.AUTHORIZED && authContext.user) {
    const { fname, lname } = authContext.user
    return (
      <div className="profile-button">
        <LiaUserSolid size={32} />
        <div className="profile-content">
          <div className="profile-content-items">
            <div className="nav-list-items">
              <ul>
                <li>
                  <Link to="/profile">
                    {fname} {lname}
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={logoutUser}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-button">
      <button
        style={{ fontWeight: "bold" }}
        onClick={() => {
          navigate("/login", { replace: true })
        }}
      >
        Login
      </button>
    </div>
  )
}
const Navigation = () => {
  const navigate: NavigateFunction = useNavigate()
  const authContext = useContext(AuthContext)
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
    <nav className="bg-white border-b border-gray-200 px-10 py-2">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-900">
          Loony
        </a>

        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`md:flex md:items-center ${isOpen ? "block" : "hidden"}`}
        >
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
  return (
    <>
      <ul className="flex flex-col md:flex-row md:space-x-6 mt-3 md:mt-0">
        <li>
          <a href="/" className="block py-2 text-gray-700 hover:text-blue-600">
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={logoutUser}
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
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
          <a
            href="/login"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Login
          </a>
        </li>
      </ul>
    </>
  )
}

export default Navigation
