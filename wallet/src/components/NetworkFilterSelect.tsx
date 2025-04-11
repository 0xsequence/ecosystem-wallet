import { Select, Text } from '@0xsequence/design-system'
import { NetworkImage } from '../components/NetworkImage'

export function NetworkFilterSelect({ callback }: { callback: (value: string | number) => void }) {
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
        {
          label: (
            <div className="flex items-center gap-2">
              <NetworkImage chainId={10} size="sm" />
              <Text>Optimism</Text>
            </div>
          ),
          value: '1'
        },

        {
          label: (
            <div className="flex items-center gap-2">
              <NetworkImage chainId={8453} size="sm" />
              <Text>Base</Text>
            </div>
          ),
          value: '8453'
        },
        {
          label: (
            <div className="flex items-center gap-2">
              <NetworkImage chainId={1868} size="sm" />
              <Text>Soneium</Text>
            </div>
          ),
          value: '1868'
        }
      ]}
    />
  )
}
