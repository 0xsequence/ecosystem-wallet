export const TransactionHistorySkeleton = () => {
  return (
    <>
      {Array(8)
        .fill(null)
        .map((_, index) => {
          return <div className="rounded-md bg-black/5 animate-pulse h-[120px]" key={index}></div>
        })}
    </>
  )
}
