const { RichEmbed } = require('discord.js')

module.exports = class DiscordEmbed extends RichEmbed {
    constructor(user, data = {}) {
        super(data)

        this.setColor('#7298DA')
        if (user) this.setFooter(user.tag, user.avatarURL).setTimestamp()
    }
}