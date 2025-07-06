/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AppContext } from "../context/AppContext.tsx"
import UploadImage from "./uploadImage.tsx"
import type { Auth } from "loony-types"
import ViewContent from "../components/ViewContent.tsx"
import { createImageUrl, createTmpImageUrl, extractImage } from "loony-utils"

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
    docType,
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
  if (!user) return null

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
      <div className="mt-10 border border-gray-300 p-12 rounded-md">
        <RenderImage
          formImages={formImages}
          nodeImages={null}
          docType={docType}
          baseUrl={base_url}
          node={null}
          userId={user.uid}
        />
        <h2 className="text-4xl font-semibold border-b border-gray-300 mb-8 pb-2">
          {formTitle}
        </h2>
        <ViewContent
          source={`<${contentType}>` + " " + formContent}
          contentType={contentType}
        />
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
    </>
  )
}

const RenderImage = ({
  formImages,
  nodeImages,
  docType,
  baseUrl,
  node,
  userId,
}: any) => {
  if (formImages) {
    console.log(formImages, "formImages")
    const image = createTmpImageUrl({
      docType,
      baseUrl,
      userId,
      image: extractImage(formImages),
      size: 720,
    })
    if (!image) return null
    return <img src={image} alt="Uploaded file" />
  } else if (nodeImages) {
    console.log(nodeImages, "nodeImages")
    const image = createImageUrl({
      docType,
      baseUrl,
      nodeId: node.uid,
      image: extractImage(nodeImages),
      size: 720,
    })
    if (!image) return null
    return <img src={image} alt="Uploaded file" />
  }

  return null
}
