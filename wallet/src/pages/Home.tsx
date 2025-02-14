import { Box } from '@0xsequence/design-system'

import { Wallet } from './Wallet'

export const Home: React.FC = () => {
  return (
    <Box
      maxWidth="1/2"
      marginTop="10"
      marginX="auto"
      paddingX="4"
      flexDirection="column"
      gap="4"
      alignItems="center"
      justifyContent="center"
      width="full"
    >
      <Wallet />
    </Box>
  )
}
