import React from "react"

export const ChapterNavContainer = ({
  children,
  onClick,
}: // isActive,
{
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLDivElement>
  isActive: boolean
}) => {
  return (
    <div className="chapter-nav" onClick={onClick}>
      {children}
    </div>
  )
}

export const ChapterButtonNavContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="chapter-button-nav">{children}</div>
}

export const SectionButtonNavContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="section-button-nav">{children}</div>
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
  return (
    <div
      className={`menu-nav flex-row p8_12 ${activeMenu}`}
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
  return <div className="menu-nav flex-row p8_12">{children}</div>
}

export const PageNavContainer = ChapterNavContainer

export const SectionNavContainer = ({
  children,
  onClick,
}: // isActive,
{
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLDivElement>
  isActive: boolean
}) => {
  return (
    <div className="section-nav" onClick={onClick}>
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
    <div className="sections-nav" onClick={onClick}>
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
    <div className="flex-row con-xxl-70 mar-hor-30" onClick={onClick}>
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
    <div className="con-xxl-50 mar-hor-auto" onClick={onClick}>
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
    <div className="con-xxl-20" onClick={onClick}>
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
    <div className="con-xxl-15" onClick={onClick}>
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
    <div className="con-xxl-20" onClick={onClick}>
      {children}
    </div>
  )
}
