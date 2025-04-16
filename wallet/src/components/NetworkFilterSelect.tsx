import { Select, Text } from '@0xsequence/design-system'
import { NetworkImage } from '../components/NetworkImage'
import { THEME } from '../utils/theme'
import { ChainId, networks } from '@0xsequence/network'
export function NetworkFilterSelect({ callback }: { callback: (value: string | number) => void }) {
  if (!THEME.chainSwitcher) {
    return null
  }

  const chains = THEME.chainSwitcher
    .map(chainId => (Array.isArray(chainId) ? chainId : [chainId]))
    .filter(chainId => chainId[0] in networks)
    .map(chainId => ({ ...networks[chainId[0] as ChainId], chains: chainId }))

  return (
    <Select
      defaultValue="all"
      label="Networks"
      labelLocation="hidden"
      name="networkFilter"
      onValueChange={callback}
      options={[
        {
          label: (
            <div className="flex items-center gap-2">
              <Text>All networks</Text>
            </div>
          ),
          value: 'all'
        },

        ...chains.map(network => ({
          label: (
            <div className="flex items-center gap-2">
              <NetworkImage chainId={network.chainId} size="sm" />
              <Text>{network.title}</Text>
            </div>
          ),
          value: network.chains.join(',')
        }))
      ]}
    />
  )
}
