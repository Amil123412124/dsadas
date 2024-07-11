const { SlashCommandBuilder, getMember } = require ('discord.js');
const Warns = require ('../models/warns');
module.exports = {

    data: new SlashCommandBuilder()
    .setName('warn')
     .setDescription('warns player')

     .addUserOption(option => option 
        .setName('user')
        .setDescription('the user to warn')
        .setRequired (true)
     )
     .addStringOption(option => option 
      .setName('reason')
      .setDescription('reason to warn the user')
      .setRequired (false)
     ),
    
     async execute(interaction){
        await interaction.deferReply({ephemeral: true});
        const { guild, options } =  interaction;
        const user = interaction.user;
        const target = options.getUser('user');
        await Warns.create({
        guildId: guild.id,
        userId: target.id,
        enforcerId: user.id
     }); 

     await interaction.editReply(`Successfully warned ${target.username}!`);

     }
}
