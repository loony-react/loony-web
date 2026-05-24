import { NavigateFunction, useNavigate } from "react-router"
import { AppRouteProps, DocNode } from "loony-types"
import DocumentCard from "../components/DocumentCard.tsx"

import HomeLeftNavbar from "../components/HomeLeftNavbar.tsx"
import { useHomeBlogs, useHomeBooks } from "../hooks/home.ts"
import { EmptyCard } from "../components/EmptyCard.tsx"

const Home = (props: AppRouteProps) => {
  const { authContext, appContext, mobileNavOpen } = props
  const { base_url } = appContext.env
  const navigate = useNavigate()

  const blogs = useHomeBlogs(authContext)
  const books = useHomeBooks(authContext)

  return (
    <div className="flex flex-1 overflow-hidden h-screen">
      <HomeLeftNavbar mobileNavOpen={mobileNavOpen} appContext={appContext} />
      <main className="ml-64 flex-1 bg-[var(--bg)] overflow-y-auto mt-14 px-6 py-6">

        {/* Blogs section */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
            Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            <Documents
              navigate={navigate}
              documents={blogs}
              base_url={base_url}
              docType="blog"
            />
          </div>
        </section>

        {/* Books section */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
            Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            <Documents
              navigate={navigate}
              documents={books}
              base_url={base_url}
              docType="book"
            />
          </div>
        </section>

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
