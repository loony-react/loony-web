import { createImageUrl, extractImage } from "loony-utils"
import { DocNode } from "loony-types"

const Image = ({
  mainNode,
  node,
  base_url,
}: {
  mainNode: DocNode | null
  node: DocNode
  base_url: string
}) => {
  const image = createImageUrl({
    docType: "blog",
    baseUrl: base_url,
    nodeId: !mainNode ? node.uid : mainNode.uid,
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
