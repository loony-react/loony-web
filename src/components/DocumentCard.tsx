import { DocNode } from "loony-types"
import { createImageUrl, extractImage, timeAgo } from "loony-utils"
import { User } from "lucide-react"
import { NavigateFunction } from "react-router"

export default function Card({
  navigate,
  base_url,
  docType,
  node,
}: {
  navigate: NavigateFunction
  base_url: string
  docType: string
  node: DocNode
}) {
  const image = createImageUrl({
    baseUrl: base_url,
    nodeId: node.uid,
    image: extractImage(node.images),
    docType,
    size: 340,
  })

  return (
    <div
      className="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer text-neutral-900 dark:text-neutral-300"
      onClick={() => navigate(`/view/${docType}/${node.uid}`)}
      role="article"
      aria-label={node.title}
    >
      <div className="relative w-full h-44 bg-gray-100 dark:bg-cardTop flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={node.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <h3 className="text-center text-sm font-semibold px-4">
            {node.title}
          </h3>
        )}
      </div>
      <div className="flex p-4 bg-neutral-100 dark:bg-cardBot">
        <div className="w-10 h-10 mr-2 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-neutral-900" />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2">{node.title}</h3>
          <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">{timeAgo(node.created_at)}</p>
        </div>
      </div>
    </div>
  )
}
