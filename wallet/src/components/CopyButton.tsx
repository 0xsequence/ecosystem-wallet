import { Button, CheckmarkIcon, CopyIcon } from '@0xsequence/design-system'
import { ComponentProps, useEffect, useState } from 'react'

type ButtonProps = ComponentProps<typeof Button>

interface CopyButtonProps extends ButtonProps {
  text: string
}

export const CopyButton = (props: CopyButtonProps) => {
  const { text, ...rest } = props
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
    navigator.clipboard.writeText(text)
  }

  return (
    <Button variant="text" leftIcon={isCopied ? CheckmarkIcon : CopyIcon} onClick={handleCopy} {...rest} />
  )
}
