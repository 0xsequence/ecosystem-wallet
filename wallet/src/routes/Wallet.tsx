import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  truncateAddress,
  Collapsible,
  Spinner,
  SignoutIcon,
  Image,
} from "@0xsequence/design-system";
import { HandlerType } from "../walletTransport";
import { Deferred } from "../utils/promise";
import { ethers } from "ethers";
import { UserRejectedRequestError } from "viem";
import { sequenceWaas } from "../waasSetup";
import { Transaction, FeeOption } from "@0xsequence/waas";

import { useAuth, walletTransport } from "../context/AuthContext";
import { useConfirmDialog } from "../components/ConfirmDialogProvider";
import { AnimatePresence, motion } from "framer-motion";

// const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;
const PROJECT_SMALL_LOGO = import.meta.env.VITE_PROJECT_SMALL_LOGO;

const checkTransactionFeeOptions = async ({
  transactions,
  chainId,
}: {
  transactions: Transaction[];
  chainId: number;
}): Promise<{
  feeQuote: string | undefined;
  feeOptions: FeeOption[] | undefined;
  isSponsored: boolean;
}> => {
  const resp = await sequenceWaas.feeOptions({
    transactions: transactions,
    network: chainId,
  });

  if (resp.data.feeQuote && resp.data.feeOptions) {
    return {
      feeQuote: resp.data.feeQuote,
      feeOptions: resp.data.feeOptions,
      isSponsored: false,
    };
  }
  return {
    feeQuote: resp.data.feeQuote,
    feeOptions: resp.data.feeOptions,
    isSponsored: true,
  };
};

