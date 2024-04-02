import { formatUnits } from 'viem'
import { baseClient, moonbeamClient } from './viem-client';
import { LP_ADDRESS, BEAMSWAP_PINK_LP_SWAP_EVENT, xcDecimals, UNI_V3_PINK_LP_SWAP_EVENT, PINK_ADDRESS, TELEGRAM_MESSAGE_IMAGE, platformDetail, WETHDecimals } from './constants'
import { generateTelegramMessage, telegramSendMessage } from './telegram';
import { getAllPinkPrice } from './usd-price';
import { PlatformConfig, VALID_PLATFORMS } from './types';

async function processSwapEvents(logs:any[],platform:PlatformConfig){
    const lastPrice = await getAllPinkPrice(platform.network);
    try {
        switch (platform.priceKey) {
            case 'beamswap':
                for(let log of logs){
                    if(log.args.amount0In > 0){
                        const xcDOT_in = formatUnits(log.args.amount0In, platform.decimalsIn);
                        if(Number(xcDOT_in) < 10) continue 
                        const xcPINK_out = formatUnits(log.args.amount1Out, xcDecimals);
                        const msg = generateTelegramMessage(String(lastPrice[platform.priceKey]), xcPINK_out, platform.platformName, xcDOT_in, platform.tokenInName)
                        await telegramSendMessage(msg, TELEGRAM_MESSAGE_IMAGE)
                    }
                }
                break;
            case 'stellaswap':
            case 'uniswapBase':
                for(let log of logs){
                    if(log.args.amount0In > 0){
                        const xcDOT_in = formatUnits(log.args.amount0, platform.decimalsIn)
                        if(platform.tokenInName === 'xcDOT' && Number(xcDOT_in) < 10)continue
                        if(platform.tokenInName === 'WETH' && Number(xcDOT_in) < 0.05)continue
                        
                        const xcPINK_out = formatUnits(log.args.amount1, xcDecimals).split('-')[1]
                        const msg = generateTelegramMessage(String(lastPrice[platform.priceKey]), xcPINK_out, platform.platformName, xcDOT_in, platform.tokenInName)
                        await telegramSendMessage(msg, TELEGRAM_MESSAGE_IMAGE)
                    }
                }
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function listen(){
    for(const [key,config] of Object.entries(platformDetail)){
        console.log(`Starting to listen for events at ${config.platformName}`);
        const unwatch = (key === 'base' ? baseClient : moonbeamClient).watchEvent({
            address: LP_ADDRESS[key as VALID_PLATFORMS],
            event: key === 'base' ? UNI_V3_PINK_LP_SWAP_EVENT : BEAMSWAP_PINK_LP_SWAP_EVENT,
            onLogs: logs => processSwapEvents(logs, config),
            onError: error => console.error(error)
        });
    }
}
