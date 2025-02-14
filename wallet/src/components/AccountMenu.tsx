import {
  Box,
  Button,
  Card,
  ChevronDownIcon,
  GradientAvatar,
  ReceiveIcon,
  SignoutIcon,
  Text,
  TransactionIcon,
  truncateAddress
} from '@0xsequence/design-system'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuth } from '../context/AuthContext'

import { useConfirmDialog } from './ConfirmDialogProvider'

export const AccountMenu = () => {
  const navigate = useNavigate()
  const [isOpen, toggleOpen] = useState(false)
  const { address, signOut } = useAuth()
  const { confirmAction } = useConfirmDialog()

  const handleSignOut = () => {
    confirmAction({
      title: 'Signing out',
      warningMessage: 'Are you sure you want to sign out?',
      confirmLabel: 'Sign out',
      onConfirm: async () => {
        signOut()
      },
      cancelLabel: 'Cancel',
      onCancel: () => {}
    })
  }

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={toggleOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Box
          borderColor={isOpen ? 'borderFocus' : 'borderNormal'}
          borderWidth="thin"
          borderStyle="solid"
          borderRadius="md"
          paddingX="4"
          paddingY="3"
          cursor="pointer"
          gap="2"
          alignItems="center"
          userSelect="none"
          opacity={{ hover: '80' }}
          style={{ height: 52 }}
        >
          <Box flexDirection="column">
            <Box flexDirection="row" gap="2" justifyContent="flex-end" alignItems="center">
              <GradientAvatar address={String(address)} size="sm" />
              <Text variant="normal" fontWeight="bold" color="text100">
                {truncateAddress(String(address), 4)}
              </Text>
            </Box>
          </Box>

          <Box color="text50">
            <ChevronDownIcon />
          </Box>
        </Box>
      </PopoverPrimitive.Trigger>

      {isOpen && (
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content side="bottom" sideOffset={8} align="end" asChild>
            <Card
              zIndex="20"
              background="backgroundRaised"
              backdropFilter="blur"
              position="relative"
              padding="2"
              style={{ minWidth: 360 }}
            >
              <Card>
                <Box alignItems="center" justifyContent="space-between">
                  <Text variant="normal" fontWeight="bold" color="text100">
                    Account
                  </Text>
                </Box>

                <Text as="div" marginTop="2" variant="normal" color="text80">
                  {address}
                </Text>
              </Card>

              <Box marginTop="2">
                <Button
                  width="full"
                  shape="square"
                  variant="emphasis"
                  rightIcon={ReceiveIcon}
                  label="Receive"
                  onClick={() => navigate('/receive')}
                />
              </Box>
              <Box marginTop="2">
                <Button
                  width="full"
                  shape="square"
                  variant="emphasis"
                  rightIcon={TransactionIcon}
                  label="History"
                  onClick={() => navigate('/history')}
                />
              </Box>
              <Box marginTop="2">
                <Button
                  width="full"
                  shape="square"
                  variant="emphasis"
                  rightIcon={SignoutIcon}
                  label="Sign out"
                  onClick={handleSignOut}
                />
              </Box>
            </Card>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      )}
    </PopoverPrimitive.Root>
  )
}
