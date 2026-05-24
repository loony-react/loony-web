import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { AuthStatus, NotificationContextProps, NotificationState, User } from "loony-types"
import { useLogin } from "loony-api"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { AuthContext } from "../context/AuthContext.tsx"
import { Button, Input, PasswordInput } from "loony-ui"

const Login = ({
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  const { onLogin } = useLogin()
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validate = (): boolean => {
    const next = { username: "", password: "" }
    if (!formData.username.trim()) next.username = "Username or email is required."
    if (!formData.password) next.password = "Password is required."
    else if (formData.password.length < 6) next.password = "Password must be at least 6 characters."
    setErrors(next)
    return !next.username && !next.password
  }

  const onSuccess = (data: User) => {
    authContext.setAuthContext({ status: AuthStatus.AUTHORIZED, user: data })
    navigate("/", {})
  }

  const onFailed = (err: string) => {
    setIsSubmitting(false)
    notificationContext.setNotificationContext((prev: NotificationState) => ({
      ...prev,
      alert: { title: "Login failed", content: err, status: "error" },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    onLogin(formData, onSuccess, onFailed)
  }

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-50 dark:bg-[#212121] px-4">
      <div className="w-full max-w-sm bg-white dark:bg-[#2e2e2e] dark:text-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Sign in
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
              placeholder="Enter your username or email"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && (
              <p id="username-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.username}
              </p>
            )}
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
                placeholder="Enter your password"
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

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="font-medium text-gray-900 dark:text-white hover:underline">
            Create one
          </a>
        </p>
        <p className="mt-2 text-center text-sm">
          <a href="/forgot-password" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
