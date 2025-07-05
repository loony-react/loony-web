/* eslint-disable @typescript-eslint/no-unused-vars */

import { parseImage, timeAgo } from "loony-utils"
import { NavigateFunction } from "react-router"
import { DocNode } from "loony-types"
import NodeInfo from "./NodeInfo"

const Card = ({
  node,
  navigate,
  nodeType,
  base_url,
}: {
  node: DocNode
  navigate: NavigateFunction
  nodeType: string
  base_url: string
}) => {
  const image = parseImage(node.images)
  // return (
  //   <div className="card" key={node.uid}>
  //     <div
  //       className="card-image"
  //       style={{
  //         backgroundImage:
  //           image && image.name
  //             ? `url("${base_url}/${nodeType}/${node.uid}/340/${image.name}")`
  //             : undefined,
  //         overflow: "hidden",
  //         backgroundSize: "cover",
  //         backgroundPosition: "center",
  //         borderTopLeftRadius: 3,
  //         borderTopRightRadius: 3,
  //       }}
  //       onClick={() => {
  //         navigate(`/view/${nodeType}/${node.uid}`)
  //       }}
  //     />
  //     <div className="card-body">
  //       <div
  //         className="card-title cursor"
  //         onClick={() => {
  //           navigate(`/view/${nodeType}/${node.uid}`)
  //         }}
  //       >
  //         {node.title}
  //       </div>
  //       <NodeInfo node={node} />
  //     </div>
  //   </div>
  // )
  return (
    <div className="max-w-sm w-full rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="relative pb-[56.25%]">
        <img
          className="absolute h-full w-full object-cover"
          src="https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg"
          alt="Video thumbnail"
        />
      </div>

      <div className="flex p-4">
        <img
          className="h-10 w-10 rounded-full mr-4"
          src="https://via.placeholder.com/40"
          alt="Channel avatar"
        />

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            This is a sample video title that might go over two lines
          </h3>
          <p className="text-sm text-gray-600 mt-1">Channel Name</p>
          <p className="text-sm text-gray-500">1.2M views • 2 days ago</p>
        </div>
      </div>
    </div>
  )
}

export default Card
