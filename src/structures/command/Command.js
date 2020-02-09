const Embed = require('../DiscordEmbed')

module.exports = class Command {
    constructor(client, options = {}) {
        this.client = client

        this.name = options.name || 'invalid'
        this.aliases = options.aliases || []
        this.category = options.category

        this.description = options.description
        this.hidden = options.hidden || false
        this.usage = options.usage || 'none'
    }

    async _run(context, args) {
        try {
            const res = await this.run(context, ...args)
            return res
        } catch (e) {
            this.error(context, e)
        }
    }

    // All in one...
    async run() { }

    error({ channel, author }, error) {
        if (error instanceof Error) {
            const embed = new Embed(author)
            embed.setTitle(error.message)
            embed.setDescription(`Ocorreu um **erro** ao tentar **carregar** o comando!`)
            return channel.send(embed).then(async() => await channel.stopTyping())
        }
        console.error(error)
    }
}