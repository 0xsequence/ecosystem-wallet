import { SequenceAPIClient } from '@0xsequence/api'

import { projectAccessKey } from './waasSetup'

const clientUrl = 'https://api.sequence.app'
export const apiClient = new SequenceAPIClient(clientUrl, projectAccessKey)
