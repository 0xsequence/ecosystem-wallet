import {
  Button,
  Modal,
  Card,
  ChevronDownIcon,
  GradientAvatar,
  truncateAddress
} from '@0xsequence/design-system'

import { ChainId } from '@0xsequence/network'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router'

import { useAuth } from '../context/AuthContext'

import { CloseIcon, ScanIcon, SignoutIcon, TransactionIcon } from '../design-system-patch/icons'
import { CopyButton } from '../design-system-patch/copy-button/CopyButton'
import { useConfirmDialog } from './ConfirmDialogProvider'
import { Receive } from './Receive'

export const AccountMenu = () => {
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

  function handleClose() {
    toggleOpen(false)
  }

  return (
    <>
      <PopoverPrimitive.Root open={isOpen} onOpenChange={toggleOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            className="flex bg-black/20 ~dark:bg-white/10 rounded-full px-3 py-2 cursor-pointer gap-2 items-center select-none"
          >
            <GradientAvatar address={String(address)} size="sm" />
            <span className="font-bold text-style-normal">{truncateAddress(String(address), 0, 3)}</span>

            <ChevronDownIcon />
          </button>
        </PopoverPrimitive.Trigger>
        {isOpen && (
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content side="bottom" sideOffset={8} align="end" asChild>
              <Card className="z-20 flex flex-col gap-2 bg-background-raised backdrop-blur-md relative p-4 min-w-[320px]">
                <div className="flex items-center gap-3 justify-between">
                  {address ? (
                    <CopyButton
                      copyText={address}
                      className="flex gap-2 text-sm font-bold items-center cursor-pointer"
                    >
                      <GradientAvatar address={String(address)} size="md" />
                      {truncateAddress(address, 4, 4)}
                      <CopyButton.Status />
                    </CopyButton>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-white/10 rounded-full flex items-center justify-center size-7 cursor-pointer"
                  >
                    <CloseIcon className="size-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <MenuButton label="Receive" icon={ScanIcon} onClick={() => setOpenReceiveModal(true)} />
                <MenuLink label="History" icon={TransactionIcon} href="/history" />
                {/* <MenuLink label="Settings" icon={SettingsIcon} href="/settings" /> */}
                <MenuButton label="Sign out" icon={SignoutIcon} onClick={handleSignOut} />
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
            onClose={() => setOpenReceiveModal(false)}
          >
            <Receive chainId={ChainId.POLYGON} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

interface MenuLinkProps {
  label: string
  href: string
  icon?: typeof TransactionIcon
}

function MenuLink(props: MenuLinkProps) {
  const { label, icon, href } = props

  return (
    <Button className="w-full bg-black/20 text-sm font-bold rounded-sm" leftIcon={icon} label={label} asChild>
      <Link to={href}></Link>
    </Button>
  )
}
interface MenuButtonProps {
  label: string
  onClick?: React.MouseEventHandler
  icon?: typeof TransactionIcon
}
function MenuButton(props: MenuButtonProps) {
  const { label, icon, onClick } = props

  return (
    <Button
      className="w-full bg-black/20 text-sm font-bold rounded-sm"
      leftIcon={icon}
      label={label}
      onClick={onClick}
    />
  )
}
