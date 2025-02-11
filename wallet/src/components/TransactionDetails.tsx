import { Box, Collapsible, Text } from '@0xsequence/design-system'
import { ethers } from 'ethers'

import { NetworkInfo } from './NetworkInfo'

interface TransactionDetailsProps {
  transactions: ethers.Transaction[]
  chainId?: number
  origin?: string
}

export const TransactionDetails = ({ transactions, chainId, origin }: TransactionDetailsProps) => (
  <Box flexDirection="column" gap="2" width="full">
    <Text variant="medium" color="text100" fontWeight="bold" marginTop="6" textAlign="center">
      Transaction Request <br />
      <Text variant="small" color="text80">
        from origin <Text fontWeight="bold">{origin} </Text>
      </Text>
    </Text>
    <Box marginTop="2" flexDirection="column" gap="2" width="full">
      {transactions.map((txn, index) => (
        <Box key={index} flexDirection="column" gap="3" width="full">
          {chainId && <NetworkInfo chainId={chainId} />}
          <Collapsible label="Transaction data">
            <Box
              overflowX="scroll"
              background="backgroundSecondary"
              padding="4"
              borderRadius="md"
              style={{
                whiteSpace: 'pre',
                maxHeight: '300px'
              }}
            >
              <Text variant="code" color="text100">
                {JSON.stringify(txn, null, 2)}
              </Text>
            </Box>
          </Collapsible>
        </Box>
      ))}
    </Box>
  </Box>
)
