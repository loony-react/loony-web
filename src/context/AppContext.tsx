/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, ReactNode, useEffect } from "react"
import { AppContextProps, AppState } from "loony-types"
import config from "../../config/app.config.json"

const appConfig: any = config
const env: string = config.env
const currentConfig: any = appConfig[env]
const { API_URL } = currentConfig

export const AppContext = createContext<AppContextProps>({
  env: {
    base_url: API_URL,
  },
  device: {
    type: "desktop",
    width: 1920,
    height: 1080,
  },
  isDark: true,
  setAppContext: () => {
    return
  },
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setAppContext] = useState<AppState>({
    env: {
      base_url: API_URL,
    },
    device: {
      type: "desktop",
      width: 1920,
      height: 1080,
    },
    isDark:
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  })

  useEffect(() => {
    if (window.innerWidth <= 720) {
      setAppContext({ ...state, device: { ...state.device, type: "mobile" } })
    }

    if (state.isDark) {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
    }
  }, [state, state.isDark, setAppContext])

  return (
    <AppContext.Provider value={{ ...state, setAppContext }}>
      {children}
    </AppContext.Provider>
  )
}
