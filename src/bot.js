require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs').promises;
const path = require('path');
const prefix = process.env.PREFIX
const db = require('./database/db');

client.commands = new Map();
client.login(process.env.BOT_TOKEN);

db.connect((err) => {
    if(err){
        throw err
    }
    console.log('mySql connected...')
});

client.on('message', async function(message) {

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let cmdName = message.content.toLowerCase().substring(message.content.indexOf(prefix) + 1).split(new RegExp(/\s+/)).shift();
    let argsToParse = message.content.substring(message.content.indexOf(" ") + 1);
    if(client.commands.get(cmdName)) {
        client.commands.get(cmdName).run(client, message, argsToParse);
    } else { console.log("command doesn't exist")}

});

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) {
            registerCommands(path.join(dir, file));
        } else if(file.endsWith('.js')){
            let cmdName = file.substring(0, file.indexOf(".js"));
            try {
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
            } catch(err) {
                console.log(err)
            }
            
        }
    }
})();

(async function registerEvents(dir = 'events') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file))
        if(stat.isDirectory()) {
            registerEvents(path.join(dir, file));
        } else {
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client))
                } catch(err) {
                    console.log(err)
                }
            }
        }
    }
})();