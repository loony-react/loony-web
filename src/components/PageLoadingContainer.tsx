/* eslint-disable @typescript-eslint/no-unused-vars */
const PageLoadingContainer = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-white/10 border-t-[#10a37f] animate-spin" />
        {title && (
          <p className="text-sm text-[#6b6b76]">{title}</p>
        )}
      </div>
    </div>
  )
}

export default PageLoadingContainer
