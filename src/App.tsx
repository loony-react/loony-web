import { AuthContext, AuthProvider } from "./context/AuthContext.tsx"
import { AppContext, AppProvider } from "./context/AppContext.tsx"
import NotificationContext, {
  NotificationProvider,
} from "./context/NotificationContext.tsx"

import { BrowserRouter } from "react-router"
import Routes from "./Routes.tsx"
import { AuthContextProps } from "loony-types"

function App() {
  return (
    <div className="text-stone-900 dark:text-stone-50 bg-stone-50 dark:bg-stone-900">
      <AppProvider>
        <NotificationProvider>
          <AuthProvider>
            <BrowserRouter>
              <AppContext.Consumer>
                {(appContext) => {
                  return (
                    <NotificationContext.Consumer>
                      {(notificationContext) => {
                        return (
                          <AuthContext.Consumer>
                            {(authContext: AuthContextProps) => {
                              return (
                                <Routes
                                  authContext={authContext}
                                  appContext={appContext}
                                  notificationContext={notificationContext}
                                />
                              )
                            }}
                          </AuthContext.Consumer>
                        )
                      }}
                    </NotificationContext.Consumer>
                  )
                }}
              </AppContext.Consumer>
            </BrowserRouter>
          </AuthProvider>
        </NotificationProvider>
      </AppProvider>
    </div>
  )
}

export default App
