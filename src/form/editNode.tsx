import React, { useEffect, useState, useContext } from "react"
import { axiosInstance } from "loony-api"
import { AuthContext } from "../context/AuthContext.tsx"
import { TextArea } from "./components/TextArea.tsx"
import type {
  EditNodeComponentProps,
  AuthContextProps,
  AppContextProps,
} from "loony-types"
import { getUrl } from "loony-utils"
import AppContext from "../context/AppContext.tsx"
import UploadImage from "./uploadImage.tsx"
import type { Auth, UploadImageState } from "loony-types"
import ViewContent from "../components/ViewContent.tsx"

export default function EditNodeComponent(props: EditNodeComponentProps) {
  const {
    state,
    FnCallback,
    onCancel,
    docIdName,
    doc_id,
    url,
    // isMobile,
    heading,
  } = props
  const { editNode, mainNode } = state
  const authContext = useContext<AuthContextProps>(AuthContext)
  const appContext = useContext<AppContextProps>(AppContext)
  const { base_url } = appContext.env

  const { user } = authContext as Auth

  const [contentType, setContentType] = useState("basic")
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formImages, setFormImages] = useState<UploadImageState[]>([])
  const [theme, setTheme] = useState(11)
  const [error, setError] = useState("")

  useEffect(() => {
    if (editNode) {
      setFormTitle(editNode.title)
      if (editNode.content.startsWith("<basic>")) {
        setFormContent(editNode.content.substring(8))
      }

      if (editNode.content.startsWith("<markdown>")) {
        setContentType("markdown")
        setFormContent(editNode.content.substring(11))
      }

      if (editNode.content.startsWith("<maths>")) {
        setContentType("maths")
        setFormContent(editNode.content.substring(8))
      }

      if (typeof editNode.images === "string") {
        const __image = JSON.parse(editNode.images)
        if (__image.length > 0) {
          setFormImages(__image)
        }
      }
      if (Array.isArray(editNode.images) && editNode.images.length > 0) {
        setFormImages(editNode.images)
      }
      if (editNode.theme) {
        setTheme(editNode.theme)
      }
    }
  }, [editNode])

  const updateNode: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!editNode || !mainNode) return
    const url__ = getUrl(editNode, mainNode, url)
    e.preventDefault()
    if (!formTitle) {
      setError("Title is required.")
      return
    }
    if (!formContent) {
      setError("Body is required.")
      return
    }
    const submitData = {
      title: formTitle,
      content: `<${contentType}>` + " " + formContent,
      uid: editNode.uid,
      doc_id,
      identity: editNode.identity ? editNode.identity : null,
      images: formImages,
      theme,
    }
    axiosInstance
      .post(url__, submitData)
      .then((res) => {
        FnCallback(res.data)
      })
      .catch(() => {
        onCloseModal()
      })
  }
  const onCloseModal = () => {
    setFormTitle("")
    setFormContent("")
    onCancel()
  }

  const imageName = docIdName === "book" ? "book" : "blog"

  if (!editNode || !mainNode) return null

  return (
    <>
      <h2>{heading}</h2>
      <hr />
      <div>
        <div>
          {error ? (
            <div style={{ color: "#ff4949", fontWeight: "bold", fontSize: 14 }}>
              {error}
            </div>
          ) : null}
          {formImages && formImages.length > 0
            ? formImages.map((image) => {
                return (
                  <img
                    key={image.name}
                    src={`${base_url}/${imageName}/${editNode.uid}/340/${image.name}`}
                    alt="tmp file upload"
                  />
                )
              })
            : null}
          <div className="form-section">
            <label>Title</label>
            <br />
            <input
              type="text"
              placeholder="Title"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value)
              }}
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={onCloseModal} className="white-bg shadow">
            Cancel
          </button>
          <button
            onClick={updateNode}
            className="black-bg shadow"
            style={{ marginLeft: 15 }}
          >
            Update
          </button>
        </div>
      </div>

      <div className="form-content">
        <ViewContent
          source={`<${contentType}>` + " " + formContent}
          contentType={contentType}
        />
      </div>
    </>
  )
}
