import "@0xsequence/design-system/styles.css";

import { ThemeProvider } from "@0xsequence/design-system";

import { Auth } from "./routes/Auth";

export const App = () => {
  return (
    <div id="app">
      <ThemeProvider root="#app" scope="app" theme="dark">
        <Auth />
      </ThemeProvider>
    </div>
  );
};
