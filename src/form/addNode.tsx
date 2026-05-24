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
import { MdArrowForward, MdArrowBack, MdImage } from "react-icons/md"

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

  const [step, setStep] = useState<"image" | "details">("image")
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

  const previewImage: string | false =
    formImages.length > 0
      ? (createTmpImageUrl({
          docType,
          baseUrl: base_url,
          userId: user.uid,
          image: extractImage(formImages),
          size: 720,
        }) ?? false)
      : false

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#ececec] mb-1">{heading}</h2>
        <div className="flex items-center gap-2 mt-3">
          <StepDot active={step === "image"} done={step === "details"} label="Image" />
          <div className="h-px w-8 bg-white/10" />
          <StepDot active={step === "details"} done={false} label="Details" />
        </div>
      </div>

      {step === "image" && (
        <ImageStep
          baseUrl={base_url}
          user={user}
          formImages={formImages}
          setFormImages={setFormImages}
          onContinue={() => setStep("details")}
          onCancel={onCancel}
        />
      )}

      {step === "details" && (
        <DetailsStep
          formTitle={formTitle}
          setFormTitle={setFormTitle}
          formContent={formContent}
          setFormContent={setFormContent}
          contentType={contentType}
          setContentType={setContentType}
          theme={theme}
          setTheme={setTheme}
          error={error}
          setError={setError}
          previewImage={previewImage}
          isDark={isDark}
          onBack={() => setStep("image")}
          onSubmit={onCreateAction}
          onCancel={onCancel}
        />
      )}
    </div>
  )
}

const StepDot = ({
  active,
  done,
  label,
}: {
  active: boolean
  done: boolean
  label: string
}) => (
  <div className="flex items-center gap-1.5">
    <div
      className={`w-2 h-2 rounded-full transition-all duration-200 ${
        done
          ? "bg-[#10a37f]"
          : active
            ? "bg-[#10a37f] ring-2 ring-[#10a37f]/30"
            : "bg-white/10"
      }`}
    />
    <span
      className={`text-xs font-medium transition-colors duration-200 ${
        active ? "text-[#ececec]" : done ? "text-[#10a37f]" : "text-[#6b6b76]"
      }`}
    >
      {label}
    </span>
  </div>
)

const ImageStep = ({
  baseUrl,
  user,
  formImages,
  setFormImages,
  onContinue,
  onCancel,
}: {
  baseUrl: string
  user: NonNullable<Auth["user"]>
  formImages: UploadImageState[]
  setFormImages: (data: UploadImageState[]) => void
  onContinue: () => void
  onCancel: () => void
}) => {
  const hasImage = formImages.length > 0

  return (
    <div>
      <p className="text-sm text-[#9b9ba4] mb-4">
        {hasImage
          ? "Image selected. Continue to fill in the details."
          : "Add a cover image for this section — you can skip this step."}
      </p>

      <UploadImage baseUrl={baseUrl} user={user} setFormImages={setFormImages} />

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.08]">
        <BorderButton onClick={onCancel} />
        <div className="flex items-center gap-3">
          {!hasImage && (
            <button
              type="button"
              onClick={onContinue}
              className="text-sm text-[#6b6b76] hover:text-[#9b9ba4] transition-colors duration-150"
            >
              Skip for now
            </button>
          )}
          <button
            type="button"
            onClick={onContinue}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
              hasImage
                ? "bg-[#10a37f] text-white hover:bg-[#0d8c6e] focus:ring-2 focus:ring-[#10a37f]/40"
                : "bg-white/5 text-[#9b9ba4] ring-1 ring-white/10 hover:bg-white/10"
            }`}
          >
            {hasImage ? (
              <>
                <MdImage size={16} />
                Continue with image
              </>
            ) : (
              <>
                Continue
                <MdArrowForward size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const DetailsStep = ({
  formTitle,
  setFormTitle,
  formContent,
  setFormContent,
  contentType,
  setContentType,
  theme,
  setTheme,
  error,
  setError,
  previewImage,
  isDark,
  onBack,
  onSubmit,
  onCancel,
}: {
  formTitle: string
  setFormTitle: (v: string) => void
  formContent: string
  setFormContent: (v: string) => void
  contentType: string
  setContentType: (v: string) => void
  theme: number
  setTheme: (v: number) => void
  error: string
  setError: (v: string) => void
  previewImage: string | false
  isDark: boolean
  onBack: () => void
  onSubmit: () => void
  onCancel: () => void
}) => (
  <div>
    {previewImage && (
      <div className="mb-4 relative rounded-xl overflow-hidden border border-white/[0.08]">
        <img src={previewImage} alt="Cover" className="w-full object-cover max-h-48" />
        <button
          type="button"
          onClick={onBack}
          className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-black/60 border border-white/10 text-[#9b9ba4] hover:text-[#ececec] hover:bg-black/80 transition-all duration-150"
        >
          <MdImage size={13} />
          Change
        </button>
      </div>
    )}
    {!previewImage && (
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-[#6b6b76] hover:text-[#9b9ba4] mb-4 transition-colors duration-150"
      >
        <MdImage size={14} />
        Add cover image
      </button>
    )}

    {error && (
      <p className="text-sm text-red-400 font-medium mb-3">{error}</p>
    )}

    <div className="space-y-4 mb-6">
      <Input
        type="text"
        name="title"
        value={formTitle}
        onChange={(e) => {
          setFormTitle(e.target.value)
          if (error) setError("")
        }}
        placeholder="Title"
      />
      <TextArea
        formContent={formContent}
        setFormContent={setFormContent}
        theme={theme}
        setTheme={setTheme}
        setContentType={setContentType}
        contentType={contentType}
      />
    </div>

    <div className="mt-10 border border-white/[0.08] bg-[#111111] p-10 rounded-xl">
      <RenderImage previewImage={previewImage} />
      <h2 className="text-3xl font-semibold border-b border-white/[0.08] text-[#ececec] mb-8 pb-2">
        {formTitle}
      </h2>
      <ViewContent
        source={`<${contentType}>` + " " + formContent}
        contentType={contentType}
        isDark={isDark}
      />
    </div>

    <div className="flex items-center justify-between my-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-[#6b6b76] hover:text-[#9b9ba4] transition-colors duration-150"
      >
        <MdArrowBack size={16} />
        Back
      </button>
      <div className="flex items-center gap-3">
        <BorderButton onClick={onCancel} />
        <SubmitButton onClick={onSubmit} />
      </div>
    </div>
  </div>
)

const RenderImage = ({ previewImage }: { previewImage: string | false }) => {
  if (!previewImage) return null
  return <img src={previewImage} alt="Cover" className="mb-4 rounded-lg" />
}

// kept for use in editNode where existing node images are needed
export const RenderNodeImage = ({
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
  if (formImages && formImages.length > 0) {
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
