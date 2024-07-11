const{ token } = require('./config.json');
const { Client, Events, GatewayIntentBits, Collection, ActivityType} = require('discord.js');
const { error } = require('node:console');
const fs = require('node:fs');
const path = require('node:path');




const client = new Client({intents: [GatewayIntentBits.Guilds] | [GatewayIntentBits.GuildMembers] | [GatewayIntentBits.MessageContent] | [GatewayIntentBits.GuildMessages]});


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));



for(const file of eventFiles){
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
    client.on(event.name, (...args) => event.execute(...args));
    }
}



client.login(token);



