import { Button } from '@0xsequence/design-system'
import React, { ComponentProps } from 'react'

export type AlertProps = {
  title: string
  description: string
  secondaryDescription?: string
  variant: 'negative' | 'warning' | 'positive'
  buttonProps?: ComponentProps<typeof Button>
  children?: React.ReactNode
}

export const Alert = ({
  title,
  description,
  secondaryDescription,
  variant,
  buttonProps,
  children
}: AlertProps) => {
  const alertBg = 'bg-' + variant
  return (
    <div className={`rounded-md ${alertBg}`}>
      <div className="rounded-md p-4 w-full flex flex-col gap-3" style={{ background: 'backgroundOverlay' }}>
        <div className="w-full flex sm:flex-col md:flex-row gap-2 justify-between text-black">
          <div className="flex flex-col gap-1">
            <span className="font-medium ">{title}</span>

            {description}

            {secondaryDescription && <span className="font-medium">{secondaryDescription}</span>}
          </div>

          {buttonProps ? (
            <div className={`rounded-sm w-min h-min`}>
              <Button variant="emphasis" shape="square" flexShrink="0" {...buttonProps} />
            </div>
          ) : null}
        </div>

        {children}
      </div>
    </div>
  )
}
