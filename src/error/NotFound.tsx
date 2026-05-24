const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] px-4 text-center">
      <p className="text-8xl font-bold text-white/5 mb-2 select-none">404</p>
      <h2 className="text-lg font-semibold text-[#ececec] mb-2">Page not found</h2>
      <p className="text-sm text-[#6b6b76] mb-8 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="text-sm font-medium px-4 py-2 rounded-lg bg-[#ececec] text-[#0d0d0d] hover:bg-white transition-colors"
      >
        Go home
      </a>
    </div>
  )
}

export default NotFound
