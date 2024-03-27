import { TELEGRAM_BOT_TOKEN_ID, TELEGRAM_CHANNEL_CHATID } from "./constants";

const TELEGRAM_API = 'https://api.telegram.org/bot';
const BOT_TOKEN = TELEGRAM_BOT_TOKEN_ID;
const CHAT_ID = TELEGRAM_CHANNEL_CHATID;
// const CHAT_ID = '-1001517556356';

function escapeMarkdownV2(text:string) {
    return text.replace(/[_*[\]()~`>#+-=|{}.!\\]/g, "\\$&");
}

export function generateTelegramMessage(lastPrice:string|number, xcPINK_out:string, dex:string){
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

Spent: \`${(Number(lastPrice) * Number(xcPINK_out)).toFixed(2)}\` shitcoin$ 💸
Received: \`${Number(xcPINK_out).toFixed(2)}\` shiney new $PINK on Polkadot 🎀
$PINK playing at \`${lastPrice}$\` 🥁

[BUY PINK on beamswap](https://app.beamswap.io/exchange/braindex)

[BUY PINK on stellaswap](https://app.stellaswap.com/exchange/swap)

[BUY PINK on uniswap](https://app.uniswap.org/swap?chain=base)

[Beamswap Chart](https://dexscreener.com/moonbeam/0x6ccb9c69b6a519cf38f72e111ab7bbcf457f9502)

[Stellaswap Chart](https://dexscreener.com/moonbeam/0x4ff48b9613a34c6e8eb508731a0bcc50a15ee944)

[Uniswap\\(base\\) Chart](https://dexscreener.com/base/0xa19ef740b9e1882e52070f3e28cf01102ce017c0)


Lets G\\(r\\)OOOOO\\(w\\) 🚀🚀🚀`
    return msg
}

export async function telegramSendMessage(text: string, imageUrl:string) {
    // const method = imageUrl ? 'sendPhoto': 'sendMessage';
    const method = 'sendPhoto';
    const url = `${TELEGRAM_API}${BOT_TOKEN}/${method}`;
    let body = {
        chat_id: CHAT_ID,
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
    const url = `${TELEGRAM_API}${BOT_TOKEN}/getUpdates`;
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

// telegramGetUpdates().then(console.log).catch(console.error)
// telegramSendMessage(msg, "https://i.imgur.com/vX8kkGQ.jpeg").then(console.log).catch(console.error)