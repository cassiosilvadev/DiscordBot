const {
    Client,
    Collection
} = require('discord.js')

const { 
    readdirSync,
    lstatSync
} = require('fs')

// Require dotenv import
require('dotenv').config()

module.exports = class DiscordBot extends Client {
    constructor(options = {}) {
        super(options)

        this.commands = new Collection();

        this.initializeCommands()
        this.initializeListeners()
    }

    login(token = process.env.DISCORD_TOKEN) {
        return super.login(token)
    }

    runCommand(command, context, args) {
        return command._run(context, args).catch(console.error)
    }

    initializeCommands(path = './src/commands') {

        readdirSync(path).forEach(file => {
            let filePath = `${path}/${file}`
            if (file.endsWith('.js')) {
                const Command = require(filePath)
                const name = file.replace(/.js/g, '').toLowerCase()
                const command = new Command(name, this)
                return this.commands.set(name, command)
            } else if (lstatSync(filePath).isDirectory()) {
                return this.initializeCommands(filePath)
            }
        })
    }

    initializeListeners(path = './src/listeners') {

        readdirSync(path).forEach(file => {
            let filePath = `${path}/${file}`
            if (file.endsWith('.js')) {
                const Listener = require(filePath)
                const name = file.replace(/.js/g, '').toLowerCase()
                return this.on(name, Listener)
            } else if (lstatSync(filePath).isDirectory()) {
                return this.initializeListeners(filePath)
            }
        })
    }
}