import { useState } from "react"
import { NotificationContextProps } from "loony-types"
import { onSendResetPasswordEmail } from "loony-api"

const ForgotPassword = ({
  notificationContext,
}: {
  isMobile: boolean
  notificationContext: NotificationContextProps
}) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email.trim()) {
      setError("Email or username is required.")
      return
    }
    setIsSubmitting(true)
    onSendResetPasswordEmail({
      formData: { email },
      setFormError: ({ message }: { label: string; message: string }) => {
        setError(message)
        setIsSubmitting(false)
      },
      authContext: null,
      notificationContext,
      navigate: () => setSent(true),
    })
  }

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-[#0d0d0d] px-4">
      <div className="w-full max-w-sm">
        {sent ? (
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#10a37f]/10 border border-[#10a37f]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#10a37f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#ececec] mb-1">Check your inbox</h2>
            <p className="text-sm text-[#6b6b76] mb-6">
              We sent a reset link to <span className="text-[#9b9ba4]">{email}</span>
            </p>
            <a href="/login" className="text-sm text-[#10a37f] hover:text-[#0d8c6e] font-medium transition-colors">
              Back to sign in
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center mb-1 text-[#ececec]">
              Forgot password?
            </h1>
            <p className="text-sm text-center text-[#6b6b76] mb-8">
              We'll send you a reset link.
            </p>

            <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium mb-1.5 text-[#9b9ba4] uppercase tracking-wide">
                    Email or username
                  </label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    placeholder="you@example.com"
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-[#ececec] placeholder-[#6b6b76] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/50 focus:border-[#10a37f]/60 transition-all duration-150"
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                  />
                  {error && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-150 bg-[#ececec] text-[#0d0d0d] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isSubmitting ? "Sending…" : "Send reset link"}
                </button>
              </form>
            </div>

            <p className="mt-5 text-center text-sm text-[#6b6b76]">
              Remembered it?{" "}
              <a href="/login" className="text-[#10a37f] hover:text-[#0d8c6e] font-medium transition-colors">
                Sign in
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
