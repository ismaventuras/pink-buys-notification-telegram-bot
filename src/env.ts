const requiredEnvVars: string[] = [
    'TELEGRAM_CHANNEL_CHATID',
    'TELEGRAM_BOT_TOKEN_ID',
    'MOONBEAM_RPC_URL',
    'BASE_RPC_URL'
];

function checkRequiredEnvVariables(requiredVars:string[]) {
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.log('Missing required environment variables:', missingVars.join(', '));
        process.exit(1);
    }
}

checkRequiredEnvVariables(requiredEnvVars)