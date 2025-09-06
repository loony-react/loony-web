import { extractImage } from "loony-utils"

export const Image = ({
  baseUrl,
  images,
  size,
}: {
  baseUrl: string
  images: any
  size: number
}) => {
  const image = extractImage(images)
  const newImage =
    image && image.name ? `${baseUrl}/${size || "340"}/${image.name}` : null

  if (!newImage) return null
  return <img src={newImage} alt="" width="100%" className="mb-4" />
}
