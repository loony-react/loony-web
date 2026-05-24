import React, { useEffect, useState } from "react"
import { AuthStatus } from "loony-types"
import PageLoader from "../components/PageLoader.tsx"
import { Auth, AuthContextProps } from "loony-types"
import { getUserInfo } from "loony-api"

const authState: Auth = {
  status: AuthStatus.IDLE,
  user: null,
}

export const AuthContext = React.createContext<AuthContextProps>({
  ...authState,
  setAuthContext: () => {
    return
  },
})

const useAuthSession = (): [
  Auth,
  React.Dispatch<React.SetStateAction<Auth>>,
] => {
  const [authContext, setAuthContext] = useState(authState)

  useEffect(() => {
    getUserInfo()
      .then(({ data }) => {
        setAuthContext({
          user: data,
          status: AuthStatus.AUTHORIZED,
        })
      })
      .catch(() => {
        setAuthContext({
          user: null,
          status: AuthStatus.UNAUTHORIZED,
        })
      })
  }, [])
  return [authContext, setAuthContext]
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authContext, setAuthContext] = useAuthSession()

  if (authContext.status === AuthStatus.IDLE)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#212121]">
        <PageLoader key_id={1} />
      </div>
    )

  return (
    <AuthContext.Provider
      value={{
        ...authContext,
        setAuthContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
