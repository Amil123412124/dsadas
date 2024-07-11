const { SlashCommandBuilder, EmbedBuilder } = require ('discord.js');
const Warns = require('../models/warns');

module.exports = {

    data: new SlashCommandBuilder()
    .setName('info')
     .setDescription('Replies with user info"')
    
     .addUserOption(option => option 
        .setName('user')
        .setDescription('the user to get info')
        .setRequired (true)),

     async execute(interaction){
     const { options, guild, user, tag, reason } = await interaction;
     const target = await options.getMember('user');
     const warns = await Warns.findAll({where: {userId: target.id}});

      let embed = new EmbedBuilder()
      .setTitle(`User Profile for ${target.user.tag} `)
      .setAuthor({name: target.user.tag, iconURL: target.displayAvatarURL()})
      .setDescription(`${user.tag}`) 
      .addFields(
        {
          name: 'Id:',
          value: `${target.id}`,
          inline: true
        },
        {
          name: 'Warns:',
          value: `${warns.length}`,
          inline: false
        },
        {
          name: 'reason:',
          value: `${reason}`,
          inline: false
        }
        );
        
        await interaction.reply({embeds: [embed], ephemeral: true});     
     }
}

