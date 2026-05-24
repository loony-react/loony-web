import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext.tsx"
import { TextArea } from "./components/TextArea.tsx"
import type {
  AuthContextProps,
  AppContextProps,
  AddNodeComponentProps,
  UploadImageState,
  DocNode,
  Auth,
} from "loony-types"
import { AppContext } from "../context/AppContext.tsx"
import UploadImage from "./uploadImage.tsx"
import ViewContent from "../components/ViewContent.tsx"
import { createImageUrl, createTmpImageUrl, extractImage } from "loony-utils"
import { BorderButton, SubmitButton, Input } from "loony-ui"
import { apiHttpClient } from "loony-api"

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
  const { isDark } = appContext

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
    apiHttpClient
      .post(url, formData)
      .then(({ data }) => {
        FnCallback(data)
      })
      .catch(() => {})
  }
  if (!user) return null

  return (
    <div className="pb-24">
      <div style={{}}>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
          {heading}
        </h2>
        <div>
          {error ? (
            <div style={{ color: "#ff4949", fontWeight: "bold", fontSize: 14 }}>
              {error}
            </div>
          ) : null}
          <div className="my-4">
            <Input
              type="text"
              name="title"
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
      <div className="mt-10 border border-gray-300 dark:border-[#4d4d4d] p-12 rounded-md">
        <RenderImage
          formImages={formImages}
          nodeImages={null}
          docType={docType}
          baseUrl={base_url}
          node={null}
          userId={user.uid}
        />
        <h2 className="text-4xl dark:text-gray-200 font-semibold border-b border-gray-300 dark:border-[#4d4d4d] mb-8 pb-2">
          {formTitle}
        </h2>
        <ViewContent
          source={`<${contentType}>` + " " + formContent}
          contentType={contentType}
          isDark={isDark}
        />
      </div>

      <div className="my-4">
        <span style={{ marginRight: 12 }}>
          <SubmitButton onClick={onCreateAction} />
        </span>
        <BorderButton onClick={onCancel} />
      </div>
    </div>
  )
}

const RenderImage = ({
  formImages,
  nodeImages,
  docType,
  baseUrl,
  node,
  userId,
}: {
  formImages: UploadImageState[] | null
  nodeImages: string | null
  docType: string
  baseUrl: string
  node: DocNode | null
  userId: number
}) => {
  if (formImages) {
    const image = createTmpImageUrl({
      docType,
      baseUrl,
      userId,
      image: extractImage(formImages),
      size: 720,
    })
    if (!image) return null
    return <img src={image} alt="Uploaded file" />
  } else if (nodeImages && node) {
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
