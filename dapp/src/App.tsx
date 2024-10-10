import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useWalletClient,
} from "wagmi";

import "./App.css";

function App() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: walletClient } = useWalletClient();
  const {
    data: txnData,
    sendTransaction,
    isPending: isPendingSendTxn,
    error,
  } = useSendTransaction();

  const runSendTransaction = async () => {
    // NOTE: commented code is how to send ETH value to the account
    // if (!walletClient) {
    //   return
    // }
    // const [account] = await walletClient.getAddresses()
    // sendTransaction({ to: account, value: '0', gas: null })

    // NOTE: below is a a simple contract call. See `runMintNFT`
    // on another example where you can use the wagmi `writeContract`
    // method to do the same thing.
    if (!walletClient) {
      return;
    }

    // const [account] = await walletClient.getAddresses()
    const contractAbiInterface = new ethers.Interface(["function demo()"]);

    // sendTransaction({ to: account, value: BigInt(0), gas: null })
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

  return (
    <>
      <h1>Dapp</h1>
      <div className="card">
        {!address && <WalletOptions />}
        {address && (
          <>
            <p>Connected to wallet: {address}</p>

            <button
              onClick={() => {
                runSendTransaction();
              }}
            >
              Send transaction
            </button>
          </>
        )}
      </div>

      {address && <button onClick={() => disconnect()}>Disconnect</button>}
    </>
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
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  );
}

export default App;
