import { ThemeProvider, ToastProvider } from "@0xsequence/design-system"
import { ConfirmDialogProvider } from "../components/ConfirmDialogProvider"
import { AuthProvider } from "./AuthContext"
import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()


export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider root="#app" scope="app" theme="dark">
      <AuthProvider>
        <ToastProvider>
          <ConfirmDialogProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ConfirmDialogProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
