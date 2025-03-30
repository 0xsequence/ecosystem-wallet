import { GetContractInfoBatchArgs, GetTokenMetadataArgs, SequenceMetadata } from '@0xsequence/metadata'

const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY

if (!projectAccessKey) {
  console.error('VITE_PROJECT_ACCESS_KEY environment variable is not set.')
}

const metadataClient = new SequenceMetadata('https://metadata.sequence.app', projectAccessKey)

export const getTokenMetadata = async ({ chainID, contractAddress, tokenIDs }: GetTokenMetadataArgs) => {
  try {
    const tokenMetadata = await metadataClient.getTokenMetadata({
      chainID: String(chainID), // Ensure chainID is a string
      contractAddress,
      tokenIDs
    })
    return tokenMetadata
  } catch (error) {
    console.error('Error fetching token metadata:', error)
    throw error
  }
}

export const getContractInfoBatch = async ({ chainID, contractAddresses }: GetContractInfoBatchArgs) => {
  try {
    const contractInfo = await metadataClient.getContractInfoBatch({
      chainID: String(chainID),
      contractAddresses
    })
    return contractInfo
  } catch (error) {
    console.error('Error fetching contract info batch:', error)
    throw error
  }
}
