import { apiHttpClient, authHttpClient } from "./httpClient"

export const login = (creds) => authHttpClient.post("/login", creds)
export const logout = () => authHttpClient.post("/logout")
export const register = (creds) => authHttpClient.post("/register", creds)

/** Home */
export const getHomeBooks = () => apiHttpClient.get(`/book/get/home_books`)
export const getHomeBlogs = () => apiHttpClient.get(`/book/get/home_books`)

export const getUsersHomeBooks = (uid: number) =>
  apiHttpClient.get(`/book/get/${uid}/get_users_book`)
export const getUsersHomeBlogs = (uid: number) =>
  apiHttpClient.get(`/blog/get/${uid}/get_users_blog`)
/** Book */
export const getBookNav = (doc_id: number) =>
  apiHttpClient.get(`/book/get/nav?doc_id=${doc_id}`)

/** Blog */
export const getBlogNodes = (doc_id: number) =>
  apiHttpClient.get(`/blog/get/nodes?doc_id=${doc_id}`)
