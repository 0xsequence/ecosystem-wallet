import { Button, Spinner } from '@0xsequence/design-system'

import { ContentModal } from '../ContentModal'

export type ConfirmDialogProps = {
  cancelLabel?: string
  confirmLabel?: string
  isProcessing?: boolean
  onCancel?: () => void
  onConfirm: () => void
  processingLabel?: string
  title: string
  warningMessage?: string
}

export const ConfirmDialog = ({
  cancelLabel = 'Cancel',
  confirmLabel = 'Yes',
  isProcessing = false,
  onCancel,
  onConfirm,
  processingLabel = 'Processing',
  title,
  warningMessage
}: ConfirmDialogProps) => (
  <ContentModal isDismissible={false} onClose={onCancel}>
    <div className="flex flex-col gap-4 p-6 text-black">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{title}</h1>
        {warningMessage ? <p>{warningMessage}</p> : null}
      </div>

      <div className="flex flex-row-reverse gap-2">
        <Button
          label={
            isProcessing ? (
              <div className="flex items-center gap-2">
                <Spinner /> {processingLabel}
              </div>
            ) : (
              confirmLabel
            )
          }
          shape="square"
          className="bg-black text-white"
          disabled={isProcessing}
          onClick={onConfirm}
        />

        <Button label={cancelLabel} shape="square" variant="emphasis" onClick={onCancel} />
      </div>
    </div>
  </ContentModal>
)
