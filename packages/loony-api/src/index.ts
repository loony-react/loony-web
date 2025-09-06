export { useLogin, useLogout, useSignup } from "./authHooks"
export { axiosInstance } from "./httpClient"
export {
  onSendResetPassword,
  onSendResetPasswordEmail,
  onSignup,
} from "./onSubmit"
export { useGetBookNav } from "./bookApiHook"
export { useGetBlogNodes } from "./blogApiHook"
export {
  useHomeBooks,
  useHomeBlogs,
  useUserHomeBlogs,
  useUserHomeBooks,
} from "./homeHooks"

export const CREATE_BOOK = "/book/create"
export const CREATE_BLOG = "/blog/create"
