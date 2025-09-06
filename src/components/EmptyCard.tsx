import { NavigateFunction } from "react-router"

const EmptyCard = ({
  title,
  navigate,
  docType,
}: {
  title: string
  navigate: NavigateFunction
  docType: string
}) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white dark:bg-[#2e2e2e] hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-54 flex items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-5">
          <h2 className="text-sm dark:text-white">{title}</h2>
          <button
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md shadow dark:hover:bg-[#cccccc] transition duration-200"
            onClick={() => {
              navigate(`/create/${docType}`)
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
