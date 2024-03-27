# Pink Buysn Notification Telegram Bot

## Requirements

- NodeJS 20
- pm2 

## env variables
```shell
# ChatID where the messages will be sent
TELEGRAM_CHANNEL_CHATID = ''
# TokenID given by BotFather
TELEGRAM_BOT_TOKEN_ID = ""
# RPC URL for Moonbeam with access to eth_getFilterLogs
MOONBEAM_RPC_URL = ""
# RPC URL for Base with access to eth_getFilterLogs
BASE_RPC_URL = ""
```
## Run it

- clone this repo
- run npm/yarn/pnpm install
- run npm/yarn/pnpm build
- fill .env variables
- run npm/yarn/pnpm production

