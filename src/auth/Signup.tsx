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
import { register } from "loony-api/src/api"
import { Button, Input, PasswordInput } from "loony-ui"

const Signup = ({
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  // Hooks
  const { onSignup } = useSignup()
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
    <>
      <div className="fixed bg-gray-50 dark:bg-[#131313] text-stone-800 dark:text-stone-300 md:block w-72 bg-white p-4 space-y-6 shadow-md h-screen overflow-y-auto mt-16" />

      <div className="flex flex-1 justify-center items-center overflow-hidden h-screen dark:bg-[#212121]">
        <div className="w-120 mx-auto mt-10 p-6 shadow-md dark:bg-[#2e2e2e] dark:text-white rounded-lg shadow-lg">
          <div className="flex justify-center">
            <h2 className="text-2xl font-bold mb-6">Sign up</h2>
          </div>
          <form onSubmit={onHandleSignup} className="space-y-4">
            {/* Username / Email Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Username or Email
              </label>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your email address or 10 digit phone number."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                First name
              </label>
              <Input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Surname</label>
              <Input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Surname or Lastname"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <PasswordInput
                  name="password"
                  type={state.showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
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
                <PasswordInput
                  name="confirm_password"
                  type={state.showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm Password"
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
            <Button onClick={register}>Register</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span>Have an account?</span>
            <a
              href="/login"
              className="ml-1 font-medium text-black dark:text-white hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
