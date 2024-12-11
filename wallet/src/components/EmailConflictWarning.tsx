import { Box, Button, Text } from '@0xsequence/design-system'
import { EmailConflictInfo, IdentityType } from '@0xsequence/waas'

interface EmailConflictWarningProps {
  info: EmailConflictInfo
  onCancel: () => void
  onConfirm: () => void
}

const accountTypeText = (info: EmailConflictInfo) => {
  if (info.type === IdentityType.PlayFab) {
    return 'PlayFab'
  }

  if (info.type === IdentityType.Email) {
    return 'Email'
  }

  if (info.type === IdentityType.OIDC) {
    if (info.issuer.includes('cognito-idp')) {
      return 'Email v1 login'
    }

    switch (info.issuer) {
      case 'https://accounts.google.com':
        return 'Google'
      case 'https://appleid.apple.com':
        return 'Apple'
      default:
        return 'Unknown account type'
    }
  }

  return 'Unknown account type'
}

export const EmailConflictWarning = (props: EmailConflictWarningProps) => {
  const { onCancel } = props

  return (
    <Box
      style={{ maxWidth: '600px' }}
      flexDirection="column"
      paddingX="10"
      paddingY="4"
      alignItems="center"
      gap="4"
    >
      <Box>
        <Text variant="large" color="text100" fontWeight="bold">
          Email already in use
        </Text>
      </Box>
      <Box height="full">
        <Text as="div" variant="normal" color="text50" textAlign="center">
          It looks like you've previously signed into this email{' '}
          <Text color="text80">({props.info.email})</Text> with another login method. Please sign in again and
          select the <Text color="text80">{accountTypeText(props.info)}</Text> option to access your account.
        </Text>
      </Box>

      <Box flexDirection="row" gap="3" marginTop="2" marginBottom="2">
        <Button label="OK" onClick={onCancel} />
      </Box>
    </Box>
  )
}
