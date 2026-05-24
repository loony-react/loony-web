import { useNavigate, useParams } from "react-router"
import PageLoadingContainer from "../../components/PageLoadingContainer.tsx"
import { useBlogNodes } from "loony-utils"
import { AppRouteProps, PageStatus } from "loony-types"
import ViewContent from "../../components/ViewContent.tsx"
import { RightNavEdit } from "../../components/RightNav.tsx"
import { useGetBlogNodes } from "loony-api"

import Image from "../Image.tsx"

const View = (props: AppRouteProps) => {
  const { authContext, appContext } = props
  const { isDark } = appContext
  const { base_url } = appContext.env
  const { blogId } = useParams()
  const navigate = useNavigate()
  const { user } = authContext
  const doc_id = blogId && parseInt(blogId)

  const { data } = useGetBlogNodes(doc_id as number)
  const { state, status } = useBlogNodes(data, doc_id as number)

  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  const { childNodes, mainNode } = state
  if (!mainNode || !mainNode || !user) return null

  if (status.status !== PageStatus.VIEW_PAGE)
    return <PageLoadingContainer title="" />

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-14">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-24">
          <Image mainNode={mainNode} node={mainNode} base_url={base_url} />
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-6 mb-4 leading-tight">
            {mainNode.title}
          </h1>
          <ViewContent source={mainNode.content} isDark={isDark} />

          {childNodes.map((node, id) => {
            return (
              <div key={id} className="mt-10">
                <Image mainNode={mainNode} node={node} base_url={base_url} />
                <h2 className="text-xl font-semibold text-[var(--text-primary)] my-4 pb-3 border-b border-[var(--border)]">
                  {node.title}
                </h2>
                <ViewContent source={node.content} isDark={isDark} />
              </div>
            )
          })}
        </div>

      <div className="fixed bottom-0 right-16 mb-4 mx-auto">
        <RightNavEdit
          doc_id={doc_id as number}
          authContext={authContext}
          mainNode={mainNode}
          docType="blog"
          navigate={navigate}
        />
      </div>
    </div>
  )
}

export default View
