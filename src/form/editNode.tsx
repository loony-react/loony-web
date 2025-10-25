/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useContext } from "react"
import { apiHttpClient } from "loony-api"
import { AuthContext } from "../context/AuthContext.tsx"
import { TextArea } from "./components/TextArea.tsx"
import type {
  EditNodeComponentProps,
  AuthContextProps,
  AppContextProps,
} from "loony-types"
import {
  createImageUrl,
  createTmpImageUrl,
  extractImage,
  getUrl,
} from "loony-utils"
import { AppContext } from "../context/AppContext.tsx"
import UploadImage from "./uploadImage.tsx"
import type { Auth, UploadImageState } from "loony-types"
import ViewContent from "../components/ViewContent.tsx"
import { BorderButton, Input, SubmitButton } from "loony-ui"

export default function EditNodeComponent(props: EditNodeComponentProps) {
  const { state, FnCallback, onCancel, docType, doc_id, url, heading } = props
  const { editNode, mainNode } = state
  const authContext = useContext<AuthContextProps>(AuthContext)
  const appContext = useContext<AppContextProps>(AppContext)
  const { base_url } = appContext.env
  const { isDark } = appContext

  const { user } = authContext as Auth

  const [contentType, setContentType] = useState("basic")
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formImages, setFormImages] = useState<UploadImageState[] | null>(null)
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
      images: formImages || [],
      theme,
    }
    apiHttpClient
      .post(url__, submitData)
      .then((res) => {
        FnCallback(res.data)
      })
      .catch(() => {
        onClickCancel()
      })
  }
  const onClickCancel = () => {
    setFormTitle("")
    setFormContent("")
    onCancel()
  }

  if (!editNode || !mainNode || !user) return null

  return (
    <div className="pb-24">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
        {heading}
      </h2>
      <div>
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
              placeholder="Title"
              value={formTitle}
              onChange={(e: any) => {
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
      </div>

      <div className="mt-10 border border-gray-300 dark:border-[#4d4d4d] p-12 rounded-md">
        <RenderImage
          formImages={formImages}
          nodeImages={editNode.images}
          docType={docType}
          baseUrl={base_url}
          node={editNode}
          userId={user.uid}
        />
        <h2 className="text-4xl dark:text-white font-semibold mb-8 py-4">
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
          <SubmitButton onClick={updateNode} />
        </span>
        <BorderButton onClick={onClickCancel} />
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
}: any) => {
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
