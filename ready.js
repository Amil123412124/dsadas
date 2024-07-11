const Guild  = require('../models/guild.js');
const { ActivityType } = require("discord.js")

module.exports = {
   name: 'ready',
   once: true,
  async execute(client) {
    Guild.sync();
    console.log(`Logged in as ${client.user.tag} `)
  
}

    

  }
