import { parseAbiItem } from "viem"

if (!process.env.TELEGRAM_CHANNEL_CHATID) {
    console.log("Missing TELEGRAM_CHANNEL_CHATID env variable")
    process.exit(1)
}
if (!process.env.TELEGRAM_BOT_TOKEN_ID) {
    console.log("Missing TELEGRAM_BOT_TOKEN_ID env variable")
    process.exit(1)
}
if (!process.env.MOONBEAM_RPC_URL) {
    console.log("Missing MOONBEAM_RPC_URL env variable")
    process.exit(1)
}
if (!process.env.BASE_RPC_URL) {
    console.log("Missing BASE_RPC_URL env variable")
    process.exit(1)
}

export const RPC_URL = {
    moonbeam: process.env.MOONBEAM_RPC_URL,
    base: process.env.BASE_RPC_URL,
}
export const TELEGRAM_CHANNEL_CHATID = process.env.TELEGRAM_CHANNEL_CHATID
export const TELEGRAM_BOT_TOKEN_ID = process.env.TELEGRAM_BOT_TOKEN_ID
export const TELEGRAM_MESSAGE_IMAGE = 'https://i.imgur.com/vX8kkGQ.jpeg'
export const PINK_ADDRESS: { [key in 'base' | 'moonbeam']: `0x${string}` } = {
    moonbeam: "0xfFfFFfFf30478fAFBE935e466da114E14fB3563d",
    base: "0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0"
}
export const LP_ADDRESS: { [key in 'beamswap' | 'stellaswap' | 'base']: `0x${string}` } = {
    base: "0xa19ef740b9E1882E52070f3e28cF01102Ce017C0",
    beamswap: "0x6CcB9C69B6a519CF38F72e111AB7BBcF457F9502",
    stellaswap: "0x4FF48B9613A34c6E8eB508731a0bCC50A15EE944"
}
export const BEAMSWAP_ROUTER = "0x9F52F5370d38877e01579Cd6E028bc263898877C"
export const xcDOT_ADDRESS = "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080"
export const xcDecimals = 10
export const ERC20ABI = [
    parseAbiItem("function symbol() view returns (string memory)"),
    parseAbiItem("function decimals() view returns (uint8)"),
]
export const UNI_V3_PINK_LP_SWAP_EVENT = parseAbiItem('event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 price, uint128 liquidity, int24 tick)')
export const BEAMSWAP_PINK_LP_SWAP_EVENT = parseAbiItem('event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)')