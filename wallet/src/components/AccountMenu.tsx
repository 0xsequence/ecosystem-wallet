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

import { useAuth } from '../context/AuthContext'

import { CloseIcon, ScanIcon, SignoutIcon, TransactionIcon } from '../design-system-patch/icons'
import { CopyButton } from '../design-system-patch/copy-button/CopyButton'
import { useConfirmDialog } from './ConfirmDialogProvider'
import { Receive } from './Receive'
import { useFetchInventory } from '../pages/inventory/helpers/use-fetch-inventory'
import { TransactionHistory } from './TransactionHistory'
import { AnimateChangeInHeight } from './AnimateChangeInHeight'

export const AccountMenu = () => {
  const [isOpen, toggleOpen] = useState(false)
  const { address = '', signOut } = useAuth()
  const { confirmAction } = useConfirmDialog()
  const [openModal, setOpenModal] = useState<{ type: 'receive' | 'history' } | false>(false)

  const { inventory } = useFetchInventory()
  const chainIds: ChainId[] = [...new Set(inventory.map(item => item!.chainId))].filter(Boolean)

  const handleSignOut = () => {
    confirmAction({
      title: 'Signing out',
      warningMessage: 'Are you sure you want to sign out?',
      confirmLabel: 'Sign out',
      onConfirm: signOut,
      cancelLabel: 'Cancel',
      onCancel: () => { }
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
            className="flex bg-black/20 text-black ~dark:bg-white/10 rounded-full pl-2 pr-3 sm:px-3 py-1 sm:py-2 cursor-pointer gap-2 items-center select-none"
          >
            <GradientAvatar address={String(address)} size="sm" />
            <span className="font-bold text-style-normal">{truncateAddress(String(address), 0, 3)}</span>

            <ChevronDownIcon className="size-4" />
          </button>
        </PopoverPrimitive.Trigger>
        {isOpen && (
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content side="bottom" sideOffset={8} align="end" asChild>
              <Card className="z-20 flex flex-col gap-2 bg-[#F2F2F2] shadow-[0_0_12px_0_theme(colors.black/20%)] relative p-4 min-w-[320px]">
                <div className="flex items-center gap-3 justify-between">
                  {address ? (
                    <CopyButton
                      copyText={address}
                      className="flex gap-2 text-sm font-bold items-center cursor-pointer text-black"
                    >
                      <GradientAvatar address={String(address)} size="md" />
                      {truncateAddress(address, 4, 4)}
                      <CopyButton.Status />
                    </CopyButton>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-black/20 text-black rounded-full flex items-center justify-center size-7 cursor-pointer"
                  >
                    <CloseIcon className="size-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <MenuButton
                  label="Receive"
                  icon={ScanIcon}
                  onClick={() => setOpenModal({ type: 'receive' })}
                />
                <MenuButton
                  label="History"
                  icon={TransactionIcon}
                  onClick={() => setOpenModal({ type: 'history' })}
                />
                {/* <MenuLink label="Settings" icon={SettingsIcon} href="/settings" /> */}
                <MenuButton label="Sign out" icon={SignoutIcon} onClick={handleSignOut} />
              </Card>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        )}
      </PopoverPrimitive.Root>
      <AnimatePresence>
        {openModal && (
          <Modal
            contentProps={{
              style: {
                maxWidth: '400px',
                height: 'auto',
                overflowY: 'auto',
                scrollbarColor: 'gray white',
                scrollbarWidth: 'thin'
              }
            }}
            scroll
            onClose={() => setOpenModal(false)}
          >
            <AnimateChangeInHeight>
              {openModal.type === 'history' ? <TransactionHistory chainIds={chainIds} /> : <Receive />}
            </AnimateChangeInHeight>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

// interface MenuLinkProps {
//   label: string
//   href: string
//   icon?: typeof TransactionIcon
// }
//
// function MenuLink(props: MenuLinkProps) {
//   const { label, icon, href } = props
//
//   return (
//     <Button
//       className="w-full bg-black/20 text-sm font-bold rounded-sm text-black"
//       leftIcon={icon}
//       label={label}
//       asChild
//     >
//       <Link to={href}></Link>
//     </Button>
//   )
// }

interface MenuButtonProps {
  label: string
  onClick?: React.MouseEventHandler
  icon?: typeof TransactionIcon
}
function MenuButton(props: MenuButtonProps) {
  const { label, icon, onClick } = props

  return (
    <Button
      className="w-full bg-black/20 text-sm font-bold rounded-sm text-black"
      leftIcon={icon}
      label={label}
      onClick={onClick}
    />
  )
}
