import { apiHttpClient, authHttpClient } from "./httpClient"

export const login = (creds) => authHttpClient.post("/login", creds)
export const register = (creds) => authHttpClient.post("/register", creds)
export const getBookNav = (doc_id: number) =>
  apiHttpClient.get(`/book/get/nav?doc_id=${doc_id}`)
