import { TxnTransferType } from '@0xsequence/indexer'

export const getTransactionLabelByType = (transferType: TxnTransferType) => {
  switch (transferType) {
    case TxnTransferType.SEND:
      return 'Sent'
    case TxnTransferType.RECEIVE:
      return 'Received'
    case TxnTransferType.UNKNOWN:
    default:
      return 'Transacted'
  }
}
