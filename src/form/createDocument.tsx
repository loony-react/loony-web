import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { apiHttpClient } from "loony-api"
import { AuthContext } from "../context/AuthContext.tsx"
import { TextArea } from "./components/TextArea.tsx"
import ViewContent from "../components/ViewContent.tsx"
import { stopWords } from "../utils/index.tsx"
import { AppContext } from "../context/AppContext.tsx"
import type { Auth, UploadImageState } from "loony-types"
import UploadImage from "./uploadImage.tsx"
import { HR } from "../components/index.tsx"
import { createTmpImageUrl } from "loony-utils"
import { BorderButton, SubmitButton, Input } from "loony-ui"
import { MdArrowForward, MdArrowBack, MdImage } from "react-icons/md"

export default function CreateNewDocument({
  url,
  title,
  docType,
}: {
  url: string
  title: string
  isMobile: boolean
  docType: string
}) {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const appContext = useContext(AppContext)
  const { base_url } = appContext.env
  const { isDark } = appContext

  const { user } = authContext as Auth

  const [step, setStep] = useState<"image" | "details">("image")
  const [contentType, setContentType] = useState("basic")
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [tags, setTags] = useState("")
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

    const filterWords = (input: string) =>
      input
        .split(" ")
        .filter((x) => x && x !== " " && !stopWords.includes(x))
        .map((x) => x.toLowerCase())

    const allTags = filterWords(formTitle).concat(filterWords(tags))

    const submitData = {
      title: formTitle,
      content: `<${contentType}>` + " " + formContent,
      images: formImages ?? [],
      tags: allTags,
      theme,
    }

    apiHttpClient
      .post(url, submitData)
      .then(() => {
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
      .catch(() => {})
  }

  if (!user) return null

  const previewImage: string | false =
    formImages.length > 0
      ? (createTmpImageUrl({
          docType,
          baseUrl: base_url,
          userId: user.uid,
          image: formImages[0],
          size: 720,
        }) ?? false)
      : false

  return (
    <div className="w-[40%] ml-[15%]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">{title}</h2>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-3">
          <StepDot active={step === "image"} done={step === "details"} label="Image" />
          <div className="h-px w-8 bg-[var(--border)]" />
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
          onCancel={() => navigate("/", { replace: true })}
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
          tags={tags}
          setTags={setTags}
          error={error}
          setError={setError}
          previewImage={previewImage}
          isDark={isDark}
          onBack={() => setStep("image")}
          onSubmit={createDoc}
          onCancel={() => navigate("/", { replace: true })}
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
            : "bg-[var(--border)]"
      }`}
    />
    <span
      className={`text-xs font-medium transition-colors duration-200 ${
        active ? "text-[var(--text-primary)]" : done ? "text-[#10a37f]" : "text-[var(--text-muted)]"
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
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        Add a cover image for your {hasImage ? "post" : "post — you can skip this step"}.
      </p>

      <UploadImage baseUrl={baseUrl} user={user} setFormImages={setFormImages} />

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
        <BorderButton onClick={onCancel} />
        <div className="flex items-center gap-3">
          {!hasImage && (
            <button
              type="button"
              onClick={onContinue}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-150"
            >
              Skip for now
            </button>
          )}
          <button
            type="button"
            onClick={onContinue}
            disabled={false}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
              hasImage
                ? "bg-[#10a37f] text-white hover:bg-[#0d8c6e] focus:ring-2 focus:ring-[#10a37f]/40"
                : "bg-[var(--hover-bg)] text-[var(--text-secondary)] ring-1 ring-[var(--ring-color)] hover:bg-[var(--surface-2)]"
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
  tags,
  setTags,
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
  tags: string
  setTags: (v: string) => void
  error: string
  setError: (v: string) => void
  previewImage: string | false
  isDark: boolean
  onBack: () => void
  onSubmit: () => void
  onCancel: () => void
}) => (
  <div>
    {/* Cover image thumbnail + change link */}
    {previewImage && (
      <div className="mb-4 relative rounded-xl overflow-hidden border border-[var(--border)]">
        <img src={previewImage} alt="Cover" className="w-full object-cover max-h-48" />
        <button
          type="button"
          onClick={onBack}
          className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-black/60 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/80 transition-all duration-150"
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
        className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] mb-4 transition-colors duration-150"
      >
        <MdImage size={14} />
        Add cover image
      </button>
    )}

    {error && (
      <p className="text-sm text-red-400 font-medium mb-3">{error}</p>
    )}

    <div className="mb-8 space-y-4">
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

      <Input
        name="tags"
        type="text"
        placeholder="Keywords"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
    </div>

    {HR}

    <div className="mt-10 border border-[var(--border)] bg-[var(--surface-nav)] p-10 rounded-xl mb-8">
      {previewImage && (
        <img key={previewImage} src={previewImage} alt="preview" className="mb-4" />
      )}
      <h2 className="text-3xl font-semibold border-b border-[var(--border)] text-[var(--text-primary)] mb-8 mt-4">
        {formTitle}
      </h2>
      <ViewContent
        source={`<${contentType}>` + " " + formContent}
        contentType={contentType}
        isDark={isDark}
      />
    </div>

    <div className="flex items-center justify-between pb-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-150"
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
