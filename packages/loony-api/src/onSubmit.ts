import {
  AuthContextProps,
  AuthStatus,
  NotificationContextProps,
  NotificationState,
} from "loony-types"
import { axiosInstance, handleError } from "./index"
import { NavigateFunction } from "react-router"

export const onLogin = ({
  formData,
  setFormError,
  authContext,
  notificationContext,
  navigate,
}: {
  formData: { username: string; password: string }
  setFormError: React.Dispatch<
    React.SetStateAction<{ label: string; message: string }>
  >
  authContext: AuthContextProps
  notificationContext: NotificationContextProps
  navigate: NavigateFunction
}) => {
  if (!formData.username) {
    setFormError({
      label: "username",
      message: "Email is required.",
    })
    return
  }
  if (!formData.password) {
    setFormError({
      label: "password",
      message: "Password is required.",
    })
    return
  }

  axiosInstance
    .post("/auth/login", {
      email: formData.username,
      password: formData.password,
    })
    .then(({ data }) => {
      authContext.setAuthContext({
        status: AuthStatus.AUTHORIZED,
        user: data,
      })
      navigate("/", {})
    })
    .catch((err) => {
      const __err = handleError(err)
      notificationContext.setNotificationContext(
        (prevState: NotificationState) => ({
          ...prevState,
          alert: {
            title: "Error",
            content: __err,
            status: "error",
          },
        }),
      )
    })
}

export const onSendResetPassword = ({
  formData,
  setFormError,
  authContext,
  notificationContext,
  navigate,
}: {
  formData: { email: string; password: string; confirmPassword: string }
  setFormError: React.Dispatch<
    React.SetStateAction<{ label: string; message: string }>
  >
  authContext: AuthContextProps
  notificationContext: NotificationContextProps
  navigate: NavigateFunction
}) => {
  if (!formData.email) {
    setFormError({
      label: "username",
      message: "Email is required.",
    })
    return
  }

  if (!formData.password) {
    setFormError({
      label: "password",
      message: "Password is required.",
    })
    return
  }

  if (!formData.confirmPassword) {
    setFormError({
      label: "confirm_password",
      message: "Confirm Password is required.",
    })
    return
  }

  if (formData.password !== formData.confirmPassword) {
    setFormError({
      label: "confirm_password",
      message: "Password does not match.",
    })
    return
  }

  axiosInstance
    .post("/reset_password", {
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
    })
    .then(() => {
      notificationContext.setNotificationContext(
        (prevState: NotificationState) => ({
          ...prevState,
          alert: {
            title: "Success",
            content:
              "A password reset link has been sent to your email address.",
            status: "success",
          },
        }),
      )
    })
    .catch((err) => {
      const __err = handleError(err)
      notificationContext.setNotificationContext(
        (prevState: NotificationState) => ({
          ...prevState,
          alert: {
            title: "Error",
            content: __err,
            status: "error",
          },
        }),
      )
    })
}

export const onSendResetPasswordEmail = ({
  formData,
  setFormError,
  authContext,
  notificationContext,
  navigate,
}: {
  formData: { email: string }
  setFormError: React.Dispatch<
    React.SetStateAction<{ label: string; message: string }>
  >
  authContext: AuthContextProps
  notificationContext: NotificationContextProps
  navigate: NavigateFunction
}) => {
  if (!formData.email) {
    setFormError({
      label: "username",
      message: "Email is required.",
    })
    return
  }

  axiosInstance
    .post("/mail", {
      to: formData.email,
      subject: "Forgot password",
    })
    .then(() => {
      notificationContext.setNotificationContext(
        (prevState: NotificationState) => ({
          ...prevState,
          alert: {
            title: "Success",
            content:
              "A password reset link has been sent to your email address.",
            status: "success",
          },
        }),
      )
    })
    .catch((err) => {
      const __err = handleError(err)
      notificationContext.setNotificationContext(
        (prevState: NotificationState) => ({
          ...prevState,
          alert: {
            title: "Error",
            content: __err,
            status: "error",
          },
        }),
      )
    })
}

export const onSignup = ({
  formData,
  // setState,
  notificationContext,
  navigate,
  setFormError,
}: {
  formData: { fname: string; lname: string; username: string; password: string }
  // setState: React.Dispatch<
  //   React.SetStateAction<{
  //     viewPassword: boolean
  //     state: number
  //   }>
  // >
  notificationContext: NotificationContextProps
  navigate: NavigateFunction
  setFormError: React.Dispatch<
    React.SetStateAction<{ label: string; message: string }>
  >
}) => {
  if (!formData.fname) {
    setFormError(() => ({
      label: "fname",
      message: "Please enter your first name.",
    }))
    return
  }
  if (!formData.username) {
    setFormError(() => ({
      label: "username",
      message: "Phone number is required.",
    }))
    return
  }
  if (!formData.password) {
    setFormError(() => ({
      label: "password",
      message: "Please enter password.",
    }))
    return
  }

  axiosInstance
    .post("/auth/signup", {
      fname: formData.fname,
      lname: formData.lname,
      email: formData.username,
      password: formData.password,
    })
    .then(() => {
      navigate("/login", {})
    })
    .catch((err) => {
      const __err = handleError(err)
      notificationContext.setNotificationContext(
        (prevState: NotificationState) => ({
          ...prevState,
          alert: {
            title: "Error",
            content: __err,
            status: "error",
          },
        }),
      )
    })
}
