import { TELEGRAM_BOT_TOKEN_ID, TELEGRAM_CHANNEL_CHATID } from "./constants";
import { formatNumber } from "./utils";

const TELEGRAM_API = 'https://api.telegram.org/bot';


function escapeMarkdownV2(text:string) {
    return text.replace(/[_*[\]()~`>#+-=|{}.!\\]/g, "\\$&");
}

export function generateTelegramMessage(lastPrice:string|number, xcPINK_out:string, dex:string,inputToken_in:string,inputTokenSymbol:string){
    const supply = 2300001221
    const mcap = formatNumber(supply * Number(lastPrice))
    const usdAmount = Number(lastPrice) * Number(xcPINK_out)
    const msg2 = `
🎀 NEW PINK BUY\\!

💵 Spent: \`${inputToken_in} ${inputTokenSymbol} \\(${usdAmount.toFixed(2)} $\`\\)
💰 Received: \`${xcPINK_out}\` $PINK  🎀
📈 $PINK Price: \`${lastPrice}\`
🏦 Market Cap: \`${mcap}\`

🛒 BUY
[Beamswap](https://app.beamswap.io/exchange/swap?outputCurrency=0xfFfFFfFf30478fAFBE935e466da114E14fB3563d)
[Stellaswap](https://app.stellaswap.com/exchange/swap?outputCurrency=0xfFfFFfFf30478fAFBE935e466da114E14fB3563d)
[Uniswap \\(Base\\)](https://app.uniswap.org/swap?outputCurrency=0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0&chain=base)

📊 CHARTS
[Beamswap](https://dexscreener.com/moonbeam/0x6ccb9c69b6a519cf38f72e111ab7bbcf457f9502)
[Stellaswap](https://dexscreener.com/moonbeam/0x4ff48b9613a34c6e8eb508731a0bcc50a15ee944)
[Uniswap \\(Base\\)](https://dexscreener.com/base/0xa19ef740b9e1882e52070f3e28cf01102ce017c0)

Life is better with $PINK 🚀🚀🚀`
    const msg = `
    🚀 NEW $PINK BUY on ${dex}🚀

🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀🎀🎀🎀🎀
🎀🎀🎀🎀🎀🎀

Congratulations, you just PINKed yourself 🤜🤛

Spent: \`${usdAmount.toFixed(2)}\` shitcoin$ 💸
Received: \`${Number(xcPINK_out).toFixed(2)}\` shiney new $PINK on Polkadot 🎀
$PINK playing at \`${lastPrice}$\` 🥁

[BUY PINK on beamswap](https://app.beamswap.io/exchange/braindex)

[BUY PINK on stellaswap](https://app.stellaswap.com/exchange/swap)

[BUY PINK on uniswap](https://app.uniswap.org/swap?chain=base)

[Beamswap Chart](https://dexscreener.com/moonbeam/0x6ccb9c69b6a519cf38f72e111ab7bbcf457f9502)

[Stellaswap Chart](https://dexscreener.com/moonbeam/0x4ff48b9613a34c6e8eb508731a0bcc50a15ee944)

[Uniswap\\(base\\) Chart](https://dexscreener.com/base/0xa19ef740b9e1882e52070f3e28cf01102ce017c0)


Lets G\\(r\\)OOOOO\\(w\\) 🚀🚀🚀`
    return msg2
}

export async function telegramSendMessage(text: string, imageUrl:string) {
    // const method = imageUrl ? 'sendPhoto': 'sendMessage';
    const method = 'sendPhoto';
    const url = `${TELEGRAM_API}${TELEGRAM_BOT_TOKEN_ID}/${method}`;
    let body = {
        chat_id: TELEGRAM_CHANNEL_CHATID,
        // text: text,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
        photo:imageUrl,
        caption:text
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

//telegramGetUpdates().then(console.log).catch(console.error)
// telegramSendMessage(generateTelegramMessage('0.005134','893.92', 'beamswap', '0.5', 'xcDOT' ), "https://i.imgur.com/vX8kkGQ.jpeg").then(console.log).catch(console.error)