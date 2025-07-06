import { useState, useContext } from "react"
import { axiosInstance } from "loony-api"
import { AuthContext } from "../context/AuthContext.tsx"
import { TextArea } from "./components/TextArea.tsx"
import "react-easy-crop/react-easy-crop.css"
import type {
  AuthContextProps,
  AppContextProps,
  AddNodeComponentProps,
  UploadImageState,
} from "loony-types"
import AppContext from "../context/AppContext.tsx"
import UploadImage from "./uploadImage.tsx"
import type { Auth } from "loony-types"
import ViewContent from "../components/ViewContent.tsx"

export default function AddNodeComponent(props: AddNodeComponentProps) {
  const {
    url,
    heading,
    doc_id,
    FnCallback,
    parent_id,
    identity,
    page_id,
    onCancel,
    parent_identity,
    // isMobile,
  } = props

  const authContext = useContext<AuthContextProps>(AuthContext)
  const appContext = useContext<AppContextProps>(AppContext)
  const { base_url } = appContext.env

  const { user } = authContext as Auth

  const [contentType, setContentType] = useState("basic")
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [theme, setTheme] = useState(11)
  const [error, setError] = useState("")
  const [formImages, setFormImages] = useState<UploadImageState[]>([])
  // const [tags, setTags] = useState("")

  const onCreateAction = () => {
    if (!formTitle) {
      setError("Title is required.")
      return
    }
    if (!formContent) {
      setError("Body is required.")
      return
    }
    const formData = {
      title: formTitle,
      content: `<${contentType}>` + " " + formContent,
      images: formImages ? formImages : [],
      tags: null,
      doc_id,
      parent_id,
      identity,
      page_id,
      parent_identity,
    }
    axiosInstance
      .post(url, formData)
      .then(({ data }) => {
        FnCallback(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <div style={{}}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">{heading}</h2>
        <div>
          {error ? (
            <div style={{ color: "#ff4949", fontWeight: "bold", fontSize: 14 }}>
              {error}
            </div>
          ) : null}
          <div className="my-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          {/* <div className="form-section">
            <label>Tags</label>
            <br />
            <input
              type="text"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value)
              }}
            />
          </div> */}
        </div>
      </div>
      <div className="my-4">
        <button
          onClick={onCreateAction}
          className="w-50 bg-zinc-700 text-white py-2 rounded-md hover:bg-zinc-800 transition"
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          className="ml-4 w-50 bg-neutral-200 text-zinc py-2 rounded-md hover:bg-neutral-300 transition"
          style={{ marginRight: 10 }}
        >
          Cancel
        </button>
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
