export const TransactionHistorySkeleton = () => {
  return (
    <>
      {Array(8)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              className="rounded-md bg-background-secondary backdrop-blur-2xl animate-pulse h-[120px]"
              key={index}
            ></div>
          )
        })}
    </>
  )
}
