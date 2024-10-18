import { allNetworks } from "@0xsequence/network";
import { Box, Card, Divider, Text } from "@0xsequence/design-system";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Connector,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  usePublicClient,
  useSendTransaction,
  useSwitchChain,
  useWalletClient,
} from "wagmi";

import "./App.css";
import { CardButton } from "./components/CardButton";
import { arbitrumNova, arbitrumSepolia } from "viem/chains";

const messageToSign = "Test message 1 2 3...";

function App() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const networkForCurrentChainId = allNetworks.find(
    (n) => n.chainId === chainId
  )!;

  const { data: walletClient } = useWalletClient();
  const {
    data: txnHash,
    sendTransaction,
    isPending: isPendingSendTxn,
    // error,
  } = useSendTransaction();

  const [lastTxnHash, setLastTxnHash] = useState<string | undefined>();

  useEffect(() => {
    if (txnHash) {
      setLastTxnHash(txnHash);
    }
  }, [txnHash]);

  const runSendTransaction = async () => {
    // NOTE: commented code is how to send ETH value to the account
    // if (!walletClient) {
    //   return
    // }
    // const [account] = await walletClient.getAddresses()
    // sendTransaction({ to: account, value: '0', gas: null })

    // NOTE: below is a a simple contract call.
    if (!walletClient) {
      return;
    }

    setLastTxnHash(undefined);

    const contractAbiInterface = new ethers.Interface(["function demo()"]);

    const data = contractAbiInterface.encodeFunctionData(
      "demo",
      []
    ) as `0x${string}`;

    sendTransaction({
      to: "0x37470dac8a0255141745906c972e414b1409b470",
      data,
      gas: null,
    });
  };

  const publicClient = usePublicClient({ chainId });

  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [isMessageValid, setIsMessageValid] = useState<boolean | undefined>();
  const [messageSig, setMessageSig] = useState<string | undefined>();

  const runSignMessage = async () => {
    if (!walletClient || !publicClient) {
      return;
    }

    setIsMessageValid(undefined);
    setMessageSig(undefined);
    setIsSigningMessage(true);

    try {
      const message = messageToSign;

      // sign
      const sig = await walletClient.signMessage({
        account: address || ("" as `0x${string}`),
        message,
      });
      console.log("address", address);
      console.log("signature:", sig);
      console.log("chainId in homepage", chainId);

      const [account] = await walletClient.getAddresses();

      const isValid = await publicClient.verifyMessage({
        address: account,
        message,
        signature: sig,
      });

      setIsSigningMessage(false);
      setIsMessageValid(isValid);
      setMessageSig(sig);

      console.log("isValid?", isValid);
    } catch (e) {
      setIsSigningMessage(false);
      console.error(e);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const walletAppUrl =
    urlParams.get("walletAppUrl") ?? import.meta.env.VITE_WALLET_URL;

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      style={{ maxWidth: "540px" }}
    >
      <Text variant="xlarge" marginBottom="2">
        Demo Dapp
      </Text>
      <Text variant="normal" color="text80" marginBottom="2">
        Using wagmi + cross app embedded wallet connector
      </Text>
      <Text variant="normal" color="text80" marginBottom="10">
        Cross app embedded wallet url: {walletAppUrl} <br />
        use walletAppUrl url param to test with another wallet
      </Text>
      <Box flexDirection="column" alignItems="center">
        {!address && (
          <Box flexDirection="column" gap="2">
            <Text variant="large" color="text100" fontWeight="bold">
              Connectors:
            </Text>
            <WalletOptions />
          </Box>
        )}
        {address && (
          <Box
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="2"
            style={{ maxWidth: "540px" }}
          >
            <Text variant="medium" color="text50" fontWeight="bold">
              Connected wallet:
            </Text>
            <Text color="text100"> {address}</Text>
            <Text variant="normal" color="text50" fontWeight="bold">
              Current chain:
            </Text>
            <Text variant="normal" fontWeight="bold">
              {networkForCurrentChainId.name}
            </Text>

            <Divider width="full" />

            <CardButton
              title="Switch chain"
              description={`Switch chain to ${
                chainId === arbitrumNova.id
                  ? "Arbitrum Sepolia"
                  : "Arbitrum Nova"
              }`}
              onClick={() => {
                setLastTxnHash(undefined);
                if (chainId === arbitrumNova.id) {
                  switchChain({ chainId: arbitrumSepolia.id });
                } else {
                  switchChain({ chainId: arbitrumNova.id });
                }
              }}
            />

            <CardButton
              title="Send transaction"
              description="Send a transaction with your wallet"
              onClick={runSendTransaction}
              isPending={isPendingSendTxn}
            />
            {networkForCurrentChainId.blockExplorer && lastTxnHash && (
              <Text
                as="a"
                variant="small"
                underline
                href={`${networkForCurrentChainId.blockExplorer.rootUrl}/tx/${txnHash}`}
                target="_blank"
                rel="noreferrer"
                marginTop="1"
                marginBottom="3"
              >
                View on {networkForCurrentChainId.blockExplorer.name}
              </Text>
            )}

            <CardButton
              title="Sign message"
              description={`Sign "${messageToSign}"`}
              onClick={runSignMessage}
              isPending={isSigningMessage}
            />

            {isMessageValid && (
              <Card
                width="full"
                color={"text100"}
                flexDirection={"column"}
                gap={"2"}
              >
                <Text variant="medium">Signed message:</Text>
                <Text>{messageToSign}</Text>
                <Text variant="medium">Signature:</Text>
                <Text variant="code" as="p" ellipsis>
                  {messageSig}
                </Text>
                <Text variant="medium">
                  isValid:{" "}
                  <Text variant="code" ellipsis>
                    {isMessageValid.toString()}
                  </Text>
                </Text>
              </Card>
            )}
          </Box>
        )}
      </Box>

      {address && (
        <Box marginTop="6">
          <button
            onClick={() => {
              disconnect();
              setLastTxnHash(undefined);
            }}
          >
            Disconnect
          </button>
        </Box>
      )}
    </Box>
  );
}

function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button disabled={!ready} onClick={onClick} style={{ marginRight: "5px" }}>
      {connector.name}
    </button>
  );
}

export default App;
