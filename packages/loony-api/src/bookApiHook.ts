import { useEffect, useState } from "react"
import { getBookNav } from "./api"

export const useGetBookNav = (doc_id) => {
  const [data, setData] = useState(null)
  const [err, setError] = useState(null)
  useEffect(() => {
    getBookNav(doc_id)
      .then(({ data }) => {
        setData(data)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
  }, [doc_id])

  return { data, err }
}
