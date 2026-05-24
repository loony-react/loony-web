import { useContext, useState } from "react"
import { useSignup } from "loony-api"
import { useNavigate } from "react-router"
import { AuthStatus, NotificationContextProps, NotificationState, User } from "loony-types"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { AuthContext } from "../context/AuthContext"
import { Button, Input, PasswordInput } from "loony-ui"

const Signup = ({
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  const { onSignup } = useSignup()
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    confirm_password: "",
  })
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    confirm_password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validate = (): boolean => {
    const next = { fname: "", lname: "", username: "", password: "", confirm_password: "" }
    if (!formData.fname.trim()) next.fname = "First name is required."
    if (!formData.lname.trim()) next.lname = "Last name is required."
    if (!formData.username.trim()) next.username = "Username or email is required."
    if (!formData.password) next.password = "Password is required."
    else if (formData.password.length < 8) next.password = "Password must be at least 8 characters."
    if (!formData.confirm_password) next.confirm_password = "Please confirm your password."
    else if (formData.password !== formData.confirm_password) next.confirm_password = "Passwords do not match."
    setErrors(next)
    return Object.values(next).every((v) => !v)
  }

  const onSuccess = (data: User) => {
    authContext.setAuthContext({ status: AuthStatus.AUTHORIZED, user: data })
    navigate("/", {})
  }

  const onFailed = (err: string) => {
    setIsSubmitting(false)
    notificationContext.setNotificationContext((prev: NotificationState) => ({
      ...prev,
      alert: { title: "Registration failed", content: err, status: "error" },
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    onSignup(formData, onSuccess, onFailed)
  }

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-50 dark:bg-[#212121] px-4 py-12">
      <div className="w-full max-w-sm bg-white dark:bg-[#2e2e2e] dark:text-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Create account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              Username or email
            </label>
            <Input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Email or username"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && (
              <p id="username-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.username}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fname" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                First name
              </label>
              <Input
                id="fname"
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First name"
                aria-invalid={!!errors.fname}
                aria-describedby={errors.fname ? "fname-error" : undefined}
              />
              {errors.fname && (
                <p id="fname-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.fname}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lname" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                Last name
              </label>
              <Input
                id="lname"
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Last name"
                aria-invalid={!!errors.lname}
                aria-describedby={errors.lname ? "lname-error" : undefined}
              />
              {errors.lname && (
                <p id="lname-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.lname}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <PasswordInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {formData.password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                </button>
              )}
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              Confirm password
            </label>
            <div className="relative">
              <PasswordInput
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Repeat your password"
                aria-invalid={!!errors.confirm_password}
                aria-describedby={errors.confirm_password ? "confirm-error" : undefined}
              />
              {formData.confirm_password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                </button>
              )}
            </div>
            {errors.confirm_password && (
              <p id="confirm-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.confirm_password}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-gray-900 dark:text-white hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
