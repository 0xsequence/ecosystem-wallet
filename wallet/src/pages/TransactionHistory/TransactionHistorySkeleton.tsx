export const TransactionHistorySkeleton = () => {
  return (
    <>
      {Array(8)
        .fill(null)
        .map((_, index) => {
          return (
            <div className="rounded-md bg-background-secondary animate-pulse h-[120px]" key={index}></div>
          )
        })}
    </>
  )
}
