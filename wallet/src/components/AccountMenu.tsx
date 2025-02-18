import {
  Button,
  Card,
  ChevronDownIcon,
  CloseIcon,
  GradientAvatar,
  IconButton,
  Modal,
  QrCodeIcon,
  SettingsIcon,
  SignoutIcon,
  Text,
  TransactionsIcon
} from '@0xsequence/design-system'
import { ChainId } from '@0xsequence/network'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { truncateAtMiddle } from '../utils/helpers'

import { useAuth } from '../context/AuthContext'

import { useConfirmDialog } from './ConfirmDialogProvider'
import { CopyButton } from './CopyButton'
import { Receive } from './Receive'

export const AccountMenu = () => {
  const navigate = useNavigate()
  const [isOpen, toggleOpen] = useState(false)
  const { address = '', signOut } = useAuth()
  const { confirmAction } = useConfirmDialog()
  const [openReceiveModal, setOpenReceiveModal] = useState(false)

  const handleSignOut = () => {
    confirmAction({
      title: 'Signing out',
      warningMessage: 'Are you sure you want to sign out?',
      confirmLabel: 'Sign out',
      onConfirm: signOut,
      cancelLabel: 'Cancel',
      onCancel: () => {}
    })
  }

  return (
    <>
      <PopoverPrimitive.Root open={isOpen} onOpenChange={toggleOpen}>
        <PopoverPrimitive.Trigger asChild>
          <div
            className="flex border-1 border-solid rounded-xl px-4 py-3 cursor-pointer gap-2 items-center select-none"
            style={{ height: 52 }}
          >
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 justify-end items-center">
                <GradientAvatar address={String(address)} size="sm" />
                <Text variant="normal" fontWeight="bold" color="text100">
                  {`0x${truncateAtMiddle(address.substring(2), 4)}`}
                </Text>
              </div>
            </div>

            <div className="text-text50">
              <ChevronDownIcon />
            </div>
          </div>
        </PopoverPrimitive.Trigger>
        {isOpen && (
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content side="bottom" sideOffset={8} align="end" asChild>
              <Card
                className="grid gap-2 z-20 bg-background-raised backdrop-blur-md relative p-2"
                style={{ minWidth: 360 }}
              >
                <Card className="flex items-center gap-2 bg-transparent pb-2">
                  <GradientAvatar address={String(address)} size="md" />
                  <div className="flex items-center gap-1 flex-1">
                    <Text className="font-bold" variant="normal" color="text80">
                      {`0x${truncateAtMiddle(address.substring(2), 8)}`}
                    </Text>
                    <CopyButton text={address} />
                  </div>

                  <PopoverPrimitive.Close>
                    <IconButton icon={CloseIcon} size="sm" />
                  </PopoverPrimitive.Close>
                </Card>
                <Button
                  className="w-full py-2 px-4"
                  shape="square"
                  variant="emphasis"
                  leftIcon={QrCodeIcon}
                  label="Receive"
                  onClick={() => setOpenReceiveModal(true)}
                />
                <Button
                  className="w-full py-2 px-4"
                  shape="square"
                  variant="emphasis"
                  leftIcon={TransactionsIcon}
                  label="History"
                  onClick={() => navigate('/history')}
                />
                <Button
                  className="w-full py-2 px-4"
                  shape="square"
                  variant="emphasis"
                  leftIcon={SettingsIcon}
                  label="Settings"
                  onClick={() => navigate('/history')}
                />
                <Button
                  className="w-full py-2 px-4"
                  shape="square"
                  variant="emphasis"
                  leftIcon={SignoutIcon}
                  label="Sign out"
                  onClick={handleSignOut}
                />
              </Card>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        )}
      </PopoverPrimitive.Root>
      <AnimatePresence>
        {openReceiveModal && (
          <Modal
            contentProps={{
              style: {
                maxWidth: '400px',
                height: 'fit-content',
                scrollbarColor: 'gray black',
                scrollbarWidth: 'thin'
              }
            }}
            scroll={false}
            backdropColor="backgroundBackdrop"
            onClose={() => setOpenReceiveModal(false)}
          >
            <Receive chainId={ChainId.POLYGON} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
