export function WrappedInput({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={
        {
          '--theme-rounded-xl': '0.75rem'
          // '--color-primary': '#000000',
          // '--color-background-secondary': 'rgba(0, 0, 0, 0.1)',
          // '--color-border-normal': 'rgba(0,0,0,.1)',
          // '--color-border-focus': 'rgba(0,0,0,.5)'
        } as React.CSSProperties
      }
      className="w-full"
    >
      {children}
    </div>
  )
}
