export const Container = (props: any) => {
  return (
    <main className="flex-1 min-h-screen ml-64 bg-[#0d0d0d] pt-14">
      {props.children}
    </main>
  )
}
