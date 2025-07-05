import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { extractImage } from "loony-utils"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { getBlogNodes } from "loony-utils"
import { AppRouteProps, ReadBlogState, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import NodeInfo from "../../components/NodeInfo.tsx"
import Nav from "../../nav/blog/index.tsx"
import RightNavView from "../../nav/RightNavView.tsx"
import {
  DocsBodyContainer,
  DocsContentContainer,
  DocsNavContainer,
  DocsSettingsContainer,
} from "../../components/Containers.tsx"

const View = (props: AppRouteProps) => {
  const { isMobile, appContext, authContext } = props
  const { base_url } = appContext.env
  const { blogId } = useParams()
  const doc_id = blogId && parseInt(blogId)

  const [state, setState] = useState<ReadBlogState>({
    mainNode: null,
    childNodes: [],
    topNode: null,
    doc_id: doc_id as number,
  })
  const [status, setStatus] = useState({
    status: PageStatus.IDLE,
    error: "",
  })

  useEffect(() => {
    if (doc_id) {
      getBlogNodes(doc_id, setState, setStatus)
    }
  }, [doc_id])

  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer isMobile={isMobile} />

  const { childNodes, mainNode } = state
  if (!mainNode || !mainNode) return null

  const image = extractImage(mainNode.images)

  // return (
  //   <DocsBodyContainer>
  //     <DocsNavContainer>
  //       <Nav state={state} {...props} />
  //     </DocsNavContainer>
  //     <DocsContentContainer>
  //       <div style={{ marginBottom: 24 }}>
  //         <div className="page-heading">{mainNode.title}</div>
  //         {image && image.name ? (
  //           <div style={{ width: "100%", borderRadius: 5 }}>
  //             <img
  //               src={`${base_url}/blog/${doc_id}/720/${image.name}`}
  //               alt=""
  //               width="100%"
  //             />
  //           </div>
  //         ) : null}

  //         <NodeInfo node={mainNode} />

  //         <div style={{ marginTop: 16 }}>
  //           <ViewContent source={mainNode.content} />
  //         </div>
  //       </div>
  //       {childNodes.map((blogNode) => {
  //         const parseImage = JSON.parse(blogNode.images as string)
  //         const nodeImage = parseImage.length > 0 ? parseImage[0].name : null
  //         return (
  //           <div className="page-section" key={blogNode.uid}>
  //             <div className="section-title">{blogNode.title}</div>
  //             {nodeImage ? (
  //               <div style={{ width: "100%", borderRadius: 5 }}>
  //                 <img
  //                   src={`${base_url}/blog/${doc_id}/720/${nodeImage}`}
  //                   alt=""
  //                   width="100%"
  //                 />
  //               </div>
  //             ) : null}
  //             <div>
  //               <ViewContent source={blogNode.content} />
  //             </div>
  //           </div>
  //         )
  //       })}
  //       <div style={{ height: 50 }} />
  //     </DocsContentContainer>
  //     {!isMobile ? (
  //       <DocsSettingsContainer>
  //         <RightNavView
  //           doc_id={doc_id as number}
  //           authContext={authContext}
  //           mainNode={mainNode}
  //           docType="blog"
  //         />
  //       </DocsSettingsContainer>
  //     ) : null}
  //   </DocsBodyContainer>
  // )

  return (
    <div className="w-[70%] mx-auto mt-10 flex rounded-2xl shadow-lg">
      {/* Left Navbar */}
      <div className="w-[20%] bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-semibold mb-4">Books</h2>
        <ul className="space-y-2">
          <li className={`cursor-pointer p-2 rounded-md hover:bg-gray-200`}>
            Chapter 1
          </li>
          <li className={`cursor-pointer p-2 rounded-md hover:bg-gray-200`}>
            Chapter 1
          </li>
          <li className={`cursor-pointer p-2 rounded-md hover:bg-gray-200`}>
            Chapter 1
          </li>
          <li className={`cursor-pointer p-2 rounded-md hover:bg-gray-200`}>
            Chapter 1
          </li>
          <li className={`cursor-pointer p-2 rounded-md hover:bg-gray-200`}>
            Chapter 1
          </li>
        </ul>
      </div>

      {/* Markdown Body */}
      <div className="w-[60%] p-6 overflow-auto prose">
        <ViewContent source={mainNode.content} />
        {childNodes.map((node, id) => {
          return <ViewContent key={id} source={node.content} />
        })}
      </div>
    </div>
  )
}

export default View
