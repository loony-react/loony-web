import { AppContextProps } from "loony-types"
import {
  Home,
  User,
  Settings,
  FileText,
  Contact,
  Book,
  Scale,
  Moon,
  Sun,
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
  appContext,
}: {
  mobileNavOpen: boolean
  appContext: AppContextProps
}) {
  const { isDark, setAppContext } = appContext

  return (
    <div
      className={`${mobileNavOpen ? "block" : "hidden"} md:flex flex-col fixed bg-[var(--surface-nav)] border-r border-[var(--border)] w-64 h-screen overflow-y-auto mt-14 pt-4 pb-6`}
    >
      {/* App Navigation */}
      <div className="px-3 mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] px-3 mb-2">
          Navigation
        </p>
        <nav className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Legal / Info */}
      <div className="px-3 mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] px-3 mb-2">
          Info
        </p>
        <nav className="space-y-0.5">
          {about.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Dark mode toggle — pinned to bottom */}
      <div className="mt-auto px-6">
        <button
          onClick={() => {
            setAppContext((prev) => ({
              ...prev,
              isDark: !isDark,
            }))
          }}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 group"
        >
          <span
            className={`relative w-9 h-5 rounded-full transition-colors duration-300 flex-shrink-0 ${
              isDark ? "bg-[#10a37f]" : "bg-white/20"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
                isDark ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </span>
          {isDark ? (
            <Moon className="w-3.5 h-3.5" />
          ) : (
            <Sun className="w-3.5 h-3.5" />
          )}
          <span>{isDark ? "Dark" : "Light"}</span>
        </button>
      </div>
    </div>
  )
}
