import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { NotificationContextProps } from "loony-types"
import { onLogin } from "loony-api"
import { AuthContext } from "../context/AuthContext.tsx"

const Login = ({
  isMobile,
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [viewPassword, setViewPassword] = useState(false)
  const [formError, setFormError] = useState({
    label: "",
    message: "",
  })

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onHandleLogin = (e: any) => {
    e.preventDefault()
    setFormError({ label: "", message: "" })
    onLogin({
      formData,
      setFormError,
      authContext,
      notificationContext,
      navigate,
    })
  }

  return (
    <div className="w-120 mx-auto mt-10 p-6 bg-white dark:bg-[#2e2e2e] dark:text-white shadow-md rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={onHandleLogin} className="space-y-4">
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

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#f4f4f4] dark:bg-[#363636] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span>Dont have an account?</span>
        <a
          href="/signup"
          className="ml-1 font-medium text-blue-600 hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  )
}

export default Login