export const Wallet: React.FC = () => {
  const { authState, signOut } = useAuth();
  const [connectionRequestWithOrigin, setConnectionRequestWithOrigin] =
    useState<string | undefined>();
  const connectionPromiseRef = useRef<Deferred<boolean> | null>(null);

  const [requestOrigin, setRequestOrigin] = useState<string | undefined>();

  const [txnConfirmationRequest, setTxnConfirmationRequest] = useState<
    ethers.Transaction[] | undefined
  >(undefined);
  const txnConfirmationPromiseRef = useRef<Deferred<boolean> | null>(null);

  const [signConfirmationRequest, setSignConfirmationRequest] = useState<
    { message: string } | undefined
  >(undefined);
  const signConfirmationPromiseRef = useRef<Deferred<boolean> | null>(null);

  const [isSendingTxn, setIsSendingTxn] = useState(false);
  const [isSigningMessage, setIsSigningMessage] = useState(false);

  const { confirmAction } = useConfirmDialog();

  const handleApproveTxn = () => {
    if (txnConfirmationPromiseRef.current) {
      txnConfirmationPromiseRef.current.resolve(true);
      setTxnConfirmationRequest(undefined);
    }
  };

  const handleRejectTxn = () => {
    if (txnConfirmationPromiseRef.current) {
      txnConfirmationPromiseRef.current.resolve(false);
      setTxnConfirmationRequest(undefined);
    }
  };

  const handleApproveSign = () => {
    if (signConfirmationPromiseRef.current) {
      signConfirmationPromiseRef.current.resolve(true);
      setSignConfirmationRequest(undefined);
    }
  };

  const handleRejectSign = () => {
    if (signConfirmationPromiseRef.current) {
      signConfirmationPromiseRef.current.resolve(false);
      setSignConfirmationRequest(undefined);
    }
  };

  const [registeredSignHandler, setRegisteredSignHandler] = useState(false);
  const [registeredSendTxnHandler, setRegisteredSendTxnHandler] =
    useState(false);

  const allHandlersRegistered =
    registeredSignHandler && registeredSendTxnHandler;

  useEffect(() => {
    walletTransport.setConnectionPromptCallback(async (origin: string) => {
      setConnectionRequestWithOrigin(origin);
      const deferred = new Deferred<boolean>();
      connectionPromiseRef.current = deferred;
      return deferred.promise;
    });

    walletTransport.registerHandler(HandlerType.SIGN, async (request) => {
      const { params, chainId, origin } = request;

      if (origin) {
        setRequestOrigin(origin);
      }

      const message = params?.[0];
      setSignConfirmationRequest({ message: ethers.toUtf8String(message) });

      setRegisteredSignHandler(true);

      const deferred = new Deferred<boolean>();
      signConfirmationPromiseRef.current = deferred;

      const confirmation = await signConfirmationPromiseRef.current.promise;

      if (!confirmation) {
        return new UserRejectedRequestError(
          new Error("User rejected signature request")
        );
      }

      setIsSigningMessage(true);

      const result = await sequenceWaas.signMessage({
        message: message,
        network: chainId,
      });

      setIsSigningMessage(false);

      return result;
    });

    walletTransport.registerHandler(
      HandlerType.SEND_TRANSACTION,
      async (request) => {
        const { params, chainId, origin } = request;

        if (origin) {
          setRequestOrigin(origin);
        }

        const txns: ethers.Transaction | ethers.Transaction[] =
          await ethers.resolveProperties(params?.[0]);

        // Check if txns is an array, if not, convert it to an array
        const txnsArray = Array.isArray(txns) ? txns : [txns];

        setTxnConfirmationRequest(txnsArray);

        setRegisteredSendTxnHandler(true);

        const deferred = new Deferred<boolean>();

        txnConfirmationPromiseRef.current = deferred;

        const confirmation = await txnConfirmationPromiseRef.current.promise;

        if (!confirmation) {
          return new UserRejectedRequestError(
            new Error("User rejected transaction request")
          );
        }

        setIsSendingTxn(true);

        const feeOptionsResponse = await checkTransactionFeeOptions({
          transactions: [txns] as Transaction[],
          chainId,
        });
        const feeOptions = feeOptionsResponse?.feeOptions;

        // TODO: Add a fee option selector UI
        let selectedFeeOption: FeeOption | undefined;
        if (feeOptions) {
          selectedFeeOption = feeOptions[0];
        }

        const response = await sequenceWaas.sendTransaction({
          transactions: [txns] as Transaction[],
          network: chainId,
          transactionsFeeOption: selectedFeeOption,
          transactionsFeeQuote: feeOptionsResponse?.feeQuote,
        });

        setIsSendingTxn(false);

        return response;
      }
    );

    return () => {
      // Clean up handlers if necessary
    };
  }, []);

  const handleApproveConnection = () => {
    if (connectionPromiseRef.current) {
      connectionPromiseRef.current.resolve(true);
      setConnectionRequestWithOrigin(undefined);
    }
  };

  const handleRejectConnection = () => {
    if (connectionPromiseRef.current) {
      connectionPromiseRef.current.resolve(false);
      setConnectionRequestWithOrigin(undefined);
    }
  };

  return (
    <Box>
      <Box
        flexDirection="row"
        gap="4"
        background="backgroundRaised"
        backdropFilter="blur"
        padding="4"
        alignItems="center"
      >
        {PROJECT_SMALL_LOGO && (
          <Box>
            <Image
              src={PROJECT_SMALL_LOGO}
              style={{ width: "30px", height: "30px" }}
            />
          </Box>
        )}
        <Text variant="normal" color="text100" fontWeight="bold">
          {authState.status === "signedIn" && authState.address
            ? truncateAddress(authState.address, 12, 8)
            : "Not connected"}
        </Text>

        <Button
          size="sm"
          leftIcon={SignoutIcon}
          onClick={() => {
            confirmAction({
              title: "Signing out",
              warningMessage: "Are you sure you want to sign out?",
              confirmLabel: "Sign out",
              onConfirm: async () => {
                signOut();
              },
              cancelLabel: "Cancel",
              onCancel: () => {},
            });
          }}
          marginLeft="auto"
        />
      </Box>

      <AnimatePresence>
        {allHandlersRegistered &&
          !connectionRequestWithOrigin &&
          !txnConfirmationRequest &&
          !signConfirmationRequest && (
            <Box
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              padding="4"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="normal" color="text80">
                No pending confirmation
              </Text>
            </Box>
          )}
      </AnimatePresence>

      <AnimatePresence>
        <Box
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {connectionRequestWithOrigin && (
            <Box
              marginTop="4"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              padding="4"
            >
              <Text variant="medium" color="text80">
                Connection request from dapp with origin{" "}
                <Text color="text100">{connectionRequestWithOrigin}</Text>
              </Text>
              <Box flexDirection="column" gap="2" marginTop="6">
                <Text variant="normal" color="text80">
                  - This will share your wallet address with the dapp
                </Text>

                <Text variant="normal" color="text80">
                  - This will NOT allow the dapp to do any operations without
                  your confirmation
                </Text>
              </Box>

              <Box marginTop="6" gap="2">
                <Button
                  variant="secondary"
                  label="Reject"
                  onClick={handleRejectConnection}
                />
                <Button
                  variant="primary"
                  label="Approve"
                  onClick={handleApproveConnection}
                />
              </Box>
            </Box>
          )}
          {isSendingTxn && (
            <Box alignItems="center" justifyContent="center" marginTop="4">
              <Spinner size="lg" color="text100" />
            </Box>
          )}
          {txnConfirmationRequest &&
            txnConfirmationRequest.length > 0 &&
            !isSendingTxn && (
              <Box
                marginTop="4"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="4"
                borderRadius="md"
                gap="2"
              >
                <Text
                  variant="medium"
                  color="text100"
                  fontWeight="bold"
                  marginTop="6"
                  textAlign="center"
                >
                  Transaction Request <br />
                  <Text variant="small" color="text80">
                    from origin <Text fontWeight="bold">{requestOrigin} </Text>
                  </Text>
                </Text>
                <Box marginTop="2" flexDirection="column" gap="2" width="full">
                  {txnConfirmationRequest.map((txn, index) => (
                    <Box
                      key={index}
                      flexDirection="column"
                      gap="3"
                      width="full"
                    >
                      <Collapsible label="Transaction data">
                        <Box overflowX="scroll">
                          <Text variant="code" color="text80">
                            {JSON.stringify(txn, null, 2)}
                          </Text>
                        </Box>
                      </Collapsible>
                    </Box>
                  ))}
                </Box>
                <Box marginTop="4" gap="2">
                  <Button
                    variant="secondary"
                    label="Reject"
                    onClick={handleRejectTxn}
                  />
                  <Button
                    variant="primary"
                    label="Approve"
                    onClick={handleApproveTxn}
                  />
                </Box>
              </Box>
            )}
          {isSigningMessage && (
            <Box alignItems="center" justifyContent="center" marginTop="4">
              <Spinner size="lg" color="text100" />
            </Box>
          )}
          {signConfirmationRequest && !isSigningMessage && (
            <Box
              marginTop="4"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              padding="4"
              borderRadius="md"
              gap="2"
            >
              <Text
                variant="medium"
                color="text100"
                fontWeight="bold"
                marginTop="6"
                textAlign="center"
              >
                Signature Request <br />
                <Text variant="small" color="text80">
                  from origin <Text fontWeight="bold">{requestOrigin} </Text>
                </Text>
              </Text>
              <Box marginTop="2" flexDirection="column" gap="2" width="full">
                <Collapsible label="Message to sign:" open={true}>
                  <Text
                    variant="small"
                    color="text80"
                    style={{ wordBreak: "break-all" }}
                  >
                    {signConfirmationRequest.message}
                  </Text>
                </Collapsible>
              </Box>
              <Box marginTop="4" gap="2">
                <Button
                  variant="secondary"
                  label="Reject"
                  onClick={handleRejectSign}
                />
                <Button
                  variant="primary"
                  label="Approve"
                  onClick={handleApproveSign}
                />
              </Box>
            </Box>
          )}
        </Box>
      </AnimatePresence>
    </Box>
  );
};
