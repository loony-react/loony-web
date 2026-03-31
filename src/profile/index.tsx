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
    <>
      <div
        className={`fixed bg-gray-50 dark:bg-navbar text-stone-800 dark:text-stone-300 md:block w-72 bg-white p-4 space-y-6 shadow-md h-screen overflow-y-auto mt-16`}
      />
      <div className="flex flex-col items-center dark:bg-body min-h-screen">
        {/* Profile Header */}
        <div className="w-[60%] h-60 dark:bg-body relative mt-34">
          <div className="left-6 flex items-center gap-4">
            <div className="w-24 h-24 mr-2 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-14 h-14 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {user?.fname} {user?.lname}
              </h1>
              <p className="text-sm text-gray-200">1.23M subscribers</p>
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
    </>
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
