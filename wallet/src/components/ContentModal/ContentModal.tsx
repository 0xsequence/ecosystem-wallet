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
    disableAnimation
    scroll={false}
    size={size}
    contentProps={{
      /* @ts-expect-error Framer motion issue with the style property */
      style: contentProps?.style,
      ...contentProps
    }}
    {...modalProps}
  >
    {children}
  </Modal>
)
