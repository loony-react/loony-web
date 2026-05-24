export const Container = (props: any) => {
  return (
    <main className="flex-1 min-h-screen ml-64 bg-[var(--bg)] pt-14">
      {props.children}
    </main>
  )
}
