import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { NotificationContextProps } from "loony-types"
import { onSendResetPassword } from "loony-api"
import { IoEye, IoEyeOff } from "react-icons/io5"

const ResetPassword = ({
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  const navigate = useNavigate()
  const { sessionId } = useParams()

  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" })
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validate = (): boolean => {
    const next = { email: "", password: "", confirmPassword: "" }
    if (!formData.email.trim()) next.email = "Email or username is required."
    if (!formData.password) next.password = "Password is required."
    else if (formData.password.length < 8) next.password = "Password must be at least 8 characters."
    if (!formData.confirmPassword) next.confirmPassword = "Please confirm your password."
    else if (formData.password !== formData.confirmPassword) next.confirmPassword = "Passwords do not match."
    setErrors(next)
    return Object.values(next).every((v) => !v)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    onSendResetPassword({
      sessionId,
      formData,
      setFormError: ({ label, message }: { label: string; message: string }) => {
        setErrors((prev) => ({ ...prev, [label]: message }))
        setIsSubmitting(false)
      },
      authContext: null,
      notificationContext,
      navigate,
    })
  }

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-50 dark:bg-[#212121] px-4">
      <div className="w-full max-w-sm bg-white dark:bg-[#2e2e2e] shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Reset password
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
          Enter your account email and choose a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              Email or username
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#4d4d4d] rounded-md bg-gray-50 dark:bg-[#292929] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-[#4d4d4d] rounded-md bg-gray-50 dark:bg-[#292929] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                aria-invalid={!!errors.password}
              />
              {formData.password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                </button>
              )}
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your new password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-[#4d4d4d] rounded-md bg-gray-50 dark:bg-[#292929] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                aria-invalid={!!errors.confirmPassword}
              />
              {formData.confirmPassword.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
                </button>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Saving…" : "Reset password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <a href="/login" className="font-medium text-gray-900 dark:text-white hover:underline">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
