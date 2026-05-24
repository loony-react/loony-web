import { useRef, useState } from "react"
import { apiHttpClient } from "loony-api"
import Cropper, { Area } from "react-easy-crop"
import type {
  AfterImageSelect,
  CropImageMetadata,
  EditImageComponentProps,
  User,
  UploadImageState,
} from "loony-types"
import { MdImage, MdOutlineClear, MdUpload } from "react-icons/md"

export default function UploadImage({
  baseUrl,
  user,
  setFormImages,
}: {
  baseUrl: string
  user: User | null | undefined
  setFormImages: (data: UploadImageState[]) => void
}) {
  const [afterImageSelect, setAfterImageSelect] = useState<AfterImageSelect>({
    image: null,
    width: null,
    height: null,
    hasImage: false,
  })
  const [afterTmpImageUpload, setAfterTmpImageUpload] = useState("")
  const [imageEdit, setImageEdit] = useState<null | string>(null)
  const [cropImageMetadata, setCropImageMetadata] = useState<CropImageMetadata>(
    {
      width: null,
      height: null,
      x: null,
      y: null,
    },
  )

  const onSelectImage: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile =
      event.target.files &&
      event.target.files.length > 0 &&
      event.target.files[0]
    if (!selectedFile) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = function () {
        const width = img.naturalWidth
        const height = img.naturalHeight
        if (width > height && width <= 1420) {
          return
        }
        if (height > width && height <= 1420) {
          return
        }
        setAfterImageSelect({
          hasImage: true,
          image: selectedFile,
          width,
          height,
        })
        setImageEdit(URL.createObjectURL(selectedFile))
      }
      if (e.target?.result && typeof e.target.result === "string") {
        img.src = e.target.result
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const uploadImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append(
      "metadata",
      JSON.stringify({
        oriImgMd: afterImageSelect,
        cropImgMd: cropImageMetadata,
      }),
    )
    formData.append("file", afterImageSelect.image as File)

    apiHttpClient
      .post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }: { data: { name: string } }) => {
        setAfterTmpImageUpload(data.name)
        setImageEdit("")
        setFormImages([data])
      })
  }

  return (
    <div className="my-4">
      {!afterTmpImageUpload && imageEdit ? (
        <EditImageComponent
          uploadImage={uploadImage}
          onSelectImage={onSelectImage}
          imageEdit={imageEdit}
          setCropImageMetadata={setCropImageMetadata}
        />
      ) : null}
      {!afterTmpImageUpload && !imageEdit ? (
        <SelectImage onSelectImage={onSelectImage} />
      ) : null}
      {afterTmpImageUpload && !imageEdit ? (
        <UploadedPreview
          src={`${baseUrl}/file/tmp/${user?.uid}/340/${afterTmpImageUpload}`}
          onClear={() => setAfterTmpImageUpload("")}
        />
      ) : null}
    </div>
  )
}

const UploadedPreview = ({
  src,
  onClear,
}: {
  src: string
  onClear: () => void
}) => (
  <div className="space-y-2 my-4">
    <label className="block text-xs font-medium text-[#9b9ba4] uppercase tracking-wide">
      Image
    </label>
    <div className="relative inline-block rounded-xl overflow-hidden border border-white/[0.08] bg-[#111111]">
      <button
        type="button"
        onClick={onClear}
        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-[#9b9ba4] hover:bg-black/80 hover:text-[#ececec] transition-all duration-150"
        aria-label="Remove image"
      >
        <MdOutlineClear size={14} />
      </button>
      <img src={src} alt="Uploaded image" className="block max-w-full" />
    </div>
  </div>
)

const EditImageComponent = (props: EditImageComponentProps) => {
  const { uploadImage, onSelectImage, imageEdit, setCropImageMetadata } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState({ width: 4, height: 3 })

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCropImageMetadata(croppedAreaPixels)
  }

  const activeRatio = `${aspectRatio.width}/${aspectRatio.height}`
  const ratios = [
    { label: "4 / 3", width: 4, height: 3 },
    { label: "9 / 16", width: 9, height: 16 },
    { label: "16 / 9", width: 16, height: 9 },
    { label: "1 / 1", width: 1, height: 1 },
  ]

  return (
    <div className="space-y-2 my-4">
      <label className="block text-xs font-medium text-[#9b9ba4] uppercase tracking-wide">
        Image
      </label>

      {/* Cropper canvas */}
      <div className="relative w-full rounded-xl overflow-hidden border border-white/[0.08] bg-[#111111]" style={{ minHeight: 340 }}>
        <Cropper
          image={imageEdit as string}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio.width / aspectRatio.height}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      {/* Zoom slider */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-xs text-[#6b6b76] w-10 shrink-0">Zoom</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1 h-1 appearance-none rounded-full bg-white/10 accent-[#10a37f] cursor-pointer"
        />
        <span className="text-xs text-[#6b6b76] w-8 text-right">{zoom.toFixed(1)}x</span>
      </div>

      {/* Aspect ratio pills */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-xs text-[#6b6b76] w-10 shrink-0">Ratio</span>
        <div className="flex gap-1.5">
          {ratios.map((r) => {
            const key = `${r.width}/${r.height}`
            const isActive = activeRatio === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setAspectRatio({ width: r.width, height: r.height })}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#10a37f]/15 text-[#10a37f] ring-1 ring-[#10a37f]/40"
                    : "bg-white/5 text-[#6b6b76] ring-1 ring-white/[0.06] hover:bg-white/10 hover:text-[#9b9ba4]"
                }`}
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="file"
          onChange={onSelectImage}
          className="hidden"
          ref={inputRef}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#9b9ba4] ring-1 ring-white/10 bg-transparent hover:bg-white/5 hover:text-[#ececec] transition-all duration-150 active:scale-[0.98]"
        >
          <MdImage size={16} />
          Change image
        </button>
        <button
          type="button"
          onClick={uploadImage}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#10a37f] hover:bg-[#0d8c6e] transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#10a37f]/40"
        >
          <MdUpload size={16} />
          Upload image
        </button>
      </div>
    </div>
  )
}

const SelectImage = ({
  onSelectImage,
}: {
  onSelectImage: React.ChangeEventHandler<HTMLInputElement>
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-2 my-4">
      <label className="block text-xs font-medium text-[#9b9ba4] uppercase tracking-wide">
        Image
      </label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full border border-dashed border-white/[0.12] hover:border-white/25 rounded-xl p-6 transition-colors duration-150 text-center group focus:outline-none focus:border-[#10a37f]/40"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-3 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white/8 transition-colors duration-150">
            <MdImage size={20} className="text-[#6b6b76] group-hover:text-[#9b9ba4] transition-colors duration-150" />
          </div>
          <p className="text-sm text-[#9b9ba4] mb-1">Drop your image here</p>
          <p className="text-xs text-[#6b6b76] mb-4">PNG, JPG up to 10MB</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#9b9ba4] ring-1 ring-white/10 bg-white/5 group-hover:bg-white/10 group-hover:text-[#ececec] transition-all duration-150">
            <MdUpload size={14} />
            Select image
          </span>
        </div>
      </button>
      <input
        type="file"
        onChange={onSelectImage}
        className="hidden"
        ref={inputRef}
      />
    </div>
  )
}
