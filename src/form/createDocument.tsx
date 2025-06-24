import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { axiosInstance } from "loony-api"
import { AuthContext } from "../context/AuthContext.tsx"
import { TextArea } from "./components/TextArea.tsx"
// import MarkdownPreview from "@uiw/react-markdown-preview"
import ViewContent from "../components/ViewContent.tsx"
import { DesktopLeftNavbar } from "../common/index.tsx"
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
    <div className="form-container flex-row">
      <DesktopLeftNavbar isMobile={isMobile} />

      <div className="con-sm-100 con-xxl-5 mar-hor-1">
        <h2>{title}</h2>
        <hr />
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
        <div style={{}}>
          <div style={{}}>
            <div className="form-section">
              <input
                type="text"
                value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value)
                }}
                placeholder="Title"
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
            <UploadImage
              baseUrl={base_url}
              user={user}
              setFormImages={setFormImages}
            />
            <div className="form-section">
              <input
                type="text"
                placeholder="Keywords"
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="flex-row" style={{ justifyContent: "flex-end" }}>
            <button
              className="black-bg shadow"
              onClick={createDoc}
              disabled={submitting}
              style={{ marginRight: 10 }}
            >
              {submitting ? "Creating..." : "Create"}
            </button>
            <button
              className="white-bg shadow"
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
    </div>
  )
}
