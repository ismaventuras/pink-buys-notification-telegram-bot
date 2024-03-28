import { formatUnits } from 'viem'
import { baseClient, moonbeamClient } from './viem-client';
import { LP_ADDRESS, BEAMSWAP_PINK_LP_SWAP_EVENT, xcDecimals, UNI_V3_PINK_LP_SWAP_EVENT, PINK_ADDRESS } from './constants'
import { generateTelegramMessage, telegramSendMessage } from './telegram';
import { getCurrencyUsdPrice, getPinkOnBaseUsdPrice } from './usd-price';
import { BeamswapLog } from './types';

async function buyOnStella(logs: any[]) {
    try {
        // console.log("Stellaswap events block", logs[0].blockNumber)
        const lastPrice = await getCurrencyUsdPrice(PINK_ADDRESS.moonbeam)
        for (let log of logs) {
            const isPinkBuy = log.args.amount0! > 0
            if (isPinkBuy) {
                const explorerLink = `[View Transaction](https://moonscan.io/tx/${log.transactionHash})`;
                const xcDOT_in = formatUnits(log.args.amount0!, xcDecimals)
                const xcPINK_out = formatUnits(log.args.amount1!, xcDecimals).split('-')[1]
                // const message = `🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀\n *Pink Buy at Stellaswap*\n🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀\n\nBought \`${xcPINK_out}\` of PINK for \`${xcDOT_in} xcDOT\`\n${explorerLink}\n usdprice:\`${lastPrice?.stellaswap}\`$`;
                const msg = generateTelegramMessage(String(lastPrice?.stellaswap), xcPINK_out, 'stellaswap', xcDOT_in, 'xcDOT')
                await telegramSendMessage(msg, "https://i.imgur.com/vX8kkGQ.jpeg")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function buyOnBeamswap(logs: BeamswapLog[]) {
    try {
        for (const log of logs) {
            const lastPrice = await getCurrencyUsdPrice(PINK_ADDRESS.moonbeam)
            const { amount0In, amount1Out } = log.args
            const isBuy = amount0In > 0
            const explorerLink = `[View Transaction](https://moonscan.io/tx/${log.transactionHash})`;
            if (isBuy) {
                const xcDOT_in = formatUnits(amount0In, xcDecimals);
                const xcPINK_out = formatUnits(amount1Out, xcDecimals);
                // const message = `🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀\n *Pink Buy at Beamswap*\n🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀\n\nBought \`${xcPINK_out}\` of PINK for \`${xcDOT_in} xcDOT\`\n${explorerLink}\nusdprice:\`${lastPrice?.beamswap}\`$`;
                const msg = generateTelegramMessage(String(lastPrice?.beamswap), xcPINK_out, 'beamswap', xcDOT_in, 'xcDOT')
                await telegramSendMessage(msg, "https://i.imgur.com/vX8kkGQ.jpeg")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function buyOnBase(logs: any) {
    try {
        const lastPrice = await getPinkOnBaseUsdPrice()
        for await (let log of logs) {
            const isPinkBuy = log.args.amount0! > 0
            if (isPinkBuy) {
                const explorerLink = `[View Transaction](https://basescan.org/tx/${log.transactionHash})`;
                const WETH_in = formatUnits(log.args.amount0!, 18)
                const xcPINK_out = formatUnits(log.args.amount1!, xcDecimals).split('-')[1]
                // const message = `🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀\n *Pink Buy at Uniswap on Base*\n🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀\n\nBought \`${xcPINK_out}\` of PINK for \`${WETH_in} WETH\`\n${explorerLink}`;
                const msg = generateTelegramMessage(lastPrice.uniswap, xcPINK_out, 'uniswap',WETH_in, 'WETH')
                await telegramSendMessage(msg, "https://i.imgur.com/vX8kkGQ.jpeg")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function processLogs(logs: any[], type: 'beamswap' | 'stellaswap' | 'base') {
    switch (type) {
        case 'stellaswap':
            await buyOnStella(logs)
            break;
        case 'beamswap':
            await buyOnBeamswap(logs)
            break;
        case 'base':
            await buyOnBase(logs)
            break;
        default:
            break;
    }
}

export async function listenSwapEvent() {
    console.log("starting to listen for events at beamswap")
    const unwatch = moonbeamClient.watchEvent({
        address: LP_ADDRESS.beamswap,
        event: BEAMSWAP_PINK_LP_SWAP_EVENT,
        onLogs: logs => {
            processLogs(logs, 'beamswap')
        },
        onError: error => {
            console.log(error)
        }
    })
    console.log("starting to listen for events at stellaswap")

    const stella_unwatch = moonbeamClient.watchEvent({
        address: LP_ADDRESS.stellaswap,
        event: UNI_V3_PINK_LP_SWAP_EVENT,
        onLogs: logs => {
            processLogs(logs, 'stellaswap')
        },
        onError: error => {
            console.log(error)
        }
    })
    console.log("starting to listen for events at uniswap on base")
    const uniswap_unwatch = baseClient.watchEvent({
        address: LP_ADDRESS.base,
        event: UNI_V3_PINK_LP_SWAP_EVENT,
        onLogs: logs => {
            processLogs(logs, 'base')
        },
        onError: error => {
            console.log(error)
        }
    })

}