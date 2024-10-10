import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Text, truncateAddress } from "@0xsequence/design-system";
import { useAuth } from "../context/AuthContext";
import { WalletTransport, HandlerType } from "../walletTransport";
import { Deferred } from "../utils/promise";
import { ethers } from "ethers";
import { TransactionRejectedRpcError } from "viem";
import { sequenceWaas } from "../waasSetup";
import { Transaction, FeeOption } from "@0xsequence/waas";

const walletTransport = new WalletTransport();

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
  const { walletAddress, signOut } = useAuth();
  const [connectionRequestWithOrigin, setConnectionRequestWithOrigin] = useState<string | undefined>();
  const connectionPromiseRef = useRef<Deferred<boolean> | null>(null);

  useEffect(() => {
    walletTransport.setConnectionPromptCallback(async (origin: string) => {
      setConnectionRequestWithOrigin(origin);
      const deferred = new Deferred<boolean>();
      connectionPromiseRef.current = deferred;
      return deferred.promise;
    });

    walletTransport.registerHandler(HandlerType.SIGN, async (params) => {
      console.log("sign handler", params);
      // Implement signing logic
    });

    walletTransport.registerHandler(HandlerType.SEND_TRANSACTION, async (params) => {
      const txns: ethers.Transaction[] = await ethers.resolveProperties(params?.[0]);

      // TODO: add confirmation UI

      const chainId = 42170; // CHANGE, should not be hardcoded!!!

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
        transactions: [await ethers.resolveProperties(params?.[0])],
        network: chainId,
        transactionsFeeOption: selectedFeeOption,
        transactionsFeeQuote: feeOptionsResponse?.feeQuote,
      });

      console.log("response", response);

      if (response.code === "transactionFailed") {
        throw new TransactionRejectedRpcError(
          new Error(`Unable to send transaction: ${response.data.error}`)
        );
      }

      if (response.code === "transactionReceipt") {
        const { txHash } = response.data;
        return txHash;
      }
    });

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
    <Box padding="4">
      <Box flexDirection="column" gap="4">
        <Text variant="medium" color="text100" fontWeight="bold">
          Wallet: {truncateAddress(walletAddress || '')}
        </Text>

        <Button
          label="Disconnect"
          onClick={signOut}
        />
      </Box>

      {connectionRequestWithOrigin && (
        <Box
          marginTop="4"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text variant="large" color="text100" fontWeight="bold">
            Connection request from {connectionRequestWithOrigin}
          </Text>
          <Box marginTop="4" gap="2">
            <Button
              variant="primary"
              label="Approve"
              onClick={handleApproveConnection}
            />
            <Button
              variant="primary"
              label="Reject"
              onClick={handleRejectConnection}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
