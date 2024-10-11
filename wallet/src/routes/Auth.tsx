import React, { SetStateAction, useRef, useState } from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import {
  Box,
  Button,
  Divider,
  Modal,
  PINCodeInput,
  Spinner,
  Text,
  TextInput,
} from "@0xsequence/design-system";
import { EmailConflictInfo } from "@0xsequence/waas";

import { useEmailAuth } from "../hooks/useEmailAuth";
import { randomName } from "../utils/string";

import { EmailConflictWarning } from "../components/EmailConflictWarning";

import { sequenceWaas, googleClientId } from "../waasSetup";
import { useAuth } from "../context/AuthContext";

export const Auth: React.FC = () => {
  const { setWalletAddress, pendingEventOrigin } = useAuth();

  const handleGoogleLogin = async (tokenResponse: CredentialResponse) => {
    try {
      const res = await sequenceWaas.signIn(
        {
          idToken: tokenResponse.credential!,
        },
        randomName()
      );
      setWalletAddress(res.wallet);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    inProgress: emailAuthInProgress,
    loading: emailAuthLoading,
    initiateAuth: initiateEmailAuth,
    sendChallengeAnswer,
    cancel: cancelEmailAuth,
  } = useEmailAuth({
    sessionName: randomName(),
    onSuccess: async ({ wallet }) => {
      setWalletAddress(wallet);
    },
  });

  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isEmailValid = inputRef.current?.validity.valid;
  const [showEmailWarning, setEmailWarning] = useState(false);
  const [code, setCode] = useState<string[]>([]);

  const [emailConflictInfo, setEmailConflictInfo] = useState<
    EmailConflictInfo | undefined
  >();
  const [isEmailConflictModalOpen, setIsEmailConflictModalOpen] =
    useState(false);
  const forceCreateFuncRef = useRef<(() => Promise<void>) | null>(null);

  sequenceWaas.onEmailConflict(async (info, forceCreate) => {
    forceCreateFuncRef.current = forceCreate;
    setEmailConflictInfo(info);
    setIsEmailConflictModalOpen(true);
  });

  const isPopup = window.opener !== null;

  return (
    <Box padding="4">
      <Box alignItems="center" justifyContent="center" marginTop="20">
        <Box
          flexDirection="column"
          gap="2"
          marginY="4"
          alignItems="center"
          justifyContent="center"
          style={{ maxWidth: "600px" }}
        >
          <Box alignItems="center" flexDirection="column" marginBottom="2">
            <Text
              variant="large"
              color="text100"
              fontWeight="bold"
              marginBottom="1"
            >
              Some Amazing Project's Wallet 🤩
            </Text>
            <Text variant="small" color="text80" textAlign="center">
              (This is actually just a dapp using Sequence embedded wallet, but
              acting as a wallet thanks to walletTransport + providerTransport +
              a special wagmi connector!)
            </Text>
            {isPopup && (
              <Text
                variant="normal"
                color="text100"
                textAlign="center"
                marginTop="10"
              >
                {pendingEventOrigin
                  ? `Sign in to your wallet to give access to dapp with origin ${pendingEventOrigin}`
                  : "Sign in to your wallet to give access"}
              </Text>
            )}
            {!isPopup && (
              <Text variant="normal" color="text80">
                Sign in to your wallet
              </Text>
            )}
          </Box>

          {/* <Box marginBottom="2">
            <Text variant="medium" color="text100" fontWeight="bold">
              Google Login
            </Text>
          </Box> */}
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              key="google"
              onSuccess={handleGoogleLogin}
              shape="circle"
              width={230}
            />
          </GoogleOAuthProvider>

          {/* <Divider background="buttonGlass" width="full" />

          <Box>
            <Text variant="medium" color="text100" fontWeight="bold">
              Email Login
            </Text>
          </Box>

          {sendChallengeAnswer ? (
            <Box flexDirection="column">
              <Box>
                <Text
                  marginTop="2"
                  variant="normal"
                  color="text80"
                  alignItems="center"
                  justifyContent="center"
                >
                  Enter code received in email.
                </Text>
              </Box>
              <Box marginTop="4">
                <PINCodeInput value={code} digits={6} onChange={setCode} />
              </Box>

              <Box
                gap="2"
                marginY="4"
                alignItems="center"
                justifyContent="center"
              >
                {emailAuthLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    variant="primary"
                    disabled={code.includes("")}
                    label="Verify"
                    onClick={() => sendChallengeAnswer(code.join(""))}
                    data-id="verifyButton"
                  />
                )}
              </Box>
            </Box>
          ) : (
            <Box marginTop="2" marginBottom="4">
              <Text variant="normal" color="text80">
                Enter your email to receive a code to login and create your
                wallet. <br />
                Please check your spam folder if you don't see it in your
                inbox.
              </Text>

              <Box marginTop="6">
                <TextInput
                  name="email"
                  type="email"
                  onChange={(ev: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setEmail(ev.target.value);
                  }}
                  ref={inputRef}
                  onKeyDown={(ev: { key: string }) => {
                    if (email && ev.key === "Enter") {
                      initiateEmailAuth(email);
                    }
                  }}
                  onBlur={() => setEmailWarning(!!email && !isEmailValid)}
                  value={email}
                  placeholder="hello@example.com"
                  required
                  data-id="loginEmail"
                />
                {showEmailWarning && (
                  <Text as="p" variant="small" color="negative" marginY="2">
                    Invalid email address
                  </Text>
                )}
              </Box>
              <Box
                gap="2"
                marginY="4"
                alignItems="center"
                justifyContent="center"
              >
                {emailAuthLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    variant="primary"
                    disabled={!isEmailValid}
                    label="Continue"
                    onClick={() => initiateEmailAuth(email)}
                    data-id="continueButton"
                  />
                )}
              </Box>
            </Box>
          )} */}
        </Box>
      </Box>

      {isEmailConflictModalOpen && emailConflictInfo && (
        <Modal size="small" onClose={() => setIsEmailConflictModalOpen(false)}>
          <EmailConflictWarning
            info={emailConflictInfo}
            onCancel={() => {
              setIsEmailConflictModalOpen(false);
              setEmailConflictInfo(undefined);
              if (emailAuthInProgress) {
                setCode([]);
                cancelEmailAuth();
                setEmail("");
              }
            }}
            onConfirm={async () => {
              setIsEmailConflictModalOpen(false);
              setEmailConflictInfo(undefined);
              await forceCreateFuncRef.current?.();
            }}
          />
        </Modal>
      )}
    </Box>
  );
};
