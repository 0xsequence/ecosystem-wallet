import { Box, Collapsible, Text } from '@0xsequence/design-system'
import React from 'react'

import { NetworkInfo } from './NetworkInfo'

interface SignatureDetailsProps {
  message: string
  chainId?: number
  origin?: string
}

export const SignatureDetails = ({ message, chainId, origin }: SignatureDetailsProps) => {
  const isJson = React.useMemo(() => {
    try {
      JSON.parse(message)
      return true
    } catch {
      return false
    }
  }, [message])

  return (
    <Box flexDirection="column" gap="2" width="full">
      <Text variant="medium" color="text100" fontWeight="bold" marginTop="6" textAlign="center">
        Signature Request <br />
        <Text variant="small" color="text80">
          from origin <Text fontWeight="bold">{origin} </Text>
        </Text>
      </Text>
      <Box marginTop="2" flexDirection="column" gap="2" width="full">
        {chainId && <NetworkInfo chainId={chainId} />}
        <Collapsible label="Message to sign:" open={true}>
          {isJson ? (
            <Box
              overflowX="scroll"
              background="backgroundSecondary"
              padding="4"
              borderRadius="md"
              style={{
                whiteSpace: 'pre',
                maxHeight: '250px'
              }}
            >
              <Text variant="code" color="text100">
                {message}
              </Text>
            </Box>
          ) : (
            <Text variant="small" color="text80" style={{ wordBreak: 'break-all' }}>
              {message}
            </Text>
          )}
        </Collapsible>
      </Box>
    </Box>
  )
}
