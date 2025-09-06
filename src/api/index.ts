import { authHttpClient } from "./httpClient"

export const getUserInfo = () => authHttpClient.get("/user/userInfo")

export const login = (credentials: any) =>
  authHttpClient.post("/login", credentials)

export const signup = (credentials: any) =>
  authHttpClient.post("/register", credentials)

export const logout = () => authHttpClient.post("/logout")

// const cleanUrl = (url: string) => (url[0] === "/" ? url.slice(1) : url)
