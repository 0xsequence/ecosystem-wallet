import "@0xsequence/design-system/styles.css";
import { ThemeProvider, Spinner, Box } from "@0xsequence/design-system";
import { Auth } from "./routes/Auth";
import { Wallet } from "./routes/Wallet";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PoweredBySequence } from "./components/PoweredBySequence";

const AppContent: React.FC = () => {
  const { authState } = useAuth();

  switch (authState.status) {
    case "loading":
      return (
        <Box alignItems="center" justifyContent="center" height="vh">
          <Spinner size="lg" />
        </Box>
      );
    case "signedIn":
      return <Wallet />;
    case "signedOut":
      return <Auth />;
  }
};

export const App: React.FC = () => {
  return (
    <div id="app">
      <ThemeProvider root="#app" scope="app" theme="dark">
        <AuthProvider>
          <AppContent />
          <PoweredBySequence />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};
