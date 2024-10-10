import "@0xsequence/design-system/styles.css";
import { ThemeProvider, Spinner, Box } from "@0xsequence/design-system";
import { Auth } from "./routes/Auth";
import { Wallet } from "./routes/Wallet";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppContent: React.FC = () => {
  const { isSignedIn, isCheckingSignInStatus } = useAuth();

  if (isCheckingSignInStatus) {
    return (
      <Box alignItems="center" justifyContent="center" height="vh">
        <Spinner size="lg" />
      </Box>
    );
  }

  return isSignedIn ? <Wallet /> : <Auth />;
};

export const App: React.FC = () => {
  return (
    <div id="app">
      <ThemeProvider root="#app" scope="app" theme="dark">
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};
