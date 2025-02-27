export function WrappedCollapse({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={
        {
          '--theme-rounded-xl': '0.75rem'
          // '--color-background-secondary': 'rgba(0, 0, 0, 0.1)'
        } as React.CSSProperties
      }
      className="w-full"
    >
      {children}
    </div>
  )
}
