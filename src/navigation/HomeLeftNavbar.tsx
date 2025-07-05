export default function DesktopLeftNavbar() {
  return (
    <div className="w-60 bg-gray-100 p-4 space-y-4 overflow-y-auto">
      <nav className="flex-1 space-y-2">
        <a href="#" className="block py-2 px-2 rounded hover:bg-gray-300">
          🏠 Dashboard
        </a>
        <a href="#" className="block py-2 px-2 rounded hover:bg-gray-300">
          👤 Profile
        </a>
        <a href="#" className="block py-2 px-2 rounded hover:bg-gray-300">
          ⚙️ Settings
        </a>
        <a href="#" className="block py-2 px-2 rounded hover:bg-gray-300">
          📄 Reports
        </a>
      </nav>
    </div>
  )
}
