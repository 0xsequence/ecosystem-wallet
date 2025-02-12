import { Box, Text } from '@0xsequence/design-system'
import { allNetworks } from '@0xsequence/network'
import React from 'react'

import { NetworkImage } from './NetworkImage'

interface NetworkInfoProps {
  chainId: number
}

export const NetworkInfo: React.FC<NetworkInfoProps> = ({ chainId }) => (
  <Box alignItems="center" justifyContent="center" flexDirection="row" gap="2">
    <Text variant="small" color="text80">
      on
    </Text>
    <NetworkImage chainId={chainId} size="sm" />
    <Text variant="small" color="text100">
      {allNetworks.find(n => n.chainId === chainId)?.title}
    </Text>
  </Box>
)
