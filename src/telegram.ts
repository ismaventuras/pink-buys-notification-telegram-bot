import { TELEGRAM_API, TELEGRAM_BOT_TOKEN_ID, TELEGRAM_CHANNEL_CHATID } from "./constants";
import { formatNumber, formatWithConditionalDecimals } from "./utils";

const CHAT_ID_LIST = [
    "-1002045263393", // Pink Buys Notifications channel
    "-1002090041159", // Pink Community
]

const pattern = /4\s*\.?\s*2\s*\.?\s*0\s*\.?\s*6\s*\.?\s*9/;

export function generateTelegramMessage(lastPrice:string|number, xcPINK_out:string, dex:string,inputToken_in:string,inputTokenSymbol:string){
    const supply = 2300001221
    const mcap = formatNumber(supply * Number(lastPrice))
    const usdAmount = Number(lastPrice) * Number(xcPINK_out)
    const msg2 = `
🎀 *NEW PINK BUY on ${dex}*\\!

${pattern.test(xcPINK_out) ? `
🎀🎀🎀🎀🎀 *PINK ALERT* 🎀🎀🎀🎀🎀
A degen bought an amount containing the number 42069\\. Please reply with THANKS DEGEN or a whale will dump
🎀🎀🎀🎀🎀 *END OF PINK ALERT* 🎀🎀🎀🎀🎀
` : ""}

💵 *Spent:* \`${formatWithConditionalDecimals(inputToken_in)} ${inputTokenSymbol} \\(${formatWithConditionalDecimals(usdAmount)} $\`\\)
💰 *Received:* \`${formatWithConditionalDecimals(xcPINK_out)}\` $PINK  🎀
📈 *$PINK Price:* \`${lastPrice}\`
🏦 *Market Cap\\(FDV\\):* \`${mcap}\`

🛒 *BUY*
[Beamswap](https://app.beamswap.io/exchange/swap?outputCurrency=0xfFfFFfFf30478fAFBE935e466da114E14fB3563d)
[Stellaswap](https://app.stellaswap.com/exchange/swap?outputCurrency=0xfFfFFfFf30478fAFBE935e466da114E14fB3563d)
[Uniswap \\(Base\\)](https://app.uniswap.org/swap?outputCurrency=0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0&chain=base)

📊 *CHARTS*
[Beamswap](https://dexscreener.com/moonbeam/0x6ccb9c69b6a519cf38f72e111ab7bbcf457f9502)
[Stellaswap](https://dexscreener.com/moonbeam/0x4ff48b9613a34c6e8eb508731a0bcc50a15ee944)
[Uniswap \\(Base\\)](https://dexscreener.com/base/0xa19ef740b9e1882e52070f3e28cf01102ce017c0)

*Life is better with $PINK* 🚀🚀🚀`
    return msg2
}

export async function telegramSendMessage(text: string) {
    // const method = 'sendPhoto';
    const method = 'sendMessage';
    const url = `${TELEGRAM_API}${TELEGRAM_BOT_TOKEN_ID}/${method}`;
    let body = {
        chat_id: TELEGRAM_CHANNEL_CHATID,
        text: text,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
        // photo:imageUrl,
        // caption:text
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        // console.log(data)
        // console.dir(data,{depth:null});
    } catch (error) {
        console.error('Failed to send message', error);
    }
}

async function sendTestMessage(text:string){
    const method = 'sendMessage';
    const url = `${TELEGRAM_API}${TELEGRAM_BOT_TOKEN_ID}/${method}`;
    let body = {
        chat_id: TELEGRAM_CHANNEL_CHATID,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
        text
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data)
        // console.dir(data,{depth:null});
    } catch (error) {
        console.error('Failed to send message', error);
    }
}
// function to know to the chatid of the bot or of what group it have been added
async function telegramGetUpdates() {
    const url = `${TELEGRAM_API}${TELEGRAM_BOT_TOKEN_ID}/getUpdates`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log("getUpdates");
        console.dir(data, {depth:null});
    } catch (error) {
        console.error('Failed to send message', error);
    }
}

// sendTestMessage().then(console.log).catch(console.error)
// telegramGetUpdates().then(console.log).catch(console.error)
// telegramSendMessage(generateTelegramMessage('0.005134','42069', 'beamswap', '0.5', 'xcDOT' )).then(console.log).catch(console.error)