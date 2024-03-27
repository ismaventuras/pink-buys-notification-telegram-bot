import { createPublicClient, http } from 'viem'
import { base, moonbeam } from 'viem/chains'
import { RPC_URL } from './constants'

export const moonbeamClient = createPublicClient({
    chain: moonbeam,
    transport: http(RPC_URL.moonbeam),
})

export const baseClient = createPublicClient({
    chain: base,
    transport: http(RPC_URL.base)
})