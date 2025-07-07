import { NavigateFunction, useNavigate } from "react-router"
import { AppRouteProps, DocNode } from "loony-types"
import { User } from "lucide-react"
import { useUserBlogs, useUserBooks } from "../hooks/home.ts"
import DocumentCard from "components/DocumentCard.tsx"

const Profile = (props: AppRouteProps) => {
  const { authContext, appContext } = props
  const { base_url } = appContext.env
  const { user } = authContext
  const navigate = useNavigate()

  const [blogs] = useUserBlogs(user?.uid as number)
  const [books] = useUserBooks(user?.uid as number)

  return (
    <div className="flex flex-col items-center">
      {/* Profile Header */}
      <div className="w-[60%] h-60 bg-gray-200 relative">
        <img
          src="https://via.placeholder.com/1200x300?text=Channel+Banner"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-12 left-6 flex items-center gap-4">
          <div className="w-24 h-24 mr-2 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-14 h-14 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {user?.fname} {user?.lname}
            </h1>
            <p className="text-sm text-gray-600">1.23M subscribers</p>
          </div>
        </div>
      </div>

      {/* Padding to make space for avatar overlap */}
      <div className="h-16" />

      {/* Posts Section */}
      <main className="w-[60%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          <Documents
            navigate={navigate}
            documents={blogs}
            base_url={base_url}
            docType="blog"
          />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
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
  return (
    Array.isArray(props.documents) &&
    props.documents.map((node: DocNode, i) => (
      <DocumentCard key={i} {...props} node={node} />
    ))
  )
}

export default Profile
