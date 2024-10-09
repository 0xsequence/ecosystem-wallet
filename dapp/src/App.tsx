import { useEffect, useState } from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";

import "./App.css";

function App() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <h1>Dapp</h1>
      <div className="card">
        {!address && <WalletOptions />}
        {address && <p>Connected to wallet: {address}</p>}
      </div>

      <button onClick={() => disconnect()}>Disconnect</button>
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
