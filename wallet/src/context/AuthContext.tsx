import React, { createContext, useState, useContext, useEffect } from "react";
import { sequenceWaas } from "../waasSetup";
import { WalletTransport } from "../walletTransport";

export const walletTransport = new WalletTransport();

type AuthState =
  | { status: "loading" }
  | { status: "signedOut" }
  | { status: "signedIn"; address: string };

interface AuthContextType {
  authState: AuthState;
  setWalletAddress: (address: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    sequenceWaas.isSignedIn().then(async (signedIn) => {
      if (signedIn) {
        const address = await sequenceWaas.getAddress();
        setAuthState({ status: "signedIn", address });
        walletTransport.setSignedInState({ address });
      } else {
        setAuthState({ status: "signedOut" });
        walletTransport.setSignedInState(null);
      }
    });
  }, []);

  const setWalletAddress = (address: string) => {
    setAuthState({ status: "signedIn", address });
    walletTransport.setSignedInState({ address });
  };

  const signOut = async () => {
    await sequenceWaas.dropSession();
    setAuthState({ status: "signedOut" });
    walletTransport.setSignedInState(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ authState, setWalletAddress, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
