export * from "./hooks"
export { axiosInstance } from "./httpClient"
export {
  onSendResetPassword,
  onSendResetPasswordEmail,
  onSignup,
} from "./onSubmit"
export { useGetBookNav } from "./bookApiHook"

export const CREATE_BOOK = "/book/create"
export const CREATE_BLOG = "/blog/create"
