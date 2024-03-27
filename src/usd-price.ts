import { PINK_ADDRESS } from "./constants";

type DexScrennerResponse = {
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

export async function getPinkOnBaseUsdPrice() {
    const prices = {
        uniswap:""
    }
    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${PINK_ADDRESS.base}`);
        if (response.status === 200) {
            const data:DexScrennerResponse = await response.json()

            data.pairs.filter(pair=> pair.quoteToken.symbol === 'WETH').forEach(pair => {
                prices[pair.dexId as keyof typeof prices] = pair.priceUsd;
            })

            return prices
        } else {
            throw new Error("Failed to fetch token price.");
        }
    } catch (error) {
        console.error("Error fetching token price:", error);
        return prices;
    }
}

export async function getCurrencyUsdPrice(addy:`0x${string}`) {
    const prices = {
        beamswap:"",
        stellaswap:""
    }
    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${addy}`);
        if (response.status === 200) {
            const data:DexScrennerResponse = await response.json()
            data.pairs.filter(pair=> pair.quoteToken.symbol === 'xcDOT').forEach(pair => {
                prices[pair.dexId as keyof typeof prices] = pair.priceUsd;
            })

            return prices
        } else {
            throw new Error("Failed to fetch token price.");
        }
    } catch (error) {
        console.error("Error fetching token price:", error);
        return prices;
    }
}