import { LuMenu } from "react-icons/lu"
import { LiaUserSolid } from "react-icons/lia"
import { Link, useNavigate, NavigateFunction } from "react-router"
import { useCallback, useContext } from "react"
import { AuthStatus } from "loony-types"
import { AuthContext } from "../../context/AuthContext.tsx"
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
      <div className="menu">
        <button style={{ fontWeight: "bold" }}>Create</button>
        <div className="dropdown-con">
          <div className="dropdown-con-items">
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
      <div className="menu">
        <LiaUserSolid size={32} color="white" />
        <div className="dropdown-con">
          <div className="dropdown-con-items">
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
const Navigation = ({
  auth,
  setMobileNavOpen,
  isMobile,
}: {
  auth: Auth
  setMobileNavOpen: BooleanDispatchAction
  isMobile: boolean
}) => {
  const navigate: NavigateFunction = useNavigate()
  const authContext = useContext(AuthContext)

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
    <div className="top-navbar">
      <div className="top-navbar-container">
        <div className="flex-row">
          <div className="con-50 flex-center">
            {isMobile ? (
              <div className="nav-menu-btn">
                <LuMenu
                  color="white"
                  size={32}
                  onClick={() => {
                    setMobileNavOpen((prevState) => !prevState)
                  }}
                  style={{ marginRight: 10 }}
                />
              </div>
            ) : null}
            <div className="logo">
              <Logo />
            </div>
          </div>
          <div className="con-50 flex-end" style={{ paddingTop: 8 }}>
            <div className="app-menu">
              <CreateDocument {...auth} />
            </div>
            <div className="app-menu" style={{ marginLeft: 24 }}>
              <Profile
                authContext={authContext}
                logoutUser={logoutUser}
                navigate={navigate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
