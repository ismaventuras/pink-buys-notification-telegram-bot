export type BeamswapLog = {
    eventName: "Swap";
    args: {
        sender: `0x${string}`;
        to: `0x${string}`;
        amount0In: bigint;
        amount1In: bigint;
        amount0Out: bigint;
        amount1Out: bigint;
    },
    address: `0x${string}`;
    topics: `0x${string}`[];
    data: `0x${string}`,
    blockHash: `0x${string}`,
    blockNumber: bigint,
    transactionHash: `0x${string}`,
    transactionIndex: number,
    logIndex: number,
    transactionLogIndex?: `0x${string}`,
    removed: boolean
}

export type VALID_NETWORKS = 'moonbeam' | 'base'
export type VALID_PLATFORMS = 'beamswap' | 'stellaswap' | 'uniswapBase'

export interface PlatformConfig {
    network: VALID_NETWORKS;
    decimalsIn: number;
    platformName: string;
    tokenInName: string;
    explorerUrl: string;
    priceKey: VALID_PLATFORMS;
}

export type DexScrennerResponse = {
    pairs:{
        chainId:string;
        dexId:string;
        priceUsd:string;
        quoteToken:{
            address:`0x${string}`;
            name:string;
            symbol:string;
        }
    }[]
}
