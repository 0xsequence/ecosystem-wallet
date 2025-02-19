import { type ComponentProps, createContext, useContext, useEffect, useState } from 'react'

import { CheckmarkIcon, CopyIcon } from '../icons'

const Context = createContext<{ isCopied: boolean }>({ isCopied: false })
type CopyButtonProps = {
  copyText: string
} & ComponentProps<'button'>

function CopyButtonComponent(props: CopyButtonProps) {
  const { children, copyText, ...rest } = props
  const [isCopied, setCopy] = useState(false)

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setCopy(false)
      }, 4000)
    }
  }, [isCopied])

  const handleCopy = () => {
    setCopy(true)
    navigator.clipboard.writeText(copyText)
  }

  return (
    <button type="button" onClick={handleCopy} {...rest}>
      <Context.Provider value={{ isCopied }}>{children}</Context.Provider>
    </button>
  )
}

function CopyStatusIcon() {
  const { isCopied } = useContext(Context)

  return <>{isCopied ? <CheckmarkIcon className="size-4" /> : <CopyIcon className="size-4" />}</>
}

export const CopyButton = Object.assign(CopyButtonComponent, { Status: CopyStatusIcon })
