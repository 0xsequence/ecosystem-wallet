import { Box, truncateAddress, Button, Image, SignoutIcon, Text } from "@0xsequence/design-system"
import { Outlet } from "react-router"
import { useConfirmDialog } from "./components/ConfirmDialogProvider"
import { CopyButton } from "./components/CopyButton"
import { PoweredBySequence } from "./components/PoweredBySequence"
import { useAuth } from "./context/AuthContext"
import { PrivateRoute } from "./components/PrivateRoute"


const PROJECT_SMALL_LOGO = import.meta.env.VITE_PROJECT_SMALL_LOGO

const AppHeader = () => {
  const { confirmAction } = useConfirmDialog()
  const { authState, signOut } = useAuth()
  const address = authState?.status === 'signedIn' ? authState.address : undefined

  const handleSignOut = () => {
    confirmAction({
      title: 'Signing out',
      warningMessage: 'Are you sure you want to sign out?',
      confirmLabel: 'Sign out',
      onConfirm: async () => {
        signOut()
      },
      cancelLabel: 'Cancel',
      onCancel: () => { }
    })
  }

  return (
    <Box
      flexDirection="row"
      gap="4"
      background="backgroundRaised"
      backdropFilter="blur"
      padding="4"
      alignItems="center"
    >
      {PROJECT_SMALL_LOGO && (
        <Box>
          <Image src={PROJECT_SMALL_LOGO} style={{ width: '30px', height: '30px' }} />
        </Box>
      )}
      {address && (
        <Box flexDirection="row" alignItems="center" justifyContent="center" gap="2">
          <Text variant="normal" color="text100" fontWeight="bold">
            {truncateAddress(address, 8, 6)}
          </Text>
          <CopyButton text={address} />
        </Box>
      )}
      <Button size="sm" leftIcon={SignoutIcon} onClick={handleSignOut} marginLeft="auto" />
    </Box>
  )
}

export const AppLayout = () => {
  const { authState } = useAuth()
  const isAuth = authState.status === 'signedIn'
  return (
    <Box minHeight="vh" position="relative" paddingBottom="14">
      {isAuth && <AppHeader />}
      <Outlet />
      <PoweredBySequence />
    </Box>
  )
}


export const ProtectedLayout = () => {
  return (
    <PrivateRoute>
      <AppLayout />
    </PrivateRoute>
  )
}
