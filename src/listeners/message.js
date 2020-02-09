const { CommandContext } = require('../')

require('dotenv').config()

module.exports = async function onMessage(message) {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return; 

    const prefix = process.env.PREFIX

    const botMention = this.user.toString()

    const sw = (...s) => s.some(st => message.content.startsWith(st))
    const usedPrefix = sw(botMention, `<@!${this.user.id}>`) ? `${botMention} ` : sw(prefix) ? prefix : null

    if (usedPrefix) {
      const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => !prefix || a)
      const args = fullCmd.slice(1)
      if (!fullCmd.length) return

      const cmd = fullCmd[0].toLowerCase().trim()
      const command = this.commands.find(c => c.name.toLowerCase() === cmd || (c.aliases && c.aliases.includes(cmd)))
      if (command) {

        const context = new CommandContext({
            client: this,
            message,
            prefix,
            command
        })

        console.log(`[COMMAND] User "${message.author.tag}" used "${command.name}" command.`)
        this.runCommand(command, context, args)
      }
    }
}