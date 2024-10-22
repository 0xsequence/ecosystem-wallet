import { PropsWithChildren, createContext, useContext, useState } from 'react'

import { ConfirmDialog } from './ConfirmDialog'
import type { ConfirmDialogProps } from './ConfirmDialog'

type ConfirmDialogContextObject = {
  confirmAction: (props: ConfirmDialogProps) => void
}

const ConfirmDialogContext = createContext<ConfirmDialogContextObject>({
  confirmAction: () => null
})

const ConfirmDialogProvider = ({ children }: PropsWithChildren) => {
  const [confirmDialogProps, setConfirmDialogProps] = useState<ConfirmDialogProps | null>(null)

  const confirmDialogContext = {
    confirmAction: (props: ConfirmDialogProps) => {
      setConfirmDialogProps(props)
    }
  }

  const closeConfirmationModal = () => {
    setConfirmDialogProps(null)
  }

  return (
    <ConfirmDialogContext.Provider value={confirmDialogContext}>
      {children}

      {confirmDialogProps && (
        <ConfirmDialog
          {...confirmDialogProps}
          onConfirm={() => {
            confirmDialogProps.onConfirm()
            closeConfirmationModal()
          }}
          onCancel={() => {
            confirmDialogProps.onCancel?.()
            closeConfirmationModal()
          }}
        />
      )}
    </ConfirmDialogContext.Provider>
  )
}

const useConfirmDialog: () => ConfirmDialogContextObject = () => useContext(ConfirmDialogContext)

export { ConfirmDialogProvider, useConfirmDialog }
