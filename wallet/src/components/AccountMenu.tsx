import {
  Button,
  Modal,
  Card,
  ChevronDownIcon,
  GradientAvatar,
  truncateAddress,
  ModalPrimitive,
  IconButton,
  useMediaQuery,
  WalletConnectIcon
} from '@0xsequence/design-system'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { useAuth } from '../context/AuthContext'

import {
  ArrowLeftIcon,
  CloseIcon,
  ScanIcon,
  SignoutIcon,
  TransactionIcon
} from '../design-system-patch/icons'
import { CopyButton } from '../design-system-patch/copy-button/CopyButton'
import { useConfirmDialog } from './ConfirmDialogProvider'
import { Receive } from './Receive'
import { Transaction } from '@0xsequence/indexer'
import { WalletConnect } from './WalletConnect'

export const AccountMenu = () => {
  const isMobile = useMediaQuery('isMobile')
  const [isOpen, toggleOpen] = useState(false)
  const { address = '', signOut } = useAuth()
  const { confirmAction } = useConfirmDialog()
  const [openModal, setOpenModal] = useState<{ type: 'wallet' | 'receive' | 'history' } | false>(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const getModalTitle = () => {
    if (!openModal) return ''

    const modalType = openModal?.type
    if (modalType === 'wallet') return 'WalletConnect'

    if (modalType === 'receive') return 'Receive'

    if (modalType === 'history') {
      return selectedTransaction ? 'Transaction Details' : 'Transaction History'
    }
  }

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
            className="flex bg-button-glass rounded-full pl-2 pr-3 sm:px-3 py-1 sm:py-2 cursor-pointer gap-2 items-center select-none"
          >
            <GradientAvatar address={String(address)} size="sm" />
            <span className="font-bold text-style-normal">{truncateAddress(String(address), 2, 5)}</span>

            <ChevronDownIcon
              className="size-4 data-[open='true']:-rotate-180 transition-transform"
              data-open={isOpen}
            />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            sideOffset={8}
            align="end"
            className="data-[state='open']:animate-in"
          >
            <Card className="z-20 flex flex-col gap-2 backdrop-blur-[12.5px] bg-background-raised relative p-4 min-w-[320px]">
              <div className="flex items-center gap-3 justify-between">
                {address ? (
                  <CopyButton
                    copyText={address}
                    className="flex gap-2 text-sm font-bold items-center cursor-pointer "
                  >
                    <GradientAvatar address={String(address)} size="md" />
                    {truncateAddress(address, 4, 8)}
                    <CopyButton.Status />
                  </CopyButton>
                ) : null}
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-button-glass rounded-full flex items-center justify-center size-7 cursor-pointer"
                >
                  <CloseIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <MenuButton
                label="WalletConnect"
                icon={WalletConnectIcon}
                onClick={() => setOpenModal({ type: 'wallet' })}
              />
              <MenuButton label="Receive" icon={ScanIcon} onClick={() => setOpenModal({ type: 'receive' })} />

              <MenuButton label="Sign out" icon={SignoutIcon} onClick={handleSignOut} />
            </Card>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
      <AnimatePresence>
        {openModal && (
          <Modal
            contentProps={{
              style: {
                maxWidth: '400px',
                minHeight: '480px',
                height: openModal.type === 'receive' ? 'auto' : isMobile ? '90vh' : '60vh',
                overflowY: 'auto',
                scrollbarColor: 'gray white',
                scrollbarWidth: 'thin'
              }
            }}
            scroll
            onClose={() => {
              setOpenModal(false)
              setSelectedTransaction(null)
            }}
          >
            <div className="border-b border-black/10 w-full z-20 flex flex-row items-center justify-between px-4">
              <ModalPrimitive.Title asChild>
                <div className=" h-[3.75rem] text-sm font-bold flex items-center justify-center">
                  {selectedTransaction && (
                    <IconButton
                      className=""
                      icon={ArrowLeftIcon}
                      size="sm"
                      onClick={() => setSelectedTransaction(null)}
                    />
                  )}
                  {getModalTitle()}
                </div>
              </ModalPrimitive.Title>
            </div>

            {openModal.type === 'wallet' && (
              <div className="mx-4 my-6 rounded-md">
                <WalletConnect />
              </div>
            )}
            {/* {openModal.type === 'history' && (
              <TransactionHistory
                chainIds={chainIds}
                selectedTransaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
              />
            )} */}
            {openModal.type === 'receive' && <Receive />}
          </Modal>
        )}
      </AnimatePresence>
    </>
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
      className="w-full bg-button-glass text-sm font-bold rounded-sm "
      leftIcon={icon}
      label={label}
      onClick={onClick}
    />
  )
}
