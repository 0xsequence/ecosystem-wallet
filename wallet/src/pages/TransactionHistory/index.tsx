import { Text } from '@0xsequence/design-system'
import { Transaction } from '@0xsequence/indexer'
import { useMemo, useState } from 'react'

import { TransactionHistoryItem } from './TransactionHistoryItem'
import { TransactionHistorySkeleton } from './TransactionHistorySkeleton'
import { useAuth } from '../../context/AuthContext'
import { useTransactionHistorySummary } from '../../hooks/useTransactionHistorySummary'
import { ChainId } from '@0xsequence/network'
import { useFetchInventory } from '../../pages/inventory/helpers/use-fetch-inventory'

// interface TransactionHistoryListProps {
//   chainIds: ChainId[]
//   selectedTransaction?: Transaction | null
//   setSelectedTransaction: (transaction: Transaction | null) => void
// }

type TransactionPeriodId = 'today' | 'yesterday' | 'week' | 'month' | 'year' | 'years'

interface TransactionPeriods {
  id: TransactionPeriodId
  label: string
}

const transactionPeriods: TransactionPeriods[] = [
  {
    id: 'today',
    label: 'Today'
  },
  {
    id: 'yesterday',
    label: 'Yesterday'
  },
  {
    id: 'week',
    label: 'Last Week'
  },
  {
    id: 'month',
    label: 'Last Month'
  },
  {
    id: 'year',
    label: 'Last Year'
  },
  {
    id: 'years',
    label: 'Past Years'
  }
]

export const TransactionHistory = () => {
  const [, setSelectedTransaction] = useState<Transaction | null>()

  const { inventory } = useFetchInventory()
  const inventoryChainIds = [...new Set(inventory.filter(Boolean).map(item => item!.chainId))]
  const chainIds: ChainId[] = [
    ...new Set([...inventoryChainIds, ChainId.ARBITRUM, ChainId.ARBITRUM_NOVA, ChainId.ARBITRUM_SEPOLIA])
  ]

  const { address: accountAddress = '' } = useAuth()
  const { data: transactions = [], isPending } = useTransactionHistorySummary({
    accountAddress,
    chainIds
  })
  const isLoading = chainIds.length > 0 && isPending

  const transactionsByTime = useTransactionsByTime(transactions)

  if (isLoading) {
    return (
      <div className="isolate flex flex-col w-full max-w-screen-lg grid-cols-2 sm:grid-cols-4 gap-2 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0  mb-16">
        <h1 className="text-style-xl font-bold mb-12">Transaction History</h1>
        <div className="flex flex-col gap-3">
          <TimeLabel label=" " />
          <TransactionHistorySkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="isolate flex flex-col w-full max-w-screen-lg grid-cols-2 sm:grid-cols-4 gap-2 mx-auto mt-2 sm:mt-18 sm:px-2 p-4 sm:py-0  mb-16">
      <h1 className="text-style-xl font-bold mb-12">Transaction History</h1>
      <div className="grid gap-5">
        {transactionPeriods.map(period => {
          const txs = transactionsByTime[period.id]
          if (txs.length === 0) {
            return null
          }
          return (
            <div key={period.id} className="flex flex-col gap-3">
              <TimeLabel label={period.label} />
              <TransactionsList transactions={txs} setSelectedTransaction={setSelectedTransaction} />
            </div>
          )
        })}
        {transactions.length === 0 && (
          <div className="grid gap-3">
            <div className="flex flex-col items-center justify-center py-12 px-4 ">
              <h3 className="font-semibold text-lg mb-2">No transactions yet</h3>
              <p className="text-center text-sm text-muted-foreground mb-6">
                When you make transactions with your wallet, they&apos;ll appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface TimeLabelProps {
  label: string
}

function TimeLabel({ label }: TimeLabelProps) {
  return (
    <div>
      <Text variant="normal" color="text50" fontWeight="medium">
        {label}
      </Text>
    </div>
  )
}
interface TransactionsListProps {
  transactions: Transaction[]
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null | undefined>>
}
function TransactionsList({ transactions, setSelectedTransaction }: TransactionsListProps) {
  return (
    <>
      {transactions.map((transaction, index) => {
        return (
          <div key={`${transaction.txnHash}-${index}`} className="flex flex-col gap-4">
            <TransactionHistoryItem
              transaction={transaction}
              onClickTransaction={() => setSelectedTransaction(transaction)}
            />
          </div>
        )
      })}
    </>
  )
}

function useTransactionsByTime(transactions: Transaction[]) {
  return useMemo(() => {
    const todayTreshold = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    const yesterdayTreshold = new Date(new Date().setDate(new Date(todayTreshold).getDate() - 1)).getTime()
    const weekTreshold = new Date(new Date().setDate(new Date().getDate() - 7)).getTime()
    const monthTreshold = new Date(new Date().setDate(new Date().getDate() - 30)).getTime()
    const yearTreshold = new Date(new Date().setDate(new Date().getDate() - 365)).getTime()

    const transactionsByTime: {
      [key in TransactionPeriodId]: Transaction[]
    } = {
      today: [],
      yesterday: [],
      week: [],
      month: [],
      year: [],
      years: []
    }

    transactions.forEach(transaction => {
      const transactionTime = new Date(transaction.timestamp).getTime()
      if (transactionTime > todayTreshold) {
        transactionsByTime.today.push(transaction)
      } else if (transactionTime > yesterdayTreshold) {
        transactionsByTime.yesterday.push(transaction)
      } else if (transactionTime > weekTreshold) {
        transactionsByTime.week.push(transaction)
      } else if (transactionTime > monthTreshold) {
        transactionsByTime.month.push(transaction)
      } else if (transactionTime > yearTreshold) {
        transactionsByTime.year.push(transaction)
      } else {
        transactionsByTime.years.push(transaction)
      }
    })

    return transactionsByTime
  }, [transactions])
}
