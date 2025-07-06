import React, { lazy } from "react"
import { createRoot } from "react-dom/client"
import "./App.css"

const App = lazy(() => import("./App.tsx"))

const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
