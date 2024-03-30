import { PINK_ADDRESS } from "./constants";
import type { DexScrennerResponse, VALID_NETWORKS } from "./types";

export async function getAllPinkPrice(network:VALID_NETWORKS){
    const prices = {
        beamswap:"",
        stellaswap:"",
        uniswapBase:""
    }
    try {
        const address = PINK_ADDRESS[network]
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
        if (response.status === 200) {
            const data:DexScrennerResponse = await response.json()
            const validPairs = data.pairs.filter(pair=> pair.quoteToken.symbol === 'WETH' || pair.quoteToken.symbol === 'xcDOT')
            validPairs.forEach(pair => {
                if(pair.chainId === 'base') prices.uniswapBase = pair.priceUsd;
                else prices[pair.dexId as keyof typeof prices] = pair.priceUsd;
            })
            return prices
        } else {
            throw new Error("Failed to fetch token price.");
        }
    } catch (error) {
        return prices
    }
}