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

  const uploadImage = (e: any) => {
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
    <div style={{ marginTop: 5, marginBottom: 5 }}>
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
        <div
          style={{
            padding: 5,
            border: "1px solid #ccc",
            borderRadius: 3,
            display: "inline-block",
          }}
        >
          <div>
            <div
              style={{
                float: "right",
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 3,
              }}
              onClick={() => {
                setAfterTmpImageUpload("")
              }}
            >
              <MdOutlineClear size={16} color="#2d2d2d" />
            </div>
          </div>
          <img
            src={`${baseUrl}/file/tmp/${user?.uid}/340/${afterTmpImageUpload}`}
            alt="tmp file upload"
          />
        </div>
      ) : null}
    </div>
  )
}

const EditImageComponent = (props: EditImageComponentProps) => {
  const { uploadImage, onSelectImage, imageEdit, setCropImageMetadata } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState({
    width: 4,
    height: 3,
  })

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCropImageMetadata(croppedAreaPixels)
  }
  const handleButtonClick = () => {
    inputRef.current?.click() // Triggers the hidden input
  }

  return (
    <div className="form-section">
      <label>Image</label>
      <div className="">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", width: "100%", minHeight: 350 }}>
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
          <label>Choose another file</label>
          <br />
          <div className="flex-row">
            <button
              onClick={() => {
                setAspectRatio({ width: 4, height: 3 })
              }}
            >
              4/3
            </button>
            <button
              onClick={() => {
                setAspectRatio({ width: 9, height: 16 })
              }}
            >
              9/16
            </button>
          </div>
          <div className="flex flex-row">
            <input
              type="file"
              onChange={onSelectImage}
              className="hidden"
              ref={inputRef}
            />
            <button
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 mt-4 border dark:border-[#636363] text-white mr-4"
              onClick={handleButtonClick}
            >
              <MdImage size={21} color="#636363" />
              Select other image
            </button>
            <button
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 mt-4 border dark:border-[#636363] text-white"
              onClick={uploadImage}
            >
              <MdUpload size={21} color="#636363" />
              Upload image
            </button>
          </div>
        </div>
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
  const handleButtonClick = () => {
    inputRef.current?.click() // Triggers the hidden input
  }

  return (
    <div className="form-section space-y-2">
      <label className="block text-gray-700 dark:text-white font-medium">
        Image
      </label>
      <div className="border border-dashed dark:border-[#636363] p-6 rounded-lg">
        <div className="flex flex-col items-center justify-center text-center text-gray-600 dark:text-[#232323]">
          <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border dark:border-[#636363]">
            <MdImage size={24} color="#636363" />
          </div>
          <label className="dark:text-white">Drop your image here</label>
          <input
            type="file"
            onChange={onSelectImage}
            className="hidden"
            ref={inputRef}
          />
          <button
            data-slot="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 mt-4 border border-gray-400 dark:border-[#636363] dark:text-white"
            onClick={handleButtonClick}
          >
            <MdUpload size={21} color="#636363" />
            Select image
          </button>
        </div>
      </div>
    </div>
  )
}
