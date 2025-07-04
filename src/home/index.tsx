import { NavigateFunction, useNavigate } from "react-router"
import { AppRouteProps, DocNode } from "loony-types"

import { DesktopLeftNavbar } from "../common/index.tsx"
import Card from "../components/Card.tsx"
import { EmptyBlog, EmptyBook } from "../components/EmptyCard.tsx"
import { useHomeBlogs, useHomeBooks } from "../hooks/home.ts"
import { HomeNavContainer } from "../components/Containers.tsx"

const Home = (props: AppRouteProps) => {
  const { isMobile, authContext, appContext } = props
  const { base_url } = appContext.env
  const navigate = useNavigate()
  const [blogs] = useHomeBlogs(authContext)
  const [books] = useHomeBooks(authContext)

  return (
    <div className="full-container flex-row">
      <HomeNavContainer>
        <DesktopLeftNavbar isMobile={isMobile} />
      </HomeNavContainer>
      <div className="con-xxl-80 con-sm-12">
        <Documents
          navigate={navigate}
          documents={blogs}
          base_url={base_url}
          docType="blog"
        />
        <Documents
          navigate={navigate}
          documents={books}
          base_url={base_url}
          docType="book"
        />
      </div>
    </div>
  )
}

const Documents = ({
  navigate,
  documents,
  base_url,
  docType,
}: {
  navigate: NavigateFunction
  documents: DocNode[] | null
  base_url: string
  docType: string
}) => {
  return (
    <div className="flex-row cards-con">
      {!documents && docType === "blog" ? (
        <EmptyBlog navigate={navigate} />
      ) : null}
      {!documents && docType === "book" ? (
        <EmptyBook navigate={navigate} />
      ) : null}

      {Array.isArray(documents) &&
        documents.map((node: DocNode) => {
          return (
            <Card
              key={node.uid}
              node={node}
              navigate={navigate}
              nodeType={docType}
              base_url={base_url}
            />
          )
        })}
    </div>
  )
}

export default Home
