import React, { createContext, useState, useContext, useEffect } from "react";
import { sequenceWaas } from "../waasSetup";

interface AuthContextType {
  isSignedIn: boolean;
  isCheckingSignInStatus: boolean;
  walletAddress: string | undefined;
  signIn: (address: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isCheckingSignInStatus, setIsCheckingSignInStatus] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  useEffect(() => {
    sequenceWaas.isSignedIn().then(async (signedIn) => {
      if (signedIn) {
        const address = await sequenceWaas.getAddress();
        setIsSignedIn(true);
        setWalletAddress(address);
      }
      setIsCheckingSignInStatus(false);
    });
  }, []);

  const signIn = (address: string) => {
    setIsSignedIn(true);
    setWalletAddress(address);
  };

  const signOut = async () => {
    await sequenceWaas.dropSession();
    setIsSignedIn(false);
    setWalletAddress(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isSignedIn, isCheckingSignInStatus, walletAddress, signIn, signOut }}
    >
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
