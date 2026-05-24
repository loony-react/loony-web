import { createImageUrl, extractImage } from "loony-utils"
import { DocNode } from "loony-types"

const Image = ({
  docId,
  node,
  base_url,
}: {
  docId: number
  node: DocNode
  base_url: string
}) => {
  const image = createImageUrl({
    docType: "book",
    baseUrl: base_url,
    nodeId: docId,
    image: extractImage(node.images),
    size: 720,
  })

  if (!image) return null
  return (
    <img
      src={image}
      alt={node.title ?? ""}
      className="w-full h-full object-cover mb-4"
    />
  )
}

export default Image
