import { authHttpClient } from "./httpClient"

export const login = (creds) => authHttpClient.post("/login", creds)
