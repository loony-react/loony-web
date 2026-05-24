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
    <div className="flex flex-1 justify-center items-center min-h-screen bg-[#0d0d0d] px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-1 text-[#ececec]">
          Welcome back
        </h1>
        <p className="text-sm text-center text-[#6b6b76] mb-8">Sign in to your account</p>

        <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="block text-xs font-medium mb-1.5 text-[#9b9ba4] uppercase tracking-wide">
                Username or email
              </label>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <p id="username-error" className="mt-1.5 text-xs text-red-400">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium mb-1.5 text-[#9b9ba4] uppercase tracking-wide">
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
                    className="absolute inset-y-0 right-3 flex items-center text-[#6b6b76] hover:text-[#9b9ba4] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <IoEyeOff className="w-4 h-4" /> : <IoEye className="w-4 h-4" />}
                  </button>
                )}
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            <div className="pt-1">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-5 text-center space-y-2">
          <p className="text-sm text-[#6b6b76]">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#10a37f] hover:text-[#0d8c6e] font-medium transition-colors">
              Create one
            </a>
          </p>
          <a href="/forgot-password" className="block text-xs text-[#6b6b76] hover:text-[#9b9ba4] transition-colors">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
