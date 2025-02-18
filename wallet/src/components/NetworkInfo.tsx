import { allNetworks } from '@0xsequence/network'
import React from 'react'

import { NetworkImage } from './NetworkImage'

interface NetworkInfoProps {
  chainId: number
}

export const NetworkInfo: React.FC<NetworkInfoProps> = ({ chainId }) => (
  // <div className="flex gap-[0.5ex] items-center justify-between text-black text-sm font-medium w-full">
  <div className="flex flex-col gap-1 text-black text-start overflow-x-scroll p-4 rounded-lg bg-black/10">
    <dt className="text-sm font-medium text-seq-grey-700">Network</dt>

    <dd className="flex gap-2 items-center">
      <NetworkImage chainId={chainId} size="sm" />
      {allNetworks.find(n => n.chainId === chainId)?.title}
    </dd>
  </div>
)
