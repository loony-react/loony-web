import {
  Home,
  User,
  Settings,
  FileText,
  Contact,
  Book,
  Scale,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/reports", label: "Reports", icon: FileText },
]

const about = [
  { href: "#", label: "Privacy Policy", icon: Scale },
  { href: "#", label: "About", icon: Book },
  { href: "#", label: "Contact", icon: Contact },
]

export default function DesktopLeftNavbar({
  mobileNavOpen,
}: {
  mobileNavOpen: boolean
}) {
  // `fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
  //         isOpen ? "translate-x-0" : "-translate-x-full"
  //       } md:relative md:translate-x-0 md:block`

  return (
    <div
      className={`${mobileNavOpen ? "" : "hidden"} md:block w-64 bg-white p-4 space-y-6 shadow-md h-screen overflow-y-auto border-r border-gray-200`}
    >
      {/* App Navigation */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Navigation
        </h2>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{label}</span>
            </a>
          ))}
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
          {about.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
