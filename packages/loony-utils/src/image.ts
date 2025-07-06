type ImageRes = {
  name: string
}

export const extractImage = (
  images: ImageRes[] | string | null | undefined,
): ImageRes | null => {
  if (!images) return null

  if (typeof images === "object" && images.length > 0) {
    return images[0]
  }

  let parsedImage = null
  if (typeof images === "string") {
    const image = images && JSON.parse(images)
    if (image && Array.isArray(image) && image.length > 0) {
      parsedImage = image[0]
    }
  }

  return parsedImage
}

export const createImageUrl = ({
  baseUrl,
  image,
  size,
  docType,
  nodeId,
}: {
  baseUrl: string
  image: { name: string } | null
  size: number
  docType: string
  nodeId?: number
}) => {
  return image && image.name
    ? `${baseUrl}/${docType}/${nodeId}/${size || "340"}/${image.name}`
    : null
}

export const createTmpImageUrl = ({
  baseUrl,
  image,
  size,
  userId,
}: {
  baseUrl: string
  image: { name: string } | null
  size: number
  docType: string
  userId?: number
}) => {
  return image && image.name
    ? `${baseUrl}/tmp/${userId}/${size || "340"}/${image.name}`
    : null
}
