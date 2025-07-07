export default function DesktopLeftNavbar() {
  return (
    <div className="w-64 bg-white p-4 space-y-6 shadow-md h-screen overflow-y-auto border-r border-gray-200">
      {/* App Navigation */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Navigation
        </h2>
        <nav className="space-y-1">
          <a
            href="#"
            className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
          >
            🏠 Dashboard
          </a>
          <a
            href="/profile"
            className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
          >
            👤 Profile
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
          >
            ⚙️ Settings
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
          >
            📄 Reports
          </a>
        </nav>
      </div>

      {/* Subscribed Users */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Subscribed Users
        </h2>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer">
            🔥 JohnDoe
          </li>
          <li className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer">
            🌟 JaneSmith
          </li>
          <li className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer">
            ⚡ CodeWizard
          </li>
        </ul>
      </div>

      {/* Legal / Misc */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Info
        </h2>
        <nav className="space-y-1">
          <a
            href="#"
            className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
          >
            🔒 Privacy Policy
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
          >
            ℹ️ About
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded hover:bg-gray-100 text-gray-800"
          >
            📬 Contact
          </a>
        </nav>
      </div>
    </div>
  )
}
