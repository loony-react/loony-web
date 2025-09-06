import { apiHttpClient, authHttpClient } from "./httpClient"

export const login = (creds) => authHttpClient.post("/login", creds)
export const logout = () => authHttpClient.post("/logout")
export const register = (creds) => authHttpClient.post("/register", creds)

/** Book */
export const getBookNav = (doc_id: number) =>
  apiHttpClient.get(`/book/get/nav?doc_id=${doc_id}`)

/** Blog */
export const getBlogNodes = (doc_id: number) =>
  apiHttpClient.get(`/blog/get/nodes?doc_id=${doc_id}`)
