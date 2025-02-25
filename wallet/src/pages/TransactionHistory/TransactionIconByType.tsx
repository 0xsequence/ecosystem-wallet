import { TxnTransferType } from '@0xsequence/indexer'
import { ArrowRightIcon, TransactionIcon } from '../../design-system-patch/icons'

export function TransactionIconByType({ transferType }: { transferType: TxnTransferType }) {
  switch (transferType) {
    case TxnTransferType.SEND:
      return (
        <ArrowRightIcon
          style={{
            transform: 'rotate(270deg)',
            width: '16px'
          }}
        />
      )
    case TxnTransferType.RECEIVE:
      return (
        <ArrowRightIcon
          style={{
            transform: 'rotate(90deg)',
            width: '16px'
          }}
        />
      )
    case TxnTransferType.UNKNOWN:
    default:
      return <TransactionIcon style={{ width: '14px' }} />
  }
}
