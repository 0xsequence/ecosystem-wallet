import { Text } from '@0xsequence/design-system'
import { Transaction } from '@0xsequence/indexer'
import { useMemo } from 'react'

import { TransactionHistoryItem } from './TransactionHistoryItem'
import { TransactionHistorySkeleton } from './TransactionHistorySkeleton'
import { useAuth } from '../../context/AuthContext'
import { useTransactionHistorySummary } from '../../hooks/useTransactionHistorySummary'
import { ChainId } from '@0xsequence/network'
import { TransactionDetails } from './TransactionDetails'

interface TransactionHistoryListProps {
  chainIds: ChainId[]
  selectedTransaction?: Transaction | null
  setSelectedTransaction: (transaction: Transaction | null) => void
}

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

export const TransactionHistory = ({ chainIds, selectedTransaction, setSelectedTransaction }: TransactionHistoryListProps) => {
  const { address: accountAddress = '' } = useAuth()
  const { data: transactions = [], isPending } = useTransactionHistorySummary({
    accountAddress,
    chainIds
  })
  const isLoading = chainIds.length > 0 && isPending

  const transactionsByTime = useMemo(() => {
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

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <TransactionHistorySkeleton />
      </div>
    )
  }

  interface TimeLabelProps {
    label: string
  }

  const TimeLabel = ({ label }: TimeLabelProps) => {
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
  }

  const TransactionsList = ({ transactions }: TransactionsListProps) => {
    return (
      <div className="grid gap-2">
        {transactions.map((transaction, index) => {
          return (
            <div key={`${transaction.txnHash}-${index}`} className="grid gap-2">
              <TransactionHistoryItem
                transaction={transaction}
                onClickTransaction={() => setSelectedTransaction(transaction)}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-4">
      {selectedTransaction ? (
        <TransactionDetails transaction={selectedTransaction} />
      ) : (
        <div className="grid gap-5">
          {transactionPeriods.map(period => {
            const txs = transactionsByTime[period.id]
            if (txs.length === 0) {
              return null
            }
            return (
              <div key={period.id} className="grid gap-3">
                <TimeLabel label={period.label} />
                <TransactionsList transactions={txs} />
              </div>
            )
          })}
          {transactions.length === 0 && (
            <div className="grid gap-3">
              <Text className='text-style-md text-black'>No Recent Transaction History Found</Text>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
