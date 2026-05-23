import { AuthContextProps, AuthStatus } from "loony-types"
import { useEffect } from "react"
import {
  useHomeBooks as useHomeBooksApi,
  useUserHomeBooks,
  useHomeBlogs as useHomeBlogsApi,
  useUserHomeBlogs,
} from "../../loony-api"

export const useHomeBooks = (authContext: AuthContextProps): any => {
  const { data: homeBooks, fetch: fetchHomeBooks } = useHomeBooksApi()
  const { data: userHomeBooks, fetch: fetchUserHomeBooks } = useUserHomeBooks()

  useEffect(() => {
    if (authContext && authContext.status === AuthStatus.AUTHORIZED) {
      fetchUserHomeBooks(authContext.user?.uid)
    } else if (authContext && authContext.status === AuthStatus.UNAUTHORIZED) {
      fetchHomeBooks()
    }
  }, [authContext, fetchHomeBooks, fetchUserHomeBooks])

  return homeBooks ? homeBooks : userHomeBooks
}

export const useHomeBlogs = (authContext: AuthContextProps): any => {
  const { data: homeBlogs, fetch: fetchHomeBlogs } = useHomeBlogsApi()
  const { data: userHomeBlogs, fetch: fetchUserHomeBlogs } = useUserHomeBlogs()

  useEffect(() => {
    if (authContext && authContext.status === AuthStatus.AUTHORIZED) {
      fetchUserHomeBlogs(authContext.user?.uid)
    } else if (authContext && authContext.status === AuthStatus.UNAUTHORIZED) {
      fetchHomeBlogs()
    }
  }, [authContext, authContext.status, fetchHomeBlogs, fetchUserHomeBlogs])

  return homeBlogs ? homeBlogs : userHomeBlogs
}

export const useUserBlogs = (user_id: number): null => {
  const { data: userBlogs, fetch: fetchUserHomeBlogs } = useUserHomeBlogs()

  useEffect(() => {
    if (user_id) {
      fetchUserHomeBlogs(user_id)
    }
  }, [fetchUserHomeBlogs, user_id])

  return userBlogs
}

export const useUserBooks = (user_id: number): null => {
  const { data: userBooks, fetch: fetchUserHomeBooks } = useUserHomeBooks()

  useEffect(() => {
    if (user_id) {
      fetchUserHomeBooks(user_id)
    }
  }, [user_id, fetchUserHomeBooks])

  return userBooks
}
