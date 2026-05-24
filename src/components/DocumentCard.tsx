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
      className="group rounded-xl overflow-hidden bg-[var(--surface)] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 text-[var(--text-primary)]"
      onClick={() => navigate(`/view/${docType}/${node.uid}`)}
      role="article"
      aria-label={node.title}
    >
      {/* Image / thumbnail area — 16:9 */}
      <div className="aspect-video w-full bg-[var(--surface-2)] flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={node.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <h3 className="text-center text-sm font-medium px-4 text-[var(--text-secondary)] line-clamp-3">
            {node.title}
          </h3>
        )}
      </div>

      {/* Bottom info */}
      <div className="flex items-start gap-3 p-3">
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[var(--surface-2)] flex items-center justify-center">
          <User className="w-4 h-4 text-[var(--text-secondary)]" />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 leading-snug">
            {node.title}
          </h3>
          <p className="text-xs mt-1 text-[var(--text-muted)]">{timeAgo(node.created_at)}</p>
        </div>
      </div>
    </div>
  )
}
