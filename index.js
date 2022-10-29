const discord = require('discord.js-selfbot-v13')
const client = new discord.Client({checkUpdate: false})

const fs = require('fs')

if (!fs.existsSync("./config.js")) fs.writeFileSync(`./config.js`, 'module.exports = {\n    token: "", // Place your token here\n    message: "" // The message will be sent to the group before leaving it \n}');

const consolecolor = require('gradient-string')

const config = require('./config')
const token = config.token || process.env.token
const message = config.message || process.env.message
let consolemessage = message
if (!consolemessage) consolemessage = "Nothing"
if (!token) throw new TypeError("Please put a token in the config file")

client.login(token)

client.on('ready', () => {
    console.clear()
    console.log(consolecolor("#7300ff", "#e600ff")(`
             ▄▄▄       ███▄    █ ▄▄▄█████▓ ██▓     ▄████  ██▀███   ▒█████   █    ██  ██▓███    ██████ 
            ▒████▄     ██ ▀█   █ ▓  ██▒ ▓▒▓██▒    ██▒ ▀█▒▓██ ▒ ██▒▒██▒  ██▒ ██  ▓██▒▓██░  ██▒▒██    ▒ 
            ▒██  ▀█▄  ▓██  ▀█ ██▒▒ ▓██░ ▒░▒██▒   ▒██░▄▄▄░▓██ ░▄█ ▒▒██░  ██▒▓██  ▒██░▓██░ ██▓▒░ ▓██▄   
            ░██▄▄▄▄██ ▓██▒  ▐▌██▒░ ▓██▓ ░ ░██░   ░▓█  ██▓▒██▀▀█▄  ▒██   ██░▓▓█  ░██░▒██▄█▓▒ ▒  ▒   ██▒
             ▓█   ▓██▒▒██░   ▓██░  ▒██▒ ░ ░██░   ░▒▓███▀▒░██▓ ▒██▒░ ████▓▒░▒▒█████▓ ▒██▒ ░  ░▒██████▒▒
             ▒▒   ▓▒█░░ ▒░   ▒ ▒   ▒ ░░   ░▓      ░▒   ▒ ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░▒▓▒ ▒ ▒ ▒▓▒░ ░  ░▒ ▒▓▒ ▒ ░
              ▒   ▒▒ ░░ ░░   ░ ▒░    ░     ▒ ░     ░   ░   ░▒ ░ ▒░  ░ ▒ ▒░ ░░▒░ ░ ░ ░▒ ░     ░ ░▒  ░ ░
              ░   ▒      ░   ░ ░   ░       ▒ ░   ░ ░   ░   ░░   ░ ░ ░ ░ ▒   ░░░ ░ ░ ░░       ░  ░  ░  
                  ░  ░         ░           ░           ░    ░         ░ ░     ░                    ░`))
    console.log(consolecolor("#00ffee", "#00ccff")(`
    
                                     CONNECTED AS: ${client.user.username} (${client.user.id})
                                     Message Before Leave: ${consolemessage}`))
})

client.on("channelCreate", async channel => {

    const channell = client.channels.cache.get(channel.id)
    if (channell.type !== "DM" && !channell.guild){
        if (message){
             channell.send(message)
        .then(() => channell.delete().catch(() => false))
        .catch(() => false)
        }
        else{
            channell.delete().catch(() => false)
        }
            
    }
})