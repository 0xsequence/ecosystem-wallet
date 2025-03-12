import { allNetworks } from '@0xsequence/network'
import React from 'react'

import { NetworkImage } from './NetworkImage'

interface NetworkInfoProps {
  chainId: number
}

export const NetworkInfo: React.FC<NetworkInfoProps> = ({ chainId }) => (
  <div className="flex flex-col gap-1 text-start p-4 rounded-lg bg-background-secondary backdrop-blur-2xl">
    <dt className="text-sm font-medium text-seq-grey-700">Network</dt>

    <dd className="flex gap-2 items-center">
      <NetworkImage chainId={chainId} size="sm" />
      {allNetworks.find(n => n.chainId === chainId)?.title}
    </dd>
  </div>
)
