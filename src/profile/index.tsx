import { NavigateFunction, useNavigate } from "react-router"
import { AppRouteProps, DocNode } from "loony-types"
import { User } from "lucide-react"
import { useUserBlogs, useUserBooks } from "../hooks/home.ts"
import DocumentCard from "../components/DocumentCard.tsx"

const Profile = (props: AppRouteProps) => {
  const { authContext, appContext } = props
  const { base_url } = appContext.env
  const { user } = authContext
  const navigate = useNavigate()

  const blogs = useUserBlogs(user?.uid as number)
  const books = useUserBooks(user?.uid as number)

  return (
    <div className="ml-64 min-h-screen bg-[var(--bg)] pt-14">
      {/* Profile header */}
      <div className="border-b border-[var(--border)] px-10 py-8">
        <div className="flex items-center gap-5 max-w-5xl">
          <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              {user?.fname} {user?.lname}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{user?.fname?.toLowerCase()}{user?.lname?.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-8 max-w-7xl">
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Documents navigate={navigate} documents={blogs} base_url={base_url} docType="blog" />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Documents navigate={navigate} documents={books} base_url={base_url} docType="book" />
          </div>
        </section>
      </div>
    </div>
  )
}

const Documents = (props: {
  navigate: NavigateFunction
  documents: DocNode[] | null
  base_url: string
  docType: string
}) => {
  return (
    Array.isArray(props.documents) &&
    props.documents.map((node: DocNode, i) => (
      <DocumentCard key={i} {...props} node={node} />
    ))
  )
}

export default Profile
