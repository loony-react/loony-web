import { NavigateFunction, useNavigate } from "react-router"
import { AppRouteProps, DocNode } from "loony-types"
import DocumentCard from "components/DocumentCard.tsx"

import HomeLeftNavbar from "../components/HomeLeftNavbar.tsx"
import { useHomeBlogs, useHomeBooks } from "../hooks/home.ts"
import { EmptyCard } from "components/EmptyCard.tsx"

const Home = (props: AppRouteProps) => {
  const { authContext, appContext, mobileNavOpen } = props
  const { base_url } = appContext.env
  const navigate = useNavigate()
  const [blogs] = useHomeBlogs(authContext)
  const [books] = useHomeBooks(authContext)

  return (
    <div className="flex flex-1 overflow-hidden">
      <HomeLeftNavbar mobileNavOpen={mobileNavOpen} appContext={appContext} />
      <main className="flex-1 bg-stone-50 dark:bg-[#272727] p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Documents
            navigate={navigate}
            documents={blogs}
            base_url={base_url}
            docType="blog"
          />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Documents
            navigate={navigate}
            documents={books}
            base_url={base_url}
            docType="book"
          />
        </div>
      </main>
    </div>
  )
}

const Documents = (props: {
  navigate: NavigateFunction
  documents: DocNode[] | null
  base_url: string
  docType: string
}) => {
  if (!props.documents || props.documents?.length === 0) {
    return (
      <EmptyCard
        title={`Create your first ${props.docType}`}
        navigate={props.navigate}
        docType={props.docType}
      />
    )
  }
  return (
    Array.isArray(props.documents) &&
    props.documents.map((node: DocNode, i) => (
      <DocumentCard key={i} {...props} node={node} />
    ))
  )
}

export default Home
