import { Box, Button, Spinner, Text } from "@0xsequence/design-system";

import { ContentModal } from "../ContentModal";

export type ConfirmDialogProps = {
  cancelLabel?: string;
  confirmLabel?: string;
  isProcessing?: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
  processingLabel?: string;
  title: string;
  warningMessage?: string;
};

export const ConfirmDialog = ({
  cancelLabel = "Cancel",
  confirmLabel = "Yes",
  isProcessing = false,
  onCancel,
  onConfirm,
  processingLabel = "Processing",
  title,
  warningMessage,
}: ConfirmDialogProps) => (
  <ContentModal isDismissible={false} onClose={onCancel}>
    <Box flexDirection="column" gap="4" padding="6">
      <Box flexDirection="column" gap="1">
        <Text as="h1" variant="medium" color="text100" marginY="0">
          {title}
        </Text>
        {warningMessage ? (
          <Text as="p" variant="normal" color="negative" marginY="2">
            {warningMessage}
          </Text>
        ) : null}
      </Box>

      <Box flexDirection="row-reverse" gap="2">
        <Button
          label={
            isProcessing ? (
              <Box alignItems="center" gap="2">
                <Spinner /> {processingLabel}
              </Box>
            ) : (
              confirmLabel
            )
          }
          shape="square"
          variant="glass"
          disabled={isProcessing}
          onClick={onConfirm}
        />

        <Button
          label={cancelLabel}
          shape="square"
          variant="emphasis"
          onClick={onCancel}
        />
      </Box>
    </Box>
  </ContentModal>
);
