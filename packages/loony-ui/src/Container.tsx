export const Container = (props: any) => {
  return (
    <main className="flex-1 min-h-screen ml-64 bg-stone-50 dark:bg-[#212121] pt-16">
      {props.children}
    </main>
  )
}
