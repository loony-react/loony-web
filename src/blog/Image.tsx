// import { useNavigate, useParams } from "react-router"
import { createImageUrl, extractImage } from "loony-utils"
// import { AppRouteProps, PageStatus } from "loony-types"
// import { useGetBlogNodes } from "loony-api"
// import { Container } from "loony-ui"

const Image = ({
  mainNode,
  node,
  base_url,
}: {
  mainNode: any
  node: any
  base_url: string
}) => {
  // console.log(node)
  const image = createImageUrl({
    docType: "blog",
    baseUrl: base_url,
    nodeId: !mainNode ? node.uid : mainNode.uid,
    image: extractImage(node.images),
    size: 720,
  })

  if (!image) return null
  console.log(image)
  return (
    <img
      src={image}
      alt="Video Thumbnail"
      className="w-full h-full object-cover mb-4"
    />
  )
}

export default Image
