import { Box, Text } from '@0xsequence/design-system'

import { SequenceLogo } from './SequenceLogo'

export const PoweredBySequence = () => {
  return (
    <Box
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.open('https://sequence.xyz')
        }
      }}
      gap="1"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      userSelect="none"
      cursor="pointer"
      position="absolute"
      bottom="5"
      left="0"
      right="0"
      opacity={{ hover: '80' }}
    >
      <Text variant="small" color="text100">
        Powered by Sequence
      </Text>
      <Box height="5" width="5">
        <SequenceLogo />
      </Box>
    </Box>
  )
}
