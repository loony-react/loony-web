import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { axiosInstance } from "loony-api"
import { AuthContext } from "../context/AuthContext.tsx"
import { TextArea } from "./components/TextArea.tsx"
import ViewContent from "../components/ViewContent.tsx"
import { stopWords } from "../utils/index.tsx"

import "react-easy-crop/react-easy-crop.css"
import AppContext from "../context/AppContext.tsx"
import type { Auth, UploadImageState } from "loony-types"
import UploadImage from "./uploadImage.tsx"

export default function CreateNewDocument({
  url,
  title,
  isMobile,
}: {
  url: string
  title: string
  isMobile: boolean
}) {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const appContext = useContext(AppContext)
  const { base_url } = appContext.env

  const { user } = authContext as Auth

  const [contentType, setContentType] = useState("basic")
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [tags, setTags] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [theme, setTheme] = useState(11)
  const [error, setError] = useState("")
  const [formImages, setFormImages] = useState<UploadImageState[]>([])

  const createDoc = () => {
    if (!formTitle) {
      setError("Title is required")
      return
    }
    if (!formContent) {
      setError("Body is required")
      return
    }
    setSubmitting(true)

    const filterTitle = formTitle
      .split(" ")
      .filter((x) => {
        if (stopWords.includes(x)) {
          return false
        }
        if (x === " " || x === "") {
          return false
        }
        return true
      })
      .map((x) => x.toLowerCase())

    const filterTags = tags
      .split(" ")
      .filter((x) => {
        if (stopWords.includes(x)) {
          return false
        }
        if (x === " " || x === "") {
          return false
        }
        return true
      })
      .map((x) => x.toLowerCase())

    const allTags = filterTitle.concat(filterTags)

    const submitData = {
      title: formTitle,
      content: `<${contentType}>` + " " + formContent,
      images: formImages ? formImages : [],
      tags: allTags,
      theme,
    }

    axiosInstance
      .post(url, submitData)
      .then(() => {
        setSubmitting(false)
        appContext.setAppContext((prevState) => ({
          ...prevState,
          alert: {
            status: "success",
            title: "Created",
            body: "Created successfully",
          },
        }))
        navigate("/", { replace: true })
      })
      .catch(() => {
        setSubmitting(false)
      })
  }

  const routeTo = () => {
    navigate("/", { replace: true })
  }

  return (
    <div className="w-[40%] ml-[15%]">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">{title}</h2>
        <hr className="border-t border-gray-300 mb-4" />

        {error ? (
          <div
            style={{
              color: "#ff4949",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {error}
          </div>
        ) : null}
      </div>
      <div style={{}}>
        <div style={{}}>
          <div className="my-4">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value)
              }}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <TextArea
            formContent={formContent}
            setFormContent={setFormContent}
            theme={theme}
            setTheme={setTheme}
            setContentType={setContentType}
            contentType={contentType}
          />
          {/* <UploadImage
            baseUrl={base_url}
            user={user}
            setFormImages={setFormImages}
          /> */}
          <div className="my-4">
            <input
              type="text"
              placeholder="Keywords"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="flex-row" style={{ justifyContent: "flex-end" }}>
          <button
            className="w-100 bg-zinc-700 text-white py-2 rounded-md hover:bg-zinc-800 transition"
            onClick={createDoc}
            disabled={submitting}
            style={{ marginRight: 10 }}
          >
            {submitting ? "Creating..." : "Create"}
          </button>
          <button
            className="w-100 bg-neutral-200 text-zinc py-2 rounded-md hover:bg-neutral-300 transition"
            data-id="/"
            onClick={routeTo}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <ViewContent
          source={`<${contentType}>` + " " + formContent}
          contentType={contentType}
        />
      </div>
    </div>
  )
}
