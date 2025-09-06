import { useEffect, useState } from "react"
import { login } from "./api"
import { handleError } from "./query"

export const useLogin = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState({
    label: "",
    message: "",
  })

  const onLogin = (formData, onSuccess, onError) => {
    if (!formData.username) {
      setError({
        label: "username",
        message: "Email is required.",
      })
      return
    }
    if (!formData.password) {
      setError({
        label: "password",
        message: "Password is required.",
      })
      return
    }

    login(formData)
      .then((res) => {
        onSuccess(res.data)
      })
      .catch((err) => {
        const appError = handleError(err)
        onError(appError)
      })
  }

  return { onLogin, user, error }
}
