import { Box, Button, Text } from "@0xsequence/design-system";
import { EmailConflictInfo, IdentityType } from "@0xsequence/waas";

interface EmailConflictWarningProps {
  info: EmailConflictInfo;
  onCancel: () => void;
  onConfirm: () => void;
}

const accountTypeText = (info: EmailConflictInfo) => {
  if (info.type === IdentityType.PlayFab) {
    return "PlayFab login";
  }

  if (info.type === IdentityType.Email) {
    return "Email login";
  }

  if (info.type === IdentityType.OIDC) {
    if (info.issuer.includes("cognito-idp")) {
      return "Email v1 login";
    }

    switch (info.issuer) {
      case "https://accounts.google.com":
        return "Google login";
      case "https://appleid.apple.com":
        return "Apple login";
      default:
        return "Unknown account type";
    }
  }

  return "Unknown account type";
};

export const EmailConflictWarning = (props: EmailConflictWarningProps) => {
  const { onCancel, onConfirm } = props;

  return (
    <Box
      style={{ maxWidth: "600px" }}
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
          Another account with this email address{" "}
          <Text color="text80">({props.info.email})</Text> already exists with
          account type{" "}
          <Text color="text80">({accountTypeText(props.info)})</Text>. You can
          cancel this or force create a new account.
        </Text>
      </Box>

      <Box flexDirection="row" gap="3" marginTop="6" marginBottom="2">
        <Button label="Cancel" onClick={onCancel} />
        <Button
          variant="primary"
          label="Create new account"
          onClick={onConfirm}
        />
      </Box>
    </Box>
  );
};
