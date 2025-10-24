import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import {
  AuthStatus,
  NotificationContextProps,
  NotificationState,
  User,
} from "loony-types"
import { useLogin } from "loony-api"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { AuthContext } from "../context/AuthContext.tsx"

const Login = ({
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  const { onLogin } = useLogin()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [state, setState] = useState({
    showPassword: false,
  })

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSuccess = (data: User) => {
    authContext.setAuthContext({
      status: AuthStatus.AUTHORIZED,
      user: data,
    })
    navigate("/", {})
  }

  const onFailed = (err: any) => {
    notificationContext.setNotificationContext(
      (prevState: NotificationState) => ({
        ...prevState,
        alert: {
          title: "Error",
          content: err,
          status: "error",
        },
      }),
    )
  }

  const onHandleLogin = (e: any) => {
    e.preventDefault()
    onLogin(formData, onSuccess, onFailed)
  }

  return (
    <div className="w-120 mx-auto mt-10 p-6 bg-white dark:bg-[#2e2e2e] dark:text-white shadow-md rounded-lg shadow-lg">
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
      </div>
      <form onSubmit={onHandleLogin} className="space-y-4">
        {/* Username / Email Input */}
        <div>
          <label className="block text-sm mb-2">Username or Email</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#f4f4f4] dark:bg-[#363636] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm mb-2">Password</label>
          <div className="relative">
            <input
              name="password"
              type={state.showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#f4f4f4] dark:bg-[#363636] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="password"
              required
            />

            {/* Show eye icon only when typing */}
            {formData.password.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setState({ ...state, showPassword: !state.showPassword })
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {state.showPassword ? (
                  <IoEyeOff className="w-5 h-5" />
                ) : (
                  <IoEye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-white dark:text-black text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span>Dont have an account?</span>
        <a
          href="/signup"
          className="ml-1 font-medium text-blue-600 dark:text-white hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  )
}

export default Login
