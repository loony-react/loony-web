import React from "react"

export const ChapterNavContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLDivElement>
  isActive: boolean
}) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--hover-bg)] transition-colors duration-150 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const ChapterButtonNavContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      {children}
    </div>
  )
}

export const SectionButtonNavContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      {children}
    </div>
  )
}

export const MenuNavContainer = ({
  children,
  onClick,
  activeMenu,
  route,
}: {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
  route: string | undefined
  activeMenu?: string | undefined
}) => {
  const isActive = activeMenu === route
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150 text-sm ${
        isActive
          ? "bg-white/8 text-[var(--text-primary)]"
          : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
      }`}
      data-id={route}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const BasicMenuNavContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)]">
      {children}
    </div>
  )
}

export const PageNavContainer = ChapterNavContainer

export const SectionNavContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLDivElement>
  isActive: boolean
}) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer hover:bg-[var(--hover-bg)] transition-colors duration-150 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const SectionsNavContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div
      className="pl-4 space-y-0.5"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const DocsBodyContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className="flex flex-row w-full max-w-[70%] mx-auto" onClick={onClick}>
      {children}
    </div>
  )
}

export const DocsContentContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto" onClick={onClick}>
      {children}
    </div>
  )
}

export const DocsNavContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className="w-[20%] flex-shrink-0" onClick={onClick}>
      {children}
    </div>
  )
}

export const HomeNavContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className="w-[15%] flex-shrink-0" onClick={onClick}>
      {children}
    </div>
  )
}

export const DocsSettingsContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div className="w-[20%] flex-shrink-0" onClick={onClick}>
      {children}
    </div>
  )
}
