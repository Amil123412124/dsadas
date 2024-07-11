const Guild = require('../models/guild')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member){
      const dbGuild = await Guild.findOne({where: {id: member.guild.id}});
      const welcomeRole = await member.guild.roles.cache.find(role => role.name === 'member');
     
      console.log(welcomeRole.name);
      console.log("Loading gMember add");


     console.log(dbGuild.id);
     if(dbGuild.welcomeChannelId) {
      const welcomeRole = await member.guild.roles.fetch(dbGuild.welcomeRoleId);
      await member.roles.add(welcomeRole);
      console.log(dbGuild.welcomeChannelId);
      const welcomeChannel = await member.guild.channels.fetch(dbGuild.welcomeChannelId);
      welcomeChannel.send(`Willkommen auf den Montega QsengCL Discord ${member.user}!`);
    }
    if(dbGuild.welcomeChannelId) {
     const welcomeRole = await member.guild.channels.fetch(dbGuild.welcomeChannelId)

    }
  }
} 
