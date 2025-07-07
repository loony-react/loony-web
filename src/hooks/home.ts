import { AuthContextProps, AuthStatus } from "loony-types"
import { useEffect, useState } from "react"
import { DocNode } from "loony-types"
import { axiosInstance } from "loony-api"

export const useHomeBooks = (
  authContext: AuthContextProps,
): [DocNode[] | null] => {
  const [books, setBooks] = useState<DocNode[] | null>(null)

  useEffect(() => {
    if (authContext.status === AuthStatus.AUTHORIZED && authContext.user) {
      ;(async () => {
        const { user } = authContext
        const url = `/book/get/${user?.uid}/get_users_book`
        const { data } = await axiosInstance.get(url)
        if (data.length > 0) {
          setBooks(data)
        }
      })()
    } else {
      ;(async () => {
        const url = `/book/get/home_books`
        const { data } = await axiosInstance.get(url)
        if (data.length > 0) {
          setBooks(data)
        }
      })()
    }
  }, [authContext.status])

  return [books]
}

export const useHomeBlogs = (
  authContext: AuthContextProps,
): [DocNode[] | null] => {
  const [blogs, setBlogs] = useState<DocNode[] | null>(null)

  useEffect(() => {
    if (authContext.status === AuthStatus.AUTHORIZED && authContext.user) {
      ;(async () => {
        const { user } = authContext
        const url = `/blog/get/${user?.uid}/get_users_blog`
        const { data } = await axiosInstance.get(url)
        if (data.length > 0) {
          setBlogs(data)
        }
      })()
    } else {
      ;(async () => {
        const url = `/blog/get/home_blogs`
        const { data } = await axiosInstance.get(url)
        if (data.length > 0) {
          setBlogs(data)
        }
      })()
    }
  }, [authContext.status])

  return [blogs]
}

export const useUserBlogs = (user_id: number): [DocNode[] | null] => {
  const [docs, setDocs] = useState<DocNode[] | null>(null)

  useEffect(() => {
    if (user_id) {
      axiosInstance
        .get(`/blog/get/${user_id}/user_blogs`)
        .then(({ data }) => {
          setDocs(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [user_id])

  return [docs]
}

export const useUserBooks = (user_id: number): [DocNode[] | null] => {
  const [docs, setDocs] = useState<DocNode[] | null>(null)

  useEffect(() => {
    if (user_id) {
      axiosInstance
        .get(`/book/get/${user_id}/user_books`)
        .then(({ data }) => {
          setDocs(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [user_id])

  return [docs]
}
