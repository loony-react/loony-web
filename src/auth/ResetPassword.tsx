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

  const labelClass = "block text-xs font-medium mb-1.5 text-[var(--text-secondary)] uppercase tracking-wide"
  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[#6b6b76] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/50 focus:border-[#10a37f]/60 transition-all duration-150"

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-[var(--bg)] px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-1 text-[var(--text-primary)]">
          Reset password
        </h1>
        <p className="text-sm text-center text-[var(--text-muted)] mb-8">
          Enter your account email and choose a new password.
        </p>

        <div className="bg-[var(--surface-nav)] border border-[var(--border)] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className={labelClass}>Email or username</label>
              <input
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoFocus
                className={inputClass}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>New password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={inputClass}
                  aria-invalid={!!errors.password}
                />
                {formData.password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <IoEyeOff className="w-4 h-4" /> : <IoEye className="w-4 h-4" />}
                  </button>
                )}
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>Confirm new password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your new password"
                  className={inputClass}
                  aria-invalid={!!errors.confirmPassword}
                />
                {formData.confirmPassword.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <IoEyeOff className="w-4 h-4" /> : <IoEye className="w-4 h-4" />}
                  </button>
                )}
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-150 bg-[#ececec] text-[#0d0d0d] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSubmitting ? "Saving…" : "Reset password"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
          <a href="/login" className="text-[#10a37f] hover:text-[#0d8c6e] font-medium transition-colors">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
