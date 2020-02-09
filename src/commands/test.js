const { Command, Embed } = require('../')

module.exports = class Test extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: ['tst'],
            category: 'test',
            description: 'build for tests.'
        })
    }

    async run({ channel, prefix }) {

        const embed = new Embed().setDescription(`O meu prefixo é **${prefix}**`)
        channel.send(embed)
    }
}