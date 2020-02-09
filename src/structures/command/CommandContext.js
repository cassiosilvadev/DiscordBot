module.exports = class CommandContext {
    constructor(options = {}) {
        this.client = options.client

        this.prefix = options.prefix
        this.command = options.command

        // Message imports

        this.message = options.message
        this.author = options.message.author
        this.member = options.message.member
        this.channel = options.message.channel
        this.guild = options.message.guild
    }
}