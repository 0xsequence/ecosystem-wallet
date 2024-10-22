import { Modal } from '@0xsequence/design-system'
import { MotionProps } from 'framer-motion'
import { PropsWithChildren } from 'react'

export const ContentModal = ({
  className,
  children,
  size = 'sm',
  contentProps,
  ...modalProps
}: PropsWithChildren<{
  className?: string
  contentProps?: MotionProps
  isDismissible?: boolean
  onClose?: () => void
  size?: 'sm' | 'lg'
}> & {
  className?: string
}) => (
  <Modal
    className={className}
    backdropColor="backgroundBackdrop"
    disableAnimation
    scroll={false}
    size={size}
    contentProps={{
      style: {
        overflowY: 'scroll',
        ...contentProps?.style
      },
      ...contentProps
    }}
    {...modalProps}
  >
    {children}
  </Modal>
)
