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
    <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-50 dark:bg-[#212121] px-4">
      <div className="w-full max-w-sm bg-white dark:bg-[#2e2e2e] shadow-md rounded-xl p-8">
        {sent ? (
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your inbox</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We sent a password reset link to <strong>{email}</strong>.
            </p>
            <a href="/login" className="mt-6 inline-block text-sm font-medium text-gray-900 dark:text-white hover:underline">
              Back to sign in
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
              Forgot password?
            </h1>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
              Enter your email and we'll send you a reset link.
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(e as unknown as React.FormEvent) }}
                  placeholder="you@example.com"
                  autoFocus
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#4d4d4d] rounded-md bg-gray-50 dark:bg-[#292929] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                  aria-invalid={!!error}
                  aria-describedby={error ? "email-error" : undefined}
                />
                {error && (
                  <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Sending…" : "Send reset link"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Remembered it?{" "}
              <a href="/login" className="font-medium text-gray-900 dark:text-white hover:underline">
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
