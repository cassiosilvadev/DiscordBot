const client = new (require('./DiscordBot'))
client.login().then(() => console.log('[DISCORD-BOT] Iniciado com sucesso.')).catch(console.error)