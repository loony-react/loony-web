import { NavigateFunction } from "react-router"

const EmptyCard = ({
  title,
  navigate,
}: {
  title: string
  navigate: NavigateFunction
}) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-54 bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            className="px-6 py-2.5 bg-black text-white font-medium rounded-full shadow hover:bg-gray-800 transition duration-200"
            onClick={() => {
              navigate("/create/blog")
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export { EmptyCard }
