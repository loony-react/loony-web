import { useContext, useState } from "react"
import { useSignup } from "loony-api"
import { useNavigate } from "react-router"
import {
  AuthStatus,
  NotificationContextProps,
  NotificationState,
  User,
} from "loony-types"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { AuthContext } from "context/AuthContext"

const Signup = ({
  isMobile,
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  // Hooks
  const { onSignup, error } = useSignup()
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  // State
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    confirm_password: "",
  })

  const [state, setState] = useState({
    showPassword: false,
    showConfirmPassword: false,
  })

  // Functions
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

  const onHandleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSignup(formData, onSuccess, onFailed)
  }

  return (
    <div className="w-120 mx-auto mt-10 p-6 shadow-md dark:bg-[#2e2e2e] rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Signup</h2>
      <form onSubmit={onHandleSignup} className="space-y-4">
        {/* Username / Email Input */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Username or Email
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#f4f4f4] dark:bg-[#363636] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">First name</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#f4f4f4] dark:bg-[#363636] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last name</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
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

        <div>
          <label className="block text-sm mb-2">Confirm Password</label>
          <div className="relative">
            <input
              name="confirm_password"
              type={state.showConfirmPassword ? "text" : "password"}
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#f4f4f4] dark:bg-[#363636] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="password"
              required
            />

            {/* Show eye icon only when typing */}
            {formData.confirm_password.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setState({
                    ...state,
                    showConfirmPassword: !state.showConfirmPassword,
                  })
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {state.showConfirmPassword ? (
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span>Have an account?</span>
        <a
          href="/login"
          className="ml-1 font-medium text-blue-600 hover:underline"
        >
          Login
        </a>
      </div>
    </div>
  )
}

export default Signup
